import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import {
  ConfidenceBadge,
  Eyebrow,
  formatWeekOf,
  UsefulnessBadge,
} from "@/components/shared/brief-bits";
import { Card } from "@/components/ui/card";
import { requireOnboardedUser } from "@/lib/auth/session";
import {
  getLatestRunForUser,
  getRecommendationHistory,
} from "@/lib/db/queries";
import { STARTUP_STAGES } from "@/lib/validators/onboarding";

export const metadata: Metadata = {
  title: "This week | Sentraea",
};

function isThisWeek(date: Date): boolean {
  const now = new Date();
  const day = (now.getDay() + 6) % 7; // Monday = 0
  const monday = new Date(now);
  monday.setDate(now.getDate() - day);
  monday.setHours(0, 0, 0, 0);
  return date >= monday;
}

export default async function DashboardPage() {
  const { profile } = await requireOnboardedUser();
  const [history, latestRun] = await Promise.all([
    getRecommendationHistory(profile.userId, 4),
    getLatestRunForUser(profile.userId),
  ]);

  const latest = history[0] ?? null;
  const hasThisWeeksMove =
    latest != null && isThisWeek(latest.recommendation.createdAt);
  const runInProgress =
    latestRun != null &&
    latestRun.status !== "complete" &&
    latestRun.status !== "failed" &&
    isThisWeek(latestRun.createdAt);

  const stageLabel =
    STARTUP_STAGES.find((s) => s.value === profile.stage)?.label ??
    profile.stage;

  return (
    <div className="flex flex-col gap-8">
      {/* Welcome */}
      <div className="flex flex-col gap-1">
        <Eyebrow>{formatWeekOf(new Date())}</Eyebrow>
        <h1 className="font-heading text-3xl font-medium tracking-tight md:text-4xl">
          {profile.startupName}
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
          {hasThisWeeksMove
            ? "This week's move is ready. Work it, then close the week with a review."
            : runInProgress
              ? "An analysis is currently running for this week."
              : "No move decided for this week yet. Run the analysis when you're ready."}
        </p>
      </div>

      {/* Weekly status / primary action */}
      <Card className="gap-5 px-6 py-6 md:px-8 md:py-7">
        {hasThisWeeksMove && latest ? (
          <>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Eyebrow className="text-muted-foreground">
                This week&apos;s move
              </Eyebrow>
              <ConfidenceBadge level={latest.recommendation.confidenceLevel} />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="font-heading text-2xl font-medium leading-snug tracking-tight">
                {latest.recommendation.recommendationTitle}
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {latest.recommendation.recommendationSummary}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/app/recommendations/${latest.recommendation.id}`}
                className="inline-flex items-center gap-1.5 rounded-sm bg-black px-4 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-px"
              >
                Open the full brief <ArrowRight className="h-4 w-4" />
              </Link>
              {!latest.feedback ? (
                <Link
                  href={`/app/weekly-review/${latest.recommendation.id}`}
                  className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                  Close the week with a review
                </Link>
              ) : null}
            </div>
          </>
        ) : runInProgress ? (
          <>
            <Eyebrow className="text-muted-foreground">Weekly status</Eyebrow>
            <div className="flex flex-col gap-2">
              <h2 className="font-heading text-xl font-medium tracking-tight">
                Analysis in progress
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                Sentraea is researching your week. This usually takes a couple
                of minutes.
              </p>
            </div>
            <Link
              href="/app/analyze"
              className="inline-flex w-fit items-center gap-1.5 rounded-sm bg-black px-4 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-px"
            >
              View progress <ArrowRight className="h-4 w-4" />
            </Link>
          </>
        ) : (
          <>
            <Eyebrow className="text-muted-foreground">Weekly status</Eyebrow>
            <div className="flex flex-col gap-2">
              <h2 className="font-heading text-xl font-medium tracking-tight">
                Ready when you are
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                List the 3–5 real options on your plate this week. Sentraea
                weighs them against your context and the live market, then
                chooses one — and shows why it beats the others.
              </p>
            </div>
            <Link
              href="/app/analyze"
              className="inline-flex w-fit items-center gap-1.5 rounded-sm bg-black px-4 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-px"
            >
              Run this week&apos;s analysis <ArrowRight className="h-4 w-4" />
            </Link>
          </>
        )}
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
        {/* Startup summary */}
        <Card className="gap-4 px-6 py-6 md:col-span-2">
          <div className="flex items-center justify-between">
            <Eyebrow className="text-muted-foreground">Your startup</Eyebrow>
            <Link
              href="/app/settings"
              className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Edit
            </Link>
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <p className="leading-relaxed text-foreground">
              {profile.productSummary}
            </p>
            <dl className="flex flex-col gap-2">
              <div>
                <dt className="text-xs text-muted-foreground">Stage</dt>
                <dd>{stageLabel}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">
                  30-day goal
                </dt>
                <dd className="leading-relaxed">{profile.mainGoal30d}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Bottleneck</dt>
                <dd className="leading-relaxed">{profile.bottleneck}</dd>
              </div>
            </dl>
          </div>
        </Card>

        {/* History preview */}
        <Card className="gap-4 px-6 py-6 md:col-span-3">
          <div className="flex items-center justify-between">
            <Eyebrow className="text-muted-foreground">Recent moves</Eyebrow>
            {history.length > 0 ? (
              <Link
                href="/app/history"
                className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                View all
              </Link>
            ) : null}
          </div>
          {history.length === 0 ? (
            <p className="text-sm leading-relaxed text-muted-foreground">
              Nothing here yet. Your first weekly move will appear once you run
              an analysis.
            </p>
          ) : (
            <ul className="flex flex-col divide-y divide-muted-foreground/10">
              {history.map((item) => (
                <li key={item.recommendation.id}>
                  <Link
                    href={`/app/recommendations/${item.recommendation.id}`}
                    className="group flex items-start justify-between gap-3 py-3 first:pt-0 last:pb-0"
                  >
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium leading-snug group-hover:text-primary">
                        {item.recommendation.recommendationTitle}
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[11px] text-muted-foreground">
                          {formatWeekOf(item.weekStartDate)}
                        </span>
                        {item.feedback?.usefulness ? (
                          <UsefulnessBadge
                            usefulness={item.feedback.usefulness}
                          />
                        ) : null}
                      </div>
                    </div>
                    <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <p className="text-center font-mono text-[11px] leading-relaxed tracking-[0.08em] text-muted-foreground">
        Sentraea chooses one move from your real weekly options, backed by
        your context and live market evidence — not endless chat.
      </p>
    </div>
  );
}
