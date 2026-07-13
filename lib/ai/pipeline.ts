import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";

import { synthesizeContext } from "@/lib/ai/context-synthesizer";
import { decideWeeklyMove } from "@/lib/ai/decision-engine";
import { generateQuestions } from "@/lib/ai/question-generator";
import { runResearch } from "@/lib/ai/research-agent";
import type { FounderContext } from "@/lib/ai/types";
import { track } from "@/lib/analytics";
import {
  toStartupProfile,
  toWeeklyContext,
  toWeeklyOption,
} from "@/lib/db/mappers";
import type { ResearchRunStatus } from "@/lib/db/schema";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type Supabase = SupabaseClient;

async function setRunStatus(
  supabase: Supabase,
  runId: string,
  status: ResearchRunStatus,
) {
  const { error } = await supabase
    .from("research_runs")
    .update({ status })
    .eq("id", runId);
  if (error) throw new Error(`Failed to update run status: ${error.message}`);
}

async function loadFounderContext(
  supabase: Supabase,
  weeklyContextId: string,
): Promise<FounderContext> {
  const { data: weeklyContextRow, error: contextError } = await supabase
    .from("weekly_contexts")
    .select("*")
    .eq("id", weeklyContextId)
    .maybeSingle();
  if (contextError) {
    throw new Error(`Failed to load weekly context: ${contextError.message}`);
  }
  if (!weeklyContextRow) throw new Error("Weekly context not found.");
  const weeklyContext = toWeeklyContext(weeklyContextRow);

  const { data: profileRow, error: profileError } = await supabase
    .from("startup_profiles")
    .select("*")
    .eq("id", weeklyContext.startupProfileId)
    .maybeSingle();
  if (profileError) {
    throw new Error(`Failed to load startup profile: ${profileError.message}`);
  }
  if (!profileRow) throw new Error("Startup profile not found.");
  const profile = toStartupProfile(profileRow);

  const { data: optionRows, error: optionsError } = await supabase
    .from("weekly_options")
    .select("*")
    .eq("weekly_context_id", weeklyContextId)
    .order("created_at", { ascending: true });
  if (optionsError) {
    throw new Error(`Failed to load weekly options: ${optionsError.message}`);
  }
  const options = (optionRows ?? []).map(toWeeklyOption);

  // History: previous recommendations for this startup + their review notes.
  const { data: contextRows, error: contextIdsError } = await supabase
    .from("weekly_contexts")
    .select("id")
    .eq("startup_profile_id", profile.id);
  if (contextIdsError) {
    throw new Error(`Failed to load context history: ${contextIdsError.message}`);
  }
  const contextIds = (contextRows ?? []).map((r) => r.id as string);

  let previousRecommendations: { id: string; title: string }[] = [];
  if (contextIds.length) {
    const { data, error } = await supabase
      .from("recommendations")
      .select("id, recommendation_title")
      .in("weekly_context_id", contextIds)
      .order("created_at", { ascending: false })
      .limit(6);
    if (error) {
      throw new Error(`Failed to load past recommendations: ${error.message}`);
    }
    previousRecommendations = (data ?? []).map((r) => ({
      id: r.id as string,
      title: r.recommendation_title as string,
    }));
  }

  let previousFeedbackNotes: string[] = [];
  if (previousRecommendations.length) {
    const { data, error } = await supabase
      .from("recommendation_feedback")
      .select("memory_note, created_at")
      .in(
        "recommendation_id",
        previousRecommendations.map((r) => r.id),
      )
      .order("created_at", { ascending: false })
      .limit(4);
    if (error) {
      throw new Error(`Failed to load past feedback: ${error.message}`);
    }
    previousFeedbackNotes = (data ?? [])
      .map((f) => f.memory_note as string | null)
      .filter((n): n is string => Boolean(n));
  }

  return {
    profile,
    weeklyContext,
    options,
    previousFeedbackNotes,
    previousRecommendationTitles: previousRecommendations.map((r) => r.title),
  };
}

/**
 * Runs the full weekly pipeline for an existing research run.
 * Each stage persists its output and advances the run status so the client
 * can render real progress. Returns the new recommendation's id.
 *
 * Uses the caller's Supabase session (RLS-scoped), so this must be invoked
 * within a request that has the founder's own auth cookie.
 */
export async function runAnalysisPipeline(runId: string): Promise<string> {
  const supabase = await createSupabaseServerClient();

  const { data: runRow, error: runError } = await supabase
    .from("research_runs")
    .select("*")
    .eq("id", runId)
    .maybeSingle();
  if (runError) throw new Error(`Failed to load research run: ${runError.message}`);
  if (!runRow) throw new Error("Research run not found.");
  const weeklyContextId = runRow.weekly_context_id as string;

  try {
    const ctx = await loadFounderContext(supabase, weeklyContextId);

    await setRunStatus(supabase, runId, "synthesizing_context");
    const synthesis = await synthesizeContext(ctx);
    await supabase
      .from("research_runs")
      .update({ context_summary_json: synthesis })
      .eq("id", runId);

    await setRunStatus(supabase, runId, "generating_questions");
    const questions = await generateQuestions(synthesis);
    await supabase
      .from("research_runs")
      .update({ generated_questions_json: questions })
      .eq("id", runId);

    await setRunStatus(supabase, runId, "researching");
    const research = await runResearch(questions, synthesis);
    await supabase
      .from("research_runs")
      .update({
        extracted_signals_json: {
          available: research.available,
          signals: research.signals,
        },
      })
      .eq("id", runId);

    await setRunStatus(supabase, runId, "deciding");
    const decision = await decideWeeklyMove(ctx, synthesis, research);

    const { data: recommendation, error: recError } = await supabase
      .from("recommendations")
      .insert({
        weekly_context_id: weeklyContextId,
        chosen_option_id: decision.chosen_option_id,
        rejected_options_json: decision.rejected_options.map((r) => ({
          optionId: r.option_id,
          title: r.option_title,
          reason: r.reason,
        })),
        recommendation_title: decision.recommendation_title,
        recommendation_summary: decision.recommendation_summary,
        why_now: decision.why_now,
        internal_signals_json: decision.internal_signals,
        external_signals_json: decision.external_signals,
        // Kept aligned with the rejected options for older UI paths.
        ignored_alternatives_json: decision.rejected_options.map((r) => ({
          alternative: r.option_title,
          reason: r.reason,
        })),
        execution_tasks_json: decision.execution_tasks,
        confidence_level: decision.confidence_level,
        success_criteria: decision.success_criteria,
      })
      .select("id")
      .single();
    if (recError || !recommendation) {
      throw new Error(
        `Failed to save recommendation: ${recError?.message ?? "unknown error"}`,
      );
    }

    if (research.sources.length) {
      const { error: sourcesError } = await supabase
        .from("recommendation_sources")
        .insert(
          research.sources.map((s) => ({
            recommendation_id: recommendation.id,
            title: s.title,
            url: s.url,
            snippet: s.snippet,
            signal_summary: s.signal_summary,
          })),
        );
      if (sourcesError) {
        throw new Error(`Failed to save sources: ${sourcesError.message}`);
      }
    }

    await setRunStatus(supabase, runId, "complete");
    track("analysis_completed", {
      runId,
      recommendationId: recommendation.id,
      researchAvailable: research.available,
    });

    return recommendation.id;
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Analysis failed unexpectedly.";
    await supabase
      .from("research_runs")
      .update({ status: "failed", error_message: message })
      .eq("id", runId);
    track("analysis_failed", { runId, error: message });
    throw err;
  }
}
