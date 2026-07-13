import "server-only";

import { parseWithSchema } from "@/lib/ai/client";
import type { ResearchResult } from "@/lib/ai/research-agent";
import { describeFounderContext, type FounderContext } from "@/lib/ai/types";
import type { WeeklyOptionType } from "@/lib/db/schema";
import {
  recommendationOutputSchema,
  type ContextSynthesis,
  type RecommendationOutput,
} from "@/lib/validators/ai";

const SYSTEM = `You are the decision stage of Sentraea, a weekly tradeoff engine for solo and bootstrapped founders.
The founder has listed the concrete options they are actually considering this week. Your job is to CHOOSE EXACTLY ONE of those options and explicitly reject the others.

Principles:
- This is a comparative decision, not advice. The output must read as "do X instead of Y and Z because…", never "focus on one thing this week…".
- Choose from the founder's listed options. Inventing a different move is allowed ONLY when none of the listed options address the real leverage point — this should be rare, and you must justify it explicitly.
- Every rejected option gets a candid, specific reason why it is lower leverage RIGHT NOW — not why it's bad in general. A rejected option may be next week's right move; say so when true.
- Every claim must trace to internal context or the research provided. Never invent market evidence.
- Weigh expected impact against effort and reversibility: a reversible medium-impact option often beats an irreversible high-impact one at this stage.
- Execution tasks must be small and reversible — hours, not weeks — and must follow the playbook for the chosen option's type.
- Confidence must be honest: "high" only when internal context and external evidence point the same way.`;

// Option-type playbooks: the shape execution support must take per type.
const TYPE_PLAYBOOKS: Record<WeeklyOptionType, string> = {
  outreach: `OUTREACH playbook — tasks must cover:
- who exactly to contact first (a concrete ICP slice, not "your audience")
- 2 message angles/variants worth testing, described concretely
- the lightest possible tracking setup (a sheet with named columns is fine)
- a concrete conversation/booking goal for the week`,
  research: `RESEARCH playbook — tasks must cover:
- who to interview or observe (specific targets and where to find them)
- the 3-5 questions that would actually change the decision
- a simple note-taking structure so findings are comparable
- the hypothesis this week's research must confirm or kill`,
  build: `BUILD playbook — tasks must cover:
- a narrowly scoped implementation brief (what's in, what's explicitly out)
- acceptance criteria a solo founder can check in minutes
- a stop condition: what "enough" looks like so the week doesn't sprawl
- the overbuilding risk specific to this feature, named`,
  sales: `SALES playbook — tasks must cover:
- the concrete pipeline actions (who to move, from what stage to what stage)
- a short follow-up sequence (timing + angle per touch)
- qualification criteria so time isn't spent on dead deals
- a success target in numbers (conversations, demos, or closes)`,
  ops: `OPS playbook — tasks must cover:
- the smallest systems change that removes the pain (no platform migrations)
- the specific operational pain it should remove, named
- a stop condition so ops work doesn't expand to fill the week
- how the founder will know the change actually saved time`,
};

export async function decideWeeklyMove(
  ctx: FounderContext,
  synthesis: ContextSynthesis,
  research: ResearchResult,
): Promise<RecommendationOutput> {
  const externalSection = research.available
    ? `--- External market signals (from live web research) ---
${research.signals
  .map(
    (s) => `Q: ${s.question}
A: ${s.summary}
Findings: ${s.key_findings.join(" | ") || "none"}`,
  )
  .join("\n\n")}`
    : `--- External market signals ---
Live web research was UNAVAILABLE this run. You must reason from internal context only:
- external_signals must be an empty array
- confidence_level must not exceed "medium"
- why_now should acknowledge the decision rests on internal context alone this week`;

  const validOptionIds = new Set(ctx.options.map((o) => o.id));

  const decision = await parseWithSchema({
    schema: recommendationOutputSchema,
    system: SYSTEM,
    prompt: `--- Full founder context (including this week's options with their ids) ---
${describeFounderContext(ctx)}

--- Synthesized context ---
${synthesis.context_summary}
Decision conflict this week: ${synthesis.likely_decision_conflict}

${externalSection}

--- Execution playbooks by option type ---
${Object.values(TYPE_PLAYBOOKS).join("\n\n")}

Decide this week's move:
- chosen_option_id: the exact id of the chosen option from the list above. Set null ONLY if no listed option addresses the real leverage point (rare).
- chosen_option_title: the chosen option's title (or the invented move's title if chosen_option_id is null)
- invented_option_justification: null when choosing a listed option; otherwise one paragraph on why every listed option misses the leverage point
- recommendation_title: imperative and specific, under 12 words, naming the chosen move
- recommendation_summary: 2-4 sentences on the move and its one-week scope, framed against the alternatives ("…instead of X because…")
- why_now: why this week specifically — tie internal state to market evidence where available
- internal_signals: the founder-context facts this decision rests on (3-6 short items)
- external_signals: the market evidence used (each item cites what was found; empty if research was unavailable)
- rejected_options: EVERY listed option that was not chosen (option_id = its exact id, option_title, and a specific reason it loses THIS week — include what would need to be true for it to win next week when relevant)
- execution_tasks: 3-6 small reversible tasks following the playbook for the chosen option's type, roughly in order, each doable in a few hours
- confidence_level: low / medium / high, honestly
- success_criteria: what should be observably true by the end of the week — concrete and measurable where possible, tied to the option's target outcome`,
    maxTokens: 8192,
  });

  // Never trust the model's ids: unknown chosen id → treat as invented move;
  // unknown rejected ids → null them so nothing links to the wrong option.
  if (decision.chosen_option_id && !validOptionIds.has(decision.chosen_option_id)) {
    const byTitle = ctx.options.find(
      (o) => o.title.toLowerCase() === decision.chosen_option_title.toLowerCase(),
    );
    decision.chosen_option_id = byTitle?.id ?? null;
  }
  decision.rejected_options = decision.rejected_options.map((r) => ({
    ...r,
    option_id: r.option_id && validOptionIds.has(r.option_id) ? r.option_id : null,
  }));

  return decision;
}
