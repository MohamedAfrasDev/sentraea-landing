"use server";

import { redirect } from "next/navigation";

import { track } from "@/lib/analytics";
import { requireUser } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  startupProfileSchema,
  type StartupProfileInput,
} from "@/lib/validators/onboarding";

export type OnboardingActionState = {
  error?: string;
  fieldErrors?: Record<string, string>;
};

function parseProfileForm(formData: FormData) {
  return startupProfileSchema.safeParse({
    startupName: formData.get("startupName"),
    productSummary: formData.get("productSummary"),
    customerType: formData.get("customerType"),
    stage: formData.get("stage"),
    mainGoal30d: formData.get("mainGoal30d"),
    bottleneck: formData.get("bottleneck"),
    priorities: formData
      .getAll("priorities")
      .map(String)
      .filter((p) => p.trim() !== ""),
    websiteUrl: formData.get("websiteUrl") ?? "",
    productUrl: formData.get("productUrl") ?? "",
    competitorUrls: formData
      .getAll("competitorUrls")
      .map(String)
      .filter((u) => u.trim() !== ""),
    recentChanges: formData.get("recentChanges") ?? "",
    notes: formData.get("notes") ?? "",
  });
}

function toFieldErrors(issues: { path: PropertyKey[]; message: string }[]) {
  const fieldErrors: Record<string, string> = {};
  for (const issue of issues) {
    const key = String(issue.path[0] ?? "form");
    if (!fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return fieldErrors;
}

function toProfileRow(userId: string, data: StartupProfileInput) {
  return {
    user_id: userId,
    startup_name: data.startupName,
    product_summary: data.productSummary,
    customer_type: data.customerType,
    stage: data.stage,
    main_goal_30d: data.mainGoal30d,
    bottleneck: data.bottleneck,
    priorities: data.priorities,
    website_url: data.websiteUrl ?? null,
    product_url: data.productUrl ?? null,
    competitor_urls: data.competitorUrls,
    recent_changes: data.recentChanges ?? null,
    notes: data.notes ?? null,
  };
}

export async function completeOnboarding(
  _prev: OnboardingActionState,
  formData: FormData,
): Promise<OnboardingActionState> {
  const user = await requireUser();

  const parsed = parseProfileForm(formData);
  if (!parsed.success) {
    return {
      error: "A few fields need attention before we can continue.",
      fieldErrors: toFieldErrors(parsed.error.issues),
    };
  }

  const supabase = await createSupabaseServerClient();

  // The auth.users → public.users mirror trigger covers new sign-ups, but
  // accounts created before it existed have no public.users row, which
  // breaks the startup_profiles FK. Idempotent self-insert (RLS: own id only).
  const { error: userRowError } = await supabase
    .from("users")
    .upsert({ id: user.id, email: user.email }, { onConflict: "id", ignoreDuplicates: true });
  if (userRowError) {
    return {
      error: `Could not prepare your account: ${userRowError.message}. If this persists, run supabase/migrations/0002_weekly_options.sql in the Supabase SQL editor.`,
    };
  }

  // The startup_profiles_user_id_idx unique index makes this an upsert:
  // creates the profile on first onboarding, updates it on a re-submit.
  const { error } = await supabase.from("startup_profiles").upsert(
    {
      ...toProfileRow(user.id, parsed.data),
      onboarding_completed: true,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  );
  if (error) {
    return { error: `Could not save your profile: ${error.message}` };
  }

  track("onboarding_completed", { userId: user.id });
  redirect("/app");
}

export async function updateStartupProfile(
  _prev: OnboardingActionState,
  formData: FormData,
): Promise<OnboardingActionState & { success?: boolean }> {
  const user = await requireUser();

  const parsed = parseProfileForm(formData);
  if (!parsed.success) {
    return {
      error: "A few fields need attention.",
      fieldErrors: toFieldErrors(parsed.error.issues),
    };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("startup_profiles")
    .update({
      ...toProfileRow(user.id, parsed.data),
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", user.id)
    .select("id")
    .maybeSingle();
  if (error) {
    return { error: `Could not save changes: ${error.message}` };
  }
  if (!data) {
    return { error: "No startup profile found. Complete onboarding first." };
  }

  return { success: true };
}
