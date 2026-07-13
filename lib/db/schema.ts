import {
  boolean,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

// Mirrors auth.users via the handle_new_user trigger (see supabase/migrations).
export const users = pgTable("users", {
  id: uuid("id").primaryKey(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const startupProfiles = pgTable("startup_profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  startupName: text("startup_name").notNull(),
  productSummary: text("product_summary").notNull(),
  customerType: text("customer_type").notNull(),
  stage: text("stage").notNull(), // idea | mvp | early_users | revenue
  mainGoal30d: text("main_goal_30d").notNull(),
  bottleneck: text("bottleneck").notNull(),
  priorities: jsonb("priorities").$type<string[]>().notNull().default([]),
  websiteUrl: text("website_url"),
  productUrl: text("product_url"),
  competitorUrls: jsonb("competitor_urls").$type<string[]>().notNull().default([]),
  recentChanges: text("recent_changes"),
  notes: text("notes"),
  onboardingCompleted: boolean("onboarding_completed").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const weeklyContexts = pgTable("weekly_contexts", {
  id: uuid("id").primaryKey().defaultRandom(),
  startupProfileId: uuid("startup_profile_id")
    .notNull()
    .references(() => startupProfiles.id, { onDelete: "cascade" }),
  weekStartDate: timestamp("week_start_date", { withTimezone: true })
    .notNull()
    .defaultNow(),
  plannedWork: text("planned_work"),
  currentBlocker: text("current_blocker"),
  recentChanges: text("recent_changes"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type WeeklyOptionType =
  | "build"
  | "outreach"
  | "research"
  | "sales"
  | "ops";
export type ImpactLevel = "low" | "medium" | "high";

// The founder's explicit choices for the week — what the decision engine
// chooses between.
export const weeklyOptions = pgTable("weekly_options", {
  id: uuid("id").primaryKey().defaultRandom(),
  weeklyContextId: uuid("weekly_context_id")
    .notNull()
    .references(() => weeklyContexts.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  type: text("type").$type<WeeklyOptionType>().notNull(),
  expectedImpact: text("expected_impact").$type<ImpactLevel>().notNull(),
  effort: text("effort").$type<ImpactLevel>().notNull(),
  reversible: boolean("reversible").notNull().default(true),
  targetOutcome: text("target_outcome").notNull(),
  note: text("note"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type RejectedOption = {
  optionId: string | null;
  title: string;
  reason: string;
};

export type ResearchRunStatus =
  | "pending"
  | "synthesizing_context"
  | "generating_questions"
  | "researching"
  | "deciding"
  | "complete"
  | "failed";

export const researchRuns = pgTable("research_runs", {
  id: uuid("id").primaryKey().defaultRandom(),
  weeklyContextId: uuid("weekly_context_id")
    .notNull()
    .references(() => weeklyContexts.id, { onDelete: "cascade" }),
  status: text("status").$type<ResearchRunStatus>().notNull().default("pending"),
  errorMessage: text("error_message"),
  contextSummaryJson: jsonb("context_summary_json"),
  generatedQuestionsJson: jsonb("generated_questions_json"),
  extractedSignalsJson: jsonb("extracted_signals_json"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const recommendations = pgTable("recommendations", {
  id: uuid("id").primaryKey().defaultRandom(),
  weeklyContextId: uuid("weekly_context_id")
    .notNull()
    .references(() => weeklyContexts.id, { onDelete: "cascade" }),
  chosenOptionId: uuid("chosen_option_id").references(() => weeklyOptions.id, {
    onDelete: "set null",
  }),
  rejectedOptionsJson: jsonb("rejected_options_json")
    .$type<RejectedOption[]>()
    .notNull()
    .default([]),
  recommendationTitle: text("recommendation_title").notNull(),
  recommendationSummary: text("recommendation_summary").notNull(),
  whyNow: text("why_now").notNull(),
  internalSignalsJson: jsonb("internal_signals_json")
    .$type<string[]>()
    .notNull()
    .default([]),
  externalSignalsJson: jsonb("external_signals_json")
    .$type<string[]>()
    .notNull()
    .default([]),
  ignoredAlternativesJson: jsonb("ignored_alternatives_json")
    .$type<{ alternative: string; reason: string }[]>()
    .notNull()
    .default([]),
  executionTasksJson: jsonb("execution_tasks_json")
    .$type<string[]>()
    .notNull()
    .default([]),
  confidenceLevel: text("confidence_level").notNull(), // low | medium | high
  successCriteria: text("success_criteria").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const recommendationSources = pgTable("recommendation_sources", {
  id: uuid("id").primaryKey().defaultRandom(),
  recommendationId: uuid("recommendation_id")
    .notNull()
    .references(() => recommendations.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  url: text("url").notNull(),
  snippet: text("snippet"),
  signalSummary: text("signal_summary"),
});

export const recommendationFeedback = pgTable("recommendation_feedback", {
  id: uuid("id").primaryKey().defaultRandom(),
  recommendationId: uuid("recommendation_id")
    .notNull()
    .references(() => recommendations.id, { onDelete: "cascade" }),
  actedOn: text("acted_on"), // yes | no | partially
  usefulness: text("usefulness"), // useful | not_useful
  choseRightOption: text("chose_right_option"), // yes | no
  betterOptionTitle: text("better_option_title"),
  feltWrongNotes: text("felt_wrong_notes"),
  tasksHelped: text("tasks_helped"), // yes | somewhat | no
  outcomeNotes: text("outcome_notes"),
  blockers: text("blockers"),
  changedThisWeek: text("changed_this_week"),
  nextTimeNotes: text("next_time_notes"),
  memoryNote: text("memory_note"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type StartupProfile = typeof startupProfiles.$inferSelect;
export type WeeklyContext = typeof weeklyContexts.$inferSelect;
export type WeeklyOption = typeof weeklyOptions.$inferSelect;
export type ResearchRun = typeof researchRuns.$inferSelect;
export type Recommendation = typeof recommendations.$inferSelect;
export type RecommendationSource = typeof recommendationSources.$inferSelect;
export type RecommendationFeedbackRow =
  typeof recommendationFeedback.$inferSelect;
