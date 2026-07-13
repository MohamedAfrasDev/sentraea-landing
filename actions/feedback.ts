"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { ingestFeedback } from "@/lib/ai/feedback-ingestion";
import { track } from "@/lib/analytics";
import { requireUser } from "@/lib/auth/session";
import { getRecommendationForUser } from "@/lib/db/queries";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { weeklyReviewSchema } from "@/lib/validators/weekly";

/** Quick thumbs from the recommendation screen. Upserts a feedback row. */
export async function markUsefulness(
  recommendationId: string,
  usefulness: "useful" | "not_useful",
): Promise<{ error?: string }> {
  const user = await requireUser();
  const detail = await getRecommendationForUser(user.id, recommendationId);
  if (!detail) return { error: "Recommendation not found." };

  const supabase = await createSupabaseServerClient();
  const { error } = detail.feedback
    ? await supabase
        .from("recommendation_feedback")
        .update({ usefulness })
        .eq("id", detail.feedback.id)
    : await supabase
        .from("recommendation_feedback")
        .insert({ recommendation_id: recommendationId, usefulness });
  if (error) return { error: `Could not save feedback: ${error.message}` };

  track("feedback_submitted", { recommendationId, kind: "quick", usefulness });
  revalidatePath(`/app/recommendations/${recommendationId}`);
  return {};
}

export type WeeklyReviewActionState = {
  error?: string;
  fieldErrors?: Record<string, string>;
};

export async function submitWeeklyReview(
  recommendationId: string,
  _prev: WeeklyReviewActionState,
  formData: FormData,
): Promise<WeeklyReviewActionState> {
  const user = await requireUser();
  const detail = await getRecommendationForUser(user.id, recommendationId);
  if (!detail) return { error: "Recommendation not found." };

  const parsed = weeklyReviewSchema.safeParse({
    choseRightOption: formData.get("choseRightOption"),
    actedOn: formData.get("actedOn"),
    usefulness: formData.get("usefulness"),
    betterOptionTitle: formData.get("betterOptionTitle") ?? "",
    feltWrongNotes: formData.get("feltWrongNotes") ?? "",
    tasksHelped: formData.get("tasksHelped"),
    outcomeNotes: formData.get("outcomeNotes") ?? "",
    changedThisWeek: formData.get("changedThisWeek") ?? "",
    nextTimeNotes: formData.get("nextTimeNotes") ?? "",
  });
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { error: "A few fields need attention.", fieldErrors };
  }

  // Distill the review into a memory note for future runs. The review must
  // still save if the AI stage fails — memory is an enhancement, not a gate.
  let memoryNote: string | null = null;
  try {
    const summary = await ingestFeedback({
      recommendationTitle: detail.recommendation.recommendationTitle,
      chosenOptionTitle: detail.chosenOption?.title ?? null,
      choseRightOption: parsed.data.choseRightOption,
      actedOn: parsed.data.actedOn,
      usefulness: parsed.data.usefulness,
      betterOptionTitle: parsed.data.betterOptionTitle,
      feltWrongNotes: parsed.data.feltWrongNotes,
      tasksHelped: parsed.data.tasksHelped,
      outcomeNotes: parsed.data.outcomeNotes,
      changedThisWeek: parsed.data.changedThisWeek,
      nextTimeNotes: parsed.data.nextTimeNotes,
    });
    memoryNote = [
      summary.memory_note,
      ...summary.adjustments_for_next_run.map((a) => `Adjustment: ${a}`),
    ].join(" ");
  } catch (err) {
    console.error(
      "Feedback ingestion failed (saving review without memory note):",
      err,
    );
  }

  const values = {
    chose_right_option: parsed.data.choseRightOption,
    acted_on: parsed.data.actedOn,
    usefulness: parsed.data.usefulness,
    better_option_title: parsed.data.betterOptionTitle || null,
    felt_wrong_notes: parsed.data.feltWrongNotes || null,
    tasks_helped: parsed.data.tasksHelped,
    outcome_notes: parsed.data.outcomeNotes || null,
    changed_this_week: parsed.data.changedThisWeek || null,
    next_time_notes: parsed.data.nextTimeNotes || null,
    memory_note: memoryNote,
  };

  const supabase = await createSupabaseServerClient();
  const { error } = detail.feedback
    ? await supabase
        .from("recommendation_feedback")
        .update(values)
        .eq("id", detail.feedback.id)
    : await supabase
        .from("recommendation_feedback")
        .insert({ recommendation_id: recommendationId, ...values });
  if (error) return { error: `Could not save your review: ${error.message}` };

  track("feedback_submitted", { recommendationId, kind: "weekly_review" });
  revalidatePath(`/app/recommendations/${recommendationId}`);
  redirect(`/app/recommendations/${recommendationId}?reviewed=1`);
}
