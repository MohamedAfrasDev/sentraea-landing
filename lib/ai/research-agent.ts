import "server-only";

import { z } from "zod";

import {
  callOpenRouter,
  getAnthropicClient,
  getModel,
  getProviderKind,
  parseWithSchema,
} from "@/lib/ai/client";
import {
  signalExtractionSchema,
  type ContextSynthesis,
  type MarketSignal,
  type ResearchQuestion,
  type ResearchSource,
} from "@/lib/validators/ai";

export type ResearchResult = {
  /** False when live web research could not run — never fake signals. */
  available: boolean;
  signals: MarketSignal[];
  sources: ResearchSource[];
};

/**
 * Provider abstraction: the pipeline only depends on this interface, so the
 * search backend can be swapped (Anthropic web search, OpenRouter web plugin,
 * Tavily, Exa, ...) without touching stages.
 */
export interface ResearchProvider {
  name: string;
  research(
    questions: ResearchQuestion[],
    synthesis: ContextSynthesis,
  ): Promise<ResearchResult>;
}

const RESEARCH_SYSTEM = `You are the market-research stage of Sentraea, a weekly decision engine for solo and bootstrapped founders.
Research the given questions using web search. Keep it lean: a handful of relevant, recent sources beats exhaustive coverage.
For each question, write a short evidence-grounded answer. Say plainly when the evidence is thin or mixed — never overstate.`;

const annotationSchema = z.object({
  source_annotations: z.array(
    z.object({
      url: z.string(),
      signal_summary: z.string(),
    }),
  ),
});

type CollectedSource = {
  title: string;
  url: string;
  snippet: string | null;
};

function formatQuestionList(questions: ResearchQuestion[]): string {
  return questions
    .map(
      (q, i) =>
        `${i + 1}. ${q.question}\n   (Why it matters: ${q.why_it_matters})`,
    )
    .join("\n");
}

function buildResearchPrompt(
  questionList: string,
  synthesis: ContextSynthesis,
): string {
  return `Founder context (for relevance judgment only):
${synthesis.context_summary}

Research these questions on the live web:

${questionList}

Answer each question in 2-4 sentences grounded in what you find. Prefer recent sources. If a question can't be answered with real evidence, say so explicitly.`;
}

/**
 * Distills freeform research text into validated signals and annotates each
 * collected source with the signal it contributed. Shared by all providers.
 */
async function distillResearch(
  questionList: string,
  researchText: string,
  collected: CollectedSource[],
): Promise<ResearchResult> {
  const distilled = await parseWithSchema({
    schema: signalExtractionSchema.extend(annotationSchema.shape),
    system:
      "You distill market research into structured signals for a founder's weekly decision. Only report what the research actually supports.",
    prompt: `Research questions:
${questionList}

Research findings:
${researchText}

Sources consulted:
${collected.map((s) => `- ${s.title} (${s.url})`).join("\n") || "none"}

Produce:
- signals: one entry per research question (question = the original question text, summary = the evidence-grounded answer, key_findings = 1-3 concrete findings). If a question had no usable evidence, say so in its summary.
- source_annotations: for each source URL listed above, one sentence on what signal it contributed. Only include URLs from the list.`,
    maxTokens: 6000,
  });

  const annotationByUrl = new Map(
    distilled.source_annotations.map((a) => [a.url, a.signal_summary]),
  );

  const sources: ResearchSource[] = collected.map((s) => ({
    title: s.title,
    url: s.url,
    snippet: s.snippet,
    signal_summary: annotationByUrl.get(s.url) ?? null,
  }));

  return { available: true, signals: distilled.signals, sources };
}

/** Anthropic's server-side web search tool. */
export class AnthropicWebSearchProvider implements ResearchProvider {
  name = "anthropic-web-search";

