import "server-only";

import type {
  Recommendation,
  RecommendationFeedbackRow,
  RecommendationSource,
  ResearchRun,
  ResearchRunStatus,
  StartupProfile,
  WeeklyContext,
  WeeklyOption,
} from "@/lib/db/schema";

/**
 * The app reads/writes tables through the Supabase client (PostgREST) rather
 * than a direct Postgres connection, so RLS enforces per-user access instead
 * of a raw connection string. PostgREST returns snake_case rows; these
 * mappers convert them to the camelCase shapes the rest of the app expects
 * (matching Drizzle's inferred types in lib/db/schema.ts, which are kept for
 * their types only — not a live connection).
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Row = Record<string, any>;

export function toStartupProfile(row: Row): StartupProfile {
  return {
    id: row.id,
    userId: row.user_id,
    startupName: row.startup_name,
    productSummary: row.product_summary,
    customerType: row.customer_type,
    stage: row.stage,
    mainGoal30d: row.main_goal_30d,
    bottleneck: row.bottleneck,
    priorities: row.priorities ?? [],
    websiteUrl: row.website_url,
    productUrl: row.product_url,
    competitorUrls: row.competitor_urls ?? [],
    recentChanges: row.recent_changes,
    notes: row.notes,
    onboardingCompleted: row.onboarding_completed,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
}

export function toWeeklyContext(row: Row): WeeklyContext {
  return {
    id: row.id,
    startupProfileId: row.startup_profile_id,
    weekStartDate: new Date(row.week_start_date),
    plannedWork: row.planned_work,
    currentBlocker: row.current_blocker,
    recentChanges: row.recent_changes,
    notes: row.notes,
    createdAt: new Date(row.created_at),
  };
}

export function toResearchRun(row: Row): ResearchRun {
  return {
    id: row.id,
    weeklyContextId: row.weekly_context_id,
    status: row.status as ResearchRunStatus,
    errorMessage: row.error_message,
    contextSummaryJson: row.context_summary_json,
    generatedQuestionsJson: row.generated_questions_json,
    extractedSignalsJson: row.extracted_signals_json,
    createdAt: new Date(row.created_at),
  };
}

export function toWeeklyOption(row: Row): WeeklyOption {
  return {
    id: row.id,
    weeklyContextId: row.weekly_context_id,
    title: row.title,
    type: row.type,
    expectedImpact: row.expected_impact,
    effort: row.effort,
    reversible: row.reversible,
    targetOutcome: row.target_outcome,
    note: row.note,
    createdAt: new Date(row.created_at),
  };
}

export function toRecommendation(row: Row): Recommendation {
  return {
    id: row.id,
    weeklyContextId: row.weekly_context_id,
    chosenOptionId: row.chosen_option_id ?? null,
    rejectedOptionsJson: row.rejected_options_json ?? [],
    recommendationTitle: row.recommendation_title,
    recommendationSummary: row.recommendation_summary,
    whyNow: row.why_now,
    internalSignalsJson: row.internal_signals_json ?? [],
    externalSignalsJson: row.external_signals_json ?? [],
    ignoredAlternativesJson: row.ignored_alternatives_json ?? [],
    executionTasksJson: row.execution_tasks_json ?? [],
    confidenceLevel: row.confidence_level,
    successCriteria: row.success_criteria,
    createdAt: new Date(row.created_at),
  };
}

export function toRecommendationSource(row: Row): RecommendationSource {
  return {
    id: row.id,
    recommendationId: row.recommendation_id,
    title: row.title,
    url: row.url,
    snippet: row.snippet,
    signalSummary: row.signal_summary,
  };
}

export function toRecommendationFeedback(row: Row): RecommendationFeedbackRow {
  return {
    id: row.id,
    recommendationId: row.recommendation_id,
    actedOn: row.acted_on,
    usefulness: row.usefulness,
    choseRightOption: row.chose_right_option ?? null,
    betterOptionTitle: row.better_option_title ?? null,
    feltWrongNotes: row.felt_wrong_notes ?? null,
    tasksHelped: row.tasks_helped ?? null,
    outcomeNotes: row.outcome_notes,
    blockers: row.blockers,
    changedThisWeek: row.changed_this_week,
    nextTimeNotes: row.next_time_notes,
    memoryNote: row.memory_note,
    createdAt: new Date(row.created_at),
  };
}
