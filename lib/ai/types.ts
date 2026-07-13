import type {
  StartupProfile,
  WeeklyContext,
  WeeklyOption,
} from "@/lib/db/schema";

/** Everything the pipeline knows about the founder before reasoning starts. */
export type FounderContext = {
  profile: StartupProfile;
  weeklyContext: WeeklyContext;
  /** The founder's explicit options for this week — the decision set. */
  options: WeeklyOption[];
  /** Memory notes distilled from previous weekly reviews, newest first. */
  previousFeedbackNotes: string[];
  /** Titles of previous recommendations, newest first (avoid repeating moves). */
  previousRecommendationTitles: string[];
};

export function describeOption(option: WeeklyOption, index: number): string {
  const parts = [
    `Option ${index + 1} [id: ${option.id}] — ${option.title}`,
    `  type: ${option.type} · expected impact: ${option.expectedImpact} · effort: ${option.effort} · reversible: ${option.reversible ? "yes" : "no"}`,
    `  target outcome: ${option.targetOutcome}`,
  ];
  if (option.note) parts.push(`  note: ${option.note}`);
  return parts.join("\n");
}

export function describeFounderContext(ctx: FounderContext): string {
  const { profile, weeklyContext } = ctx;
  const lines = [
    `Startup: ${profile.startupName}`,
    `Product: ${profile.productSummary}`,
    `Customer / ICP: ${profile.customerType}`,
    `Stage: ${profile.stage}`,
    `Primary goal (next 30 days): ${profile.mainGoal30d}`,
    `Current bottleneck (profile): ${profile.bottleneck}`,
    `Priorities being considered: ${profile.priorities.join("; ") || "none listed"}`,
  ];
  if (profile.websiteUrl) lines.push(`Website: ${profile.websiteUrl}`);
  if (profile.productUrl) lines.push(`Product URL: ${profile.productUrl}`);
  if (profile.competitorUrls.length)
    lines.push(`Competitors: ${profile.competitorUrls.join(", ")}`);
  if (profile.recentChanges)
    lines.push(`Recent changes (profile): ${profile.recentChanges}`);
  if (profile.notes) lines.push(`Founder notes: ${profile.notes}`);

  lines.push("", "--- This week's options (the decision set) ---");
  if (ctx.options.length) {
    lines.push(...ctx.options.map((o, i) => describeOption(o, i)));
  } else {
    lines.push("No explicit options were provided this week.");
  }

  lines.push("", "--- This week's supporting context ---");
  if (weeklyContext.plannedWork)
    lines.push(`Planned work: ${weeklyContext.plannedWork}`);
  if (weeklyContext.currentBlocker)
    lines.push(`Feels most stuck: ${weeklyContext.currentBlocker}`);
  if (weeklyContext.recentChanges)
    lines.push(`Changed since last week: ${weeklyContext.recentChanges}`);
  if (weeklyContext.notes) lines.push(`New notes: ${weeklyContext.notes}`);

  if (ctx.previousFeedbackNotes.length) {
    lines.push(
      "",
      "--- Memory from previous weekly reviews (newest first) ---",
      ...ctx.previousFeedbackNotes.map((n) => `- ${n}`),
    );
  }
  if (ctx.previousRecommendationTitles.length) {
    lines.push(
      "",
      "--- Previous weekly recommendations (do not repeat unless clearly still the right move) ---",
      ...ctx.previousRecommendationTitles.map((t) => `- ${t}`),
    );
  }
  return lines.join("\n");
}
