import "server-only";

import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { z } from "zod";

// ============================================================
// Provider selection
// The pipeline runs on OpenRouter (default) or the Anthropic API.
// Set AI_PROVIDER explicitly, or it's inferred from which API
// key is present (OpenRouter wins when both are set).
// ============================================================

export type AIProviderKind = "anthropic" | "openrouter";

export function getProviderKind(): AIProviderKind {
  const explicit = process.env.AI_PROVIDER?.toLowerCase();
  if (explicit === "anthropic" || explicit === "openrouter") return explicit;
  if (explicit) {
    throw new Error(
      `Unknown AI_PROVIDER "${process.env.AI_PROVIDER}". Use "anthropic" or "openrouter".`,
    );
  }
  if (process.env.OPENROUTER_API_KEY) return "openrouter";
  if (process.env.ANTHROPIC_API_KEY) return "anthropic";
  throw new Error(
    "No AI provider configured. Set OPENROUTER_API_KEY or ANTHROPIC_API_KEY in .env.local (see .env.example).",
  );
}

// Cheap by default: the pipeline runs several calls per analysis, so the
// OpenRouter default is a low-cost model with structured-output support.
// Override with SENTRAEA_AI_MODEL (e.g. a :free variant, or a bigger model).
const DEFAULT_OPENROUTER_MODEL = "google/gemini-2.5-flash-lite";
const DEFAULT_ANTHROPIC_MODEL = "claude-opus-4-8";

export function getModel(): string {
  if (process.env.SENTRAEA_AI_MODEL) return process.env.SENTRAEA_AI_MODEL;
  return getProviderKind() === "anthropic"
    ? DEFAULT_ANTHROPIC_MODEL
    : DEFAULT_OPENROUTER_MODEL;
}

// ============================================================
// Anthropic
// ============================================================

let _anthropic: Anthropic | null = null;

export function getAnthropicClient(): Anthropic {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error(
      "ANTHROPIC_API_KEY is not set. Add it to .env.local (see .env.example).",
    );
  }
  _anthropic ??= new Anthropic();
  return _anthropic;
}

type ParseOptions<T extends z.ZodType> = {
  schema: T;
  system: string;
  prompt: string;
  maxTokens?: number;
};

async function parseWithSchemaAnthropic<T extends z.ZodType>(
  options: ParseOptions<T>,
): Promise<z.infer<T>> {
  const client = getAnthropicClient();

  let lastError: unknown;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const message = await client.messages.parse({
        model: getModel(),
        max_tokens: options.maxTokens ?? 8192,
        system: options.system,
        messages: [{ role: "user", content: options.prompt }],
        output_config: { format: zodOutputFormat(options.schema) },
      });
      if (message.parsed_output != null) {
        return message.parsed_output;
      }
      lastError = new Error("Model returned no parsable output.");
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError instanceof Error
    ? lastError
    : new Error("AI stage failed to produce a valid structured output.");
}

// ============================================================
// OpenRouter (OpenAI-compatible chat completions)
// ============================================================

const OPENROUTER_BASE_URL =
  process.env.OPENROUTER_BASE_URL ?? "https://openrouter.ai/api/v1";

export type OpenRouterAnnotation = {
  url: string;
  title: string | null;
  /** Excerpt of the cited page content, when the web plugin provides one. */
  content: string | null;
};

export type OpenRouterResult = {
  text: string;
  annotations: OpenRouterAnnotation[];
};

export async function callOpenRouter(options: {
  system: string;
  prompt: string;
  maxTokens: number;
  responseFormat?: Record<string, unknown>;
  enableWebSearch?: boolean;
  maxWebResults?: number;
}): Promise<OpenRouterResult> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error(
      "OPENROUTER_API_KEY is not set. Add it to .env.local (see .env.example).",
    );
  }

  const body: Record<string, unknown> = {
    model: getModel(),
    max_tokens: options.maxTokens,
    messages: [
      { role: "system", content: options.system },
      { role: "user", content: options.prompt },
    ],
  };
  if (options.responseFormat) body.response_format = options.responseFormat;
  if (options.enableWebSearch) {
    body.plugins = [{ id: "web", max_results: options.maxWebResults ?? 8 }];
  }

  const res = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      // Optional attribution headers recommended by OpenRouter.
      "HTTP-Referer": "https://sentraea.com",
      "X-Title": "Sentraea",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(
      `OpenRouter request failed (${res.status}): ${detail.slice(0, 500)}`,
    );
  }

  const data = (await res.json()) as {
    choices?: {
      message?: {
        content?: string | { type?: string; text?: string }[];
        annotations?: {
          type?: string;
          url_citation?: { url?: string; title?: string; content?: string };
        }[];
      };
    }[];
    error?: { message?: string };
  };

  if (data.error?.message) {
    throw new Error(`OpenRouter returned an error: ${data.error.message}`);
  }

  const message = data.choices?.[0]?.message;
  const text =
    typeof message?.content === "string"
      ? message.content
      : (message?.content ?? [])
          .map((part) => (part?.type === "text" ? (part.text ?? "") : ""))
          .join("");

  const annotations: OpenRouterAnnotation[] = (message?.annotations ?? [])
    .filter((a) => a.type === "url_citation" && a.url_citation?.url)
    .map((a) => ({
      url: a.url_citation!.url!,
      title: a.url_citation?.title ?? null,
      content: a.url_citation?.content ?? null,
    }));

  return { text, annotations };
}

/** Pulls the JSON object out of a completion that may wrap it in fences/prose. */
function extractJsonObject(text: string): string {
  const trimmed = text.trim();
  if (trimmed.startsWith("{")) return trimmed;
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenced) return fenced[1].trim();
  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start !== -1 && end > start) return trimmed.slice(start, end + 1);
  return trimmed;
}

async function parseWithSchemaOpenRouter<T extends z.ZodType>(
  options: ParseOptions<T>,
): Promise<z.infer<T>> {
  // Zod 4 emits strict JSON schema (additionalProperties: false, full
  // required) — what OpenAI-compatible structured outputs expect.
  const jsonSchema = z.toJSONSchema(options.schema) as Record<string, unknown>;
  delete jsonSchema.$schema;

  let lastError: unknown;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const retryNote =
        attempt > 0
          ? "\n\nYour previous reply was not valid for the required JSON schema. Reply with ONLY a JSON object matching the schema exactly — no prose, no markdown fences."
          : "";
      const { text } = await callOpenRouter({
        system: options.system,
        prompt: options.prompt + retryNote,
        maxTokens: options.maxTokens ?? 8192,
        responseFormat: {
          type: "json_schema",
          json_schema: {
            name: "structured_output",
            strict: true,
            schema: jsonSchema,
          },
        },
      });

      const parsed = options.schema.safeParse(
        JSON.parse(extractJsonObject(text)),
      );
      if (parsed.success) return parsed.data;
      lastError = new Error(
        `Model output failed schema validation: ${parsed.error.issues[0]?.message ?? "unknown issue"}`,
      );
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError instanceof Error
    ? lastError
    : new Error("AI stage failed to produce a valid structured output.");
}

// ============================================================
// Shared entry point for every pipeline stage
// ============================================================

/**
 * Runs a structured-output call on the configured provider and returns the
 * Zod-validated result. Invalid outputs are retried once, then surfaced.
 */
export async function parseWithSchema<T extends z.ZodType>(
  options: ParseOptions<T>,
): Promise<z.infer<T>> {
  return getProviderKind() === "anthropic"
    ? parseWithSchemaAnthropic(options)
    : parseWithSchemaOpenRouter(options);
}
