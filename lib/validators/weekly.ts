import { z } from "zod";

export const OPTION_TYPES = [
  { value: "build", label: "Build" },
  { value: "outreach", label: "Outreach" },
  { value: "research", label: "Research" },
  { value: "sales", label: "Sales" },
  { value: "ops", label: "Ops" },
] as const;

export const IMPACT_LEVELS = ["low", "medium", "high"] as const;

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((v) => (v === "" ? undefined : v))
    .optional();

export const weeklyOptionSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Give this option a short, concrete title.")
    .max(200),
  type: z.enum(["build", "outreach", "research", "sales", "ops"], {
    message: "Pick the closest type.",
  }),
  expectedImpact: z.enum(["low", "medium", "high"], {
    message: "How much would this move the needle?",
  }),
  effort: z.enum(["low", "medium", "high"], {
    message: "How much of your week would this take?",
  }),
  reversible: z.boolean(),
  targetOutcome: z
    .string()
    .trim()
    .min(3, "What outcome or metric is this aimed at?")
    .max(300),
  note: optionalText(500),
});

export type WeeklyOptionInput = z.infer<typeof weeklyOptionSchema>;

export const weeklyContextSchema = z.object({
  options: z
    .array(weeklyOptionSchema)
    .min(3, "List at least 3 real options — Sentraea chooses between them.")
    .max(5, "Keep it to the 5 options that are actually on the table."),
  currentBlocker: optionalText(2000),
  recentChanges: optionalText(2000),
  notes: optionalText(2000),
});

export type WeeklyContextInput = z.infer<typeof weeklyContextSchema>;

export const weeklyReviewSchema = z.object({
  choseRightOption: z.enum(["yes", "no"], {
    message: "Did Sentraea pick the right option?",
  }),
  actedOn: z.enum(["yes", "no", "partially"], {
    message: "Did you act on the recommendation?",
  }),
  usefulness: z.enum(["useful", "not_useful"], {
    message: "Was it useful?",
  }),
  betterOptionTitle: optionalText(300),
  feltWrongNotes: optionalText(2000),
  tasksHelped: z.enum(["yes", "somewhat", "no"], {
    message: "Did the execution tasks help you start?",
  }),
  outcomeNotes: optionalText(2000),
  changedThisWeek: optionalText(2000),
  nextTimeNotes: optionalText(2000),
});

export type WeeklyReviewFormInput = z.infer<typeof weeklyReviewSchema>;
