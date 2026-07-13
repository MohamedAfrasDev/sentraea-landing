import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { OnboardingForm } from "@/components/onboarding/onboarding-form";
import { getStartupProfile, requireUser } from "@/lib/auth/session";

import HorizontalLogo from "@/public/logos/SENTRAEA.svg";

export const metadata: Metadata = {
  title: "Set up your startup | Sentraea",
};

export default async function OnboardingPage() {
  const user = await requireUser();
  const profile = await getStartupProfile(user.id);

  if (profile?.onboardingCompleted) redirect("/app");

  // A partial profile (edge case: interrupted onboarding) seeds the form.
  const initialDraft = profile
    ? {
        startupName: profile.startupName,
        productSummary: profile.productSummary,
        customerType: profile.customerType,
        stage: profile.stage,
        mainGoal30d: profile.mainGoal30d,
        bottleneck: profile.bottleneck,
        priorities: profile.priorities.length ? profile.priorities : [""],
        websiteUrl: profile.websiteUrl ?? "",
        productUrl: profile.productUrl ?? "",
        competitorUrls: profile.competitorUrls,
        recentChanges: profile.recentChanges ?? "",
        notes: profile.notes ?? "",
      }
    : undefined;

  return (
    <div className="relative min-h-screen bg-background px-5 py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#d8dbe2_1px,transparent_1px)] bg-size-[22px_22px] opacity-40 mask-[radial-gradient(ellipse_70%_50%_at_50%_30%,#000_50%,transparent_100%)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center">
        <Link href="/" className="mb-8">
          <Image src={HorizontalLogo} alt="Sentraea" width={160} height={42} />
        </Link>

        <div className="mb-8 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
            Founder setup
          </p>
          <h1 className="mt-3 font-heading text-3xl font-medium tracking-tight md:text-4xl">
            Tell Sentraea where you are.
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
            This context drives every weekly recommendation. Be honest about
            the messy parts — that&apos;s where the leverage usually hides.
          </p>
        </div>

        <OnboardingForm initialDraft={initialDraft} />

        <p className="mt-8 font-mono text-[11px] tracking-wide text-muted-foreground">
          You can change all of this later in Settings.
        </p>
      </div>
    </div>
  );
}
