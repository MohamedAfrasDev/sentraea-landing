"use server";

import { track } from "@/lib/analytics";
import { requireOnboardedUser } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { weeklyContextSchema } from "@/lib/validators/weekly";

export type StartAnalysisResult =
  | { runId: string }
  | { error: string; fieldErrors?: Record<string, string> };

/**
 * Creates the weekly context, its 3-5 explicit options, and the research run.
 * The client then calls POST /api/analyze to execute the pipeline and polls
 * GET /api/analysis/[id] for stage transitions.
 */
export async function startAnalysis(
  input: unknown,
): Promise<StartAnalysisResult> {
  const { profile } = await requireOnboardedUser();

  const parsed = weeklyContextSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      // Option errors surface as e.g. "options.2.title" so the form can
      // point at the exact card and field.
      const key = issue.path.join(".") || "form";
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { error: "A few fields need attention.", fieldErrors };
  }

  const supabase = await createSupabaseServerClient();

  const { data: weeklyContext, error: contextError } = await supabase
    .from("weekly_contexts")
    .insert({
      startup_profile_id: profile.id,
      planned_work: null,
      current_blocker: parsed.data.currentBlocker ?? null,
      recent_changes: parsed.data.recentChanges ?? null,
      notes: parsed.data.notes ?? null,
    })
    .select("id")
    .single();
  if (contextError || !weeklyContext) {
    return {
      error: `Could not save your week: ${contextError?.message ?? "unknown error"}`,
    };
  }

  const { error: optionsError } = await supabase.from("weekly_options").insert(
    parsed.data.options.map((o) => ({
      weekly_context_id: weeklyContext.id,
      title: o.title,
      type: o.type,
      expected_impact: o.expectedImpact,
      effort: o.effort,
      reversible: o.reversible,
      target_outcome: o.targetOutcome,
      note: o.note ?? null,
    })),
  );
  if (optionsError) {
    return { error: `Could not save your options: ${optionsError.message}` };
  }

  const { data: run, error: runError } = await supabase
    .from("research_runs")
    .insert({ weekly_context_id: weeklyContext.id })
    .select("id")
    .single();
  if (runError || !run) {
    return {
      error: `Could not start the run: ${runError?.message ?? "unknown error"}`,
    };
  }

  track("analysis_started", { runId: run.id, profileId: profile.id });

  return { runId: run.id };
}
