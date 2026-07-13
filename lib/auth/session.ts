import "server-only";

import { redirect } from "next/navigation";

import { toStartupProfile } from "@/lib/db/mappers";
import type { StartupProfile } from "@/lib/db/schema";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type SessionUser = {
  id: string;
  email: string;
};

export async function getSessionUser(): Promise<SessionUser | null> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  return { id: user.id, email: user.email ?? "" };
}

/** Redirects to /sign-in when unauthenticated. */
export async function requireUser(): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) redirect("/sign-in");
  return user;
}

export async function getStartupProfile(
  userId: string,
): Promise<StartupProfile | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("startup_profiles")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) {
    throw new Error(`Failed to load startup profile: ${error.message}`);
  }
  return data ? toStartupProfile(data) : null;
}

/**
 * For /app routes: requires auth AND a completed onboarding.
 * Redirects to /onboarding when setup is incomplete.
 */
export async function requireOnboardedUser(): Promise<{
  user: SessionUser;
  profile: StartupProfile;
}> {
  const user = await requireUser();
  const profile = await getStartupProfile(user.id);
  if (!profile || !profile.onboardingCompleted) redirect("/onboarding");
  return { user, profile };
}