  async research(
    questions: ResearchQuestion[],
    synthesis: ContextSynthesis,
  ): Promise<ResearchResult> {
    const client = getAnthropicClient();
    const questionList = formatQuestionList(questions);

    const stream = client.messages.stream({
      model: getModel(),
      max_tokens: 16000,
      system: RESEARCH_SYSTEM,
      tools: [{ type: "web_search_20260209", name: "web_search", max_uses: 8 }],
      messages: [
        { role: "user", content: buildResearchPrompt(questionList, synthesis) },
      ],
    });

    const message = await stream.finalMessage();

    // Collect sources from search results (title/url) and citations (snippets).
    const sourceMap = new Map<string, CollectedSource>();
    let researchText = "";

    for (const block of message.content) {
      if (block.type === "web_search_tool_result") {
        if (Array.isArray(block.content)) {
          for (const result of block.content) {
            if (
              result.type === "web_search_result" &&
              !sourceMap.has(result.url)
            ) {
              sourceMap.set(result.url, {
                title: result.title,
                url: result.url,
                snippet: null,
              });
            }
          }
        }
      } else if (block.type === "text") {
        researchText += block.text;
        for (const citation of block.citations ?? []) {
          if (citation.type === "web_search_result_location") {
            const existing = sourceMap.get(citation.url);
            if (existing) {
              existing.snippet ??= citation.cited_text;
            } else {
              sourceMap.set(citation.url, {
                title: citation.title ?? citation.url,
                url: citation.url,
                snippet: citation.cited_text,
              });
            }
          }
        }
      }
    }

    if (researchText.trim() === "") {
      return { available: false, signals: [], sources: [] };
    }

    // Keep it lean: cited sources first, then the rest, capped.
    const collected = [...sourceMap.values()]
      .sort((a, b) => Number(b.snippet !== null) - Number(a.snippet !== null))
      .slice(0, 8);

    return distillResearch(questionList, researchText, collected);
  }
}

/** OpenRouter's web plugin: works with any OpenRouter model. */
export class OpenRouterWebSearchProvider implements ResearchProvider {
  name = "openrouter-web-plugin";

  async research(
    questions: ResearchQuestion[],
    synthesis: ContextSynthesis,
  ): Promise<ResearchResult> {
    const questionList = formatQuestionList(questions);

    const { text, annotations } = await callOpenRouter({
      system: RESEARCH_SYSTEM,
      prompt: buildResearchPrompt(questionList, synthesis),
      maxTokens: 16000,
      enableWebSearch: true,
      maxWebResults: 8,
    });

    if (text.trim() === "") {
      return { available: false, signals: [], sources: [] };
    }

    const sourceMap = new Map<string, CollectedSource>();
    for (const a of annotations) {
      if (!sourceMap.has(a.url)) {
        sourceMap.set(a.url, {
          title: a.title ?? a.url,
          url: a.url,
          snippet: a.content ? a.content.slice(0, 300) : null,
        });
      }
    }
    const collected = [...sourceMap.values()].slice(0, 8);

    // No citations back from the plugin → treat research as unavailable
    // rather than presenting unsourced claims as market evidence.
    if (collected.length === 0) {
      return { available: false, signals: [], sources: [] };
    }

    return distillResearch(questionList, text, collected);
  }
}

export function getResearchProvider(): ResearchProvider {
  return getProviderKind() === "anthropic"
    ? new AnthropicWebSearchProvider()
    : new OpenRouterWebSearchProvider();
}

/**
 * Runs research with graceful degradation: if the provider fails (tool not
 * enabled, network, quota), the pipeline continues with internal context only
 * and the recommendation is explicit about the missing external evidence.
 */
export async function runResearch(
  questions: ResearchQuestion[],
  synthesis: ContextSynthesis,
): Promise<ResearchResult> {
  try {
    return await getResearchProvider().research(questions, synthesis);
  } catch (err) {
    console.error("Web research unavailable:", err);
    return { available: false, signals: [], sources: [] };
  }
}
