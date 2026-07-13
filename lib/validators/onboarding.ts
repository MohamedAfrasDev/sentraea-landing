import { z } from "zod";

export const STARTUP_STAGES = [
  { value: "idea", label: "Idea", hint: "Exploring, not building yet" },
  { value: "mvp", label: "MVP", hint: "Building or just shipped a first version" },
  { value: "early_users", label: "Early users", hint: "People are using it, no real revenue" },
  { value: "revenue", label: "Revenue", hint: "Paying customers, want to grow" },
] as const;

const optionalUrl = z
  .string()
  .trim()
  .transform((v) => (v === "" ? undefined : v))
  .optional()
  .refine(
    (v) => v === undefined || /^https?:\/\/[^\s]+\.[^\s]+/.test(v),
    "Enter a full URL starting with http:// or https://",
  );

const optionalText = z
  .string()
  .trim()
  .max(2000, "Keep this under 2000 characters.")
  .transform((v) => (v === "" ? undefined : v))
  .optional();

export const startupProfileSchema = z.object({
  startupName: z
    .string()
    .trim()
    .min(1, "What's your startup called?")
    .max(120),
  productSummary: z
    .string()
    .trim()
    .min(10, "Give us at least one full sentence.")
    .max(500, "Keep the summary under 500 characters."),
  customerType: z
    .string()
    .trim()
    .min(3, "Who is this for? e.g. 'bootstrapped SaaS founders'.")
    .max(300),
  stage: z.enum(["idea", "mvp", "early_users", "revenue"], {
    message: "Pick the stage that fits best.",
  }),
  mainGoal30d: z
    .string()
    .trim()
    .min(5, "What matters most in the next 30 days?")
    .max(500),
  bottleneck: z
    .string()
    .trim()
    .min(5, "What feels most stuck right now?")
    .max(500),
  priorities: z
    .array(z.string().trim().min(1).max(300))
    .min(1, "Add at least one priority you're weighing.")
    .max(8, "Keep it to the 8 priorities that actually compete."),
  websiteUrl: optionalUrl,
  productUrl: optionalUrl,
  competitorUrls: z
    .array(z.string().trim().url("Each competitor entry must be a full URL."))
    .max(6)
    .default([]),
  recentChanges: optionalText,
  notes: optionalText,
});

export type StartupProfileInput = z.infer<typeof startupProfileSchema>;
