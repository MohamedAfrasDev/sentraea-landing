import "server-only";

import { parseWithSchema } from "@/lib/ai/client";
import { describeFounderContext, type FounderContext } from "@/lib/ai/types";
import {
  contextSynthesisSchema,
  type ContextSynthesis,
} from "@/lib/validators/ai";

const SYSTEM = `You are the context-synthesis stage of Sentraea, a weekly decision engine for solo and bootstrapped founders.
Your job: distill the founder's raw context into a precise, honest working summary that later stages reason over.
Be specific and concrete. Never pad. Name the real tension in the founder's week — the place where two plausible priorities compete for the same limited time.`;

export async function synthesizeContext(
  ctx: FounderContext,
): Promise<ContextSynthesis> {
  return parseWithSchema({
    schema: contextSynthesisSchema,
    system: SYSTEM,
    prompt: `Here is everything we know about this founder right now:

${describeFounderContext(ctx)}

Produce the structured context summary:
- stage: their startup stage in one short phrase
- primary_goal: the goal that actually matters most in the next 30 days
- bottleneck: the single constraint most limiting progress right now (combine profile + this week's input; this week wins if they conflict)
- competing_priorities: this week's listed options as short phrases (fall back to profile priorities only if no options were listed)
- recent_changes: concrete recent events that change the decision landscape (empty array if none)
- likely_decision_conflict: one sentence naming the core tradeoff this founder faces THIS week
- context_summary: a tight paragraph (3-5 sentences) a strategist could act on without reading anything else`,
    maxTokens: 4096,
  });
}
