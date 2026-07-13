import type { Metadata } from "next";

import { AnalyzeFlow } from "@/components/analysis/analyze-flow";
import { Eyebrow } from "@/components/shared/brief-bits";
import { requireOnboardedUser } from "@/lib/auth/session";
import { getLatestRunForUser } from "@/lib/db/queries";

export const metadata: Metadata = {
  title: "Weekly analysis | Sentraea",
};

export default async function AnalyzePage() {
  const { profile } = await requireOnboardedUser();

  // Resume progress view if a run is already in flight.
  const latestRun = await getLatestRunForUser(profile.userId);
  const inFlight =
    latestRun != null &&
    latestRun.status !== "complete" &&
    latestRun.status !== "failed"
      ? latestRun.id
      : undefined;

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Eyebrow>Weekly analysis</Eyebrow>
        <h1 className="font-heading text-3xl font-medium tracking-tight md:text-4xl">
          What could this week be?
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
          List the real options on your plate. Sentraea weighs them against
          your context and the live market, then picks one — and shows why it
          beats the others.
        </p>
      </div>

      <AnalyzeFlow initialRunId={inFlight} />
    </div>
  );
}
