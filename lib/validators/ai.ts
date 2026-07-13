import { z } from "zod";

// Zod schemas for every AI stage. Keep constraints structural — the API's
// structured outputs guarantee shape; business rules live in the prompts.

export const contextSynthesisSchema = z.object({
  stage: z.string(),
  primary_goal: z.string(),
  bottleneck: z.string(),
  competing_priorities: z.array(z.string()),
  recent_changes: z.array(z.string()),
  likely_decision_conflict: z.string(),
  context_summary: z.string(),
});
export type ContextSynthesis = z.infer<typeof contextSynthesisSchema>;

export const researchQuestionSchema = z.object({
  question: z.string(),
  why_it_matters: z.string(),
  category: z.enum([
    "customer_pain",
    "competitor_moves",
    "market_timing",
    "channel_effectiveness",
    "priority_tradeoff",
  ]),
});
export const questionGenerationSchema = z.object({
  questions: z.array(researchQuestionSchema),
});
export type ResearchQuestion = z.infer<typeof researchQuestionSchema>;
export type QuestionGeneration = z.infer<typeof questionGenerationSchema>;

export const marketSignalSchema = z.object({
  question: z.string(),
  summary: z.string(),
  key_findings: z.array(z.string()),
});
export const signalExtractionSchema = z.object({
  signals: z.array(marketSignalSchema),
});
export type MarketSignal = z.infer<typeof marketSignalSchema>;

export const researchSourceSchema = z.object({
  title: z.string(),
  url: z.string(),
  snippet: z.string().nullable(),
  signal_summary: z.string().nullable(),
});
export type ResearchSource = z.infer<typeof researchSourceSchema>;

export const recommendationOutputSchema = z.object({
  // The id of the founder-listed option being chosen. Null ONLY when none of
  // the listed options address the real leverage point (rare, must justify).
  chosen_option_id: z.string().nullable(),
  chosen_option_title: z.string(),
  invented_option_justification: z.string().nullable(),
  recommendation_title: z.string(),
  recommendation_summary: z.string(),
  why_now: z.string(),
  internal_signals: z.array(z.string()),
  external_signals: z.array(z.string()),
  rejected_options: z.array(
    z.object({
      option_id: z.string().nullable(),
      option_title: z.string(),
      reason: z.string(),
    }),
  ),
  execution_tasks: z.array(z.string()),
  confidence_level: z.enum(["low", "medium", "high"]),
  success_criteria: z.string(),
});
export type RecommendationOutput = z.infer<typeof recommendationOutputSchema>;

export const feedbackSummarySchema = z.object({
  memory_note: z.string(),
  adjustments_for_next_run: z.array(z.string()),
});
export type FeedbackSummary = z.infer<typeof feedbackSummarySchema>;
