import "server-only";

import { parseWithSchema } from "@/lib/ai/client";
import {
  feedbackSummarySchema,
  type FeedbackSummary,
} from "@/lib/validators/ai";

const SYSTEM = `You are the feedback-ingestion stage of Sentraea, a weekly tradeoff engine for solo and bootstrapped founders.
You turn a founder's end-of-week review into a compact memory note that future weekly runs read before choosing between the founder's options.
This is decision-quality feedback: capture whether the RIGHT option was chosen, what the founder's behavior reveals about their real constraints, and what should tilt future choices — in a form a future decision stage can act on.`;

export type WeeklyReviewInput = {
  recommendationTitle: string;
  chosenOptionTitle: string | null;
  choseRightOption: string;
  actedOn: string;
  usefulness: string;
  betterOptionTitle?: string;
  feltWrongNotes?: string;
  tasksHelped: string;
  outcomeNotes?: string;
  changedThisWeek?: string;
  nextTimeNotes?: string;
};

export async function ingestFeedback(
  review: WeeklyReviewInput,
): Promise<FeedbackSummary> {
  return parseWithSchema({
    schema: feedbackSummarySchema,
    system: SYSTEM,
    prompt: `Last week Sentraea chose: "${review.chosenOptionTitle ?? review.recommendationTitle}"
(recommendation: "${review.recommendationTitle}")

Founder's review:
- Was it the right option from their list: ${review.choseRightOption}
- Should have chosen instead: ${review.betterOptionTitle || "n/a"}
- What made it feel wrong (if anything): ${review.feltWrongNotes || "nothing noted"}
- Acted on it: ${review.actedOn}
- Useful: ${review.usefulness}
- Did the execution tasks help them start: ${review.tasksHelped}
- What happened: ${review.outcomeNotes || "not stated"}
- What changed this week: ${review.changedThisWeek || "nothing noted"}
- Notes for next time: ${review.nextTimeNotes || "none"}

Produce:
- memory_note: 2-4 sentences a future run should read before choosing between options (concrete, no filler — especially anything that explains WHY the choice was right or wrong)
- adjustments_for_next_run: 1-3 specific adjustments to future option-weighing (e.g. "founder consistently under-estimates outreach effort — discount low-effort claims on outreach options", "when a research option targets churned users, prefer it — last two picks that ignored churn data felt wrong")`,
    maxTokens: 2048,
  });
}
