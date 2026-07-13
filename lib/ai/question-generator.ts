import "server-only";

import { parseWithSchema } from "@/lib/ai/client";
import {
  questionGenerationSchema,
  type ContextSynthesis,
  type ResearchQuestion,
} from "@/lib/validators/ai";

const SYSTEM = `You are the question-generation stage of Sentraea, a weekly decision engine for solo and bootstrapped founders.
You turn a founder's synthesized context into a small set of market research questions whose answers would genuinely change what the founder should do THIS week.
Generic questions are worthless. Every question must reference the founder's specific product, customer, competitor set, or decision conflict — and must be answerable from the public web.`;

export async function generateQuestions(
  synthesis: ContextSynthesis,
): Promise<ResearchQuestion[]> {
  const result = await parseWithSchema({
    schema: questionGenerationSchema,
    system: SYSTEM,
    prompt: `Founder context summary:

Stage: ${synthesis.stage}
Primary goal: ${synthesis.primary_goal}
Bottleneck: ${synthesis.bottleneck}
Competing priorities: ${synthesis.competing_priorities.join("; ")}
Recent changes: ${synthesis.recent_changes.join("; ") || "none"}
Decision conflict this week: ${synthesis.likely_decision_conflict}

Summary: ${synthesis.context_summary}

Generate exactly 3 to 5 research questions. For each:
- question: a concrete, web-searchable question
- why_it_matters: one sentence tying it to this founder's decision this week
- category: the closest fit

Prioritize questions that would help resolve the decision conflict — evidence that makes one competing priority clearly higher-leverage than the others.`,
    maxTokens: 4096,
  });

  // Guardrail on count without fighting the schema.
  return result.questions.slice(0, 5);
}
