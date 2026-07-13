import "server-only";

import {
  toRecommendation,
  toRecommendationFeedback,
  toRecommendationSource,
  toResearchRun,
  toWeeklyOption,
} from "@/lib/db/mappers";
import type {
  Recommendation,
  RecommendationFeedbackRow,
  RecommendationSource,
  ResearchRun,
  WeeklyOption,
} from "@/lib/db/schema";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * All queries here go through the Supabase client, which carries the
 * caller's session. Row Level Security (see supabase/migrations) scopes
 * every table to `auth.uid()`, so a recommendation/run that isn't the
 * caller's simply isn't returned — the database enforces the ownership
 * boundary, not application code. `userId` is still accepted for a clear
 * call-site signature and shows up in error messages for debugging.
 */

export type RecommendationListItem = {
  recommendation: Recommendation;
  feedback: RecommendationFeedbackRow | null;
  weekStartDate: Date;
};

export async function getRecommendationHistory(
  userId: string,
  limit?: number,
): Promise<RecommendationListItem[]> {
  const supabase = await createSupabaseServerClient();

  let query = supabase
    .from("recommendations")
    .select("*, weekly_contexts(week_start_date), recommendation_feedback(*)")
    .order("created_at", { ascending: false });
  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) {
    throw new Error(
      `Failed to load recommendation history for user ${userId}: ${error.message}`,
    );
  }

  return (data ?? []).map((row) => ({
    recommendation: toRecommendation(row),
    feedback: row.recommendation_feedback?.[0]
      ? toRecommendationFeedback(row.recommendation_feedback[0])
      : null,
    weekStartDate: new Date(row.weekly_contexts.week_start_date),
  }));
}

export type RecommendationDetail = {
  recommendation: Recommendation;
  sources: RecommendationSource[];
  feedback: RecommendationFeedbackRow | null;
  weekStartDate: Date;
  /** The full decision set the founder listed that week. */
  options: WeeklyOption[];
  chosenOption: WeeklyOption | null;
};

/** Returns null when the recommendation doesn't exist OR isn't owned by the user. */
export async function getRecommendationForUser(
  userId: string,
  recommendationId: string,
): Promise<RecommendationDetail | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("recommendations")
    .select(
      "*, weekly_contexts(week_start_date, weekly_options(*)), recommendation_sources(*), recommendation_feedback(*)",
    )
    .eq("id", recommendationId)
    .maybeSingle();
  if (error) {
    throw new Error(
      `Failed to load recommendation ${recommendationId} for user ${userId}: ${error.message}`,
    );
  }
  if (!data) return null;

  const recommendation = toRecommendation(data);
  const options: WeeklyOption[] = (data.weekly_contexts?.weekly_options ?? [])
    .map(toWeeklyOption)
    .sort(
      (a: WeeklyOption, b: WeeklyOption) =>
        a.createdAt.getTime() - b.createdAt.getTime(),
    );

  return {
    recommendation,
    sources: (data.recommendation_sources ?? []).map(toRecommendationSource),
    feedback: data.recommendation_feedback?.[0]
      ? toRecommendationFeedback(data.recommendation_feedback[0])
      : null,
    weekStartDate: new Date(data.weekly_contexts.week_start_date),
    options,
    chosenOption:
      options.find((o: WeeklyOption) => o.id === recommendation.chosenOptionId) ??
      null,
  };
}

/** Returns null when the run doesn't exist OR isn't owned by the user. */
export async function getResearchRunForUser(
  userId: string,
  runId: string,
): Promise<(ResearchRun & { recommendationId: string | null }) | null> {
  const supabase = await createSupabaseServerClient();

  const { data: run, error: runError } = await supabase
    .from("research_runs")
    .select("*")
    .eq("id", runId)
    .maybeSingle();
  if (runError) {
    throw new Error(
      `Failed to load research run ${runId} for user ${userId}: ${runError.message}`,
    );
  }
  if (!run) return null;

  const { data: rec, error: recError } = await supabase
    .from("recommendations")
    .select("id")
    .eq("weekly_context_id", run.weekly_context_id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (recError) {
    throw new Error(`Failed to load latest recommendation: ${recError.message}`);
  }

  return { ...toResearchRun(run), recommendationId: rec?.id ?? null };
}

export async function getLatestRunForUser(
  userId: string,
): Promise<ResearchRun | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("research_runs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) {
    throw new Error(
      `Failed to load latest run for user ${userId}: ${error.message}`,
    );
  }
  return data ? toResearchRun(data) : null;
}
