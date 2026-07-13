import type { Metadata } from "next";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  CircleSlash,
  ListChecks,
  Radar,
  ScrollText,
  Target,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CopyBriefButton } from "@/components/recommendations/copy-brief-button";
import { FeedbackActions } from "@/components/recommendations/feedback-actions";
import {
  ConfidenceBadge,
  Eyebrow,
  OptionMetaRow,
  OPTION_TYPE_LABELS,
  formatWeekOf,
} from "@/components/shared/brief-bits";
import { Card } from "@/components/ui/card";
import { track } from "@/lib/analytics";
import { requireOnboardedUser } from "@/lib/auth/session";
import { getRecommendationForUser } from "@/lib/db/queries";
import type { RejectedOption, WeeklyOption } from "@/lib/db/schema";

export const metadata: Metadata = {
  title: "Weekly decision | Sentraea",
};

type Detail = NonNullable<Awaited<ReturnType<typeof getRecommendationForUser>>>;

/**
 * Older recommendations (pre-options) stored rejected reasoning in
 * ignored_alternatives_json — fall back so history still renders fully.
 */
function rejectedOptions(detail: Detail): RejectedOption[] {
  if (detail.recommendation.rejectedOptionsJson.length) {
    return detail.recommendation.rejectedOptionsJson;
  }
  return detail.recommendation.ignoredAlternativesJson.map((a) => ({
    optionId: null,
    title: a.alternative,
    reason: a.reason,
  }));
}

function buildBriefText(detail: Detail): string {
  const r = detail.recommendation;
  const rejected = rejectedOptions(detail);
  return [
    `SENTRAEA — ${formatWeekOf(detail.weekStartDate)}`,
    "",
    `CHOSEN THIS WEEK: ${r.recommendationTitle}`,
    r.recommendationSummary,
    "",
    `WHY THIS WINS NOW: ${r.whyNow}`,
    "",
    "WHY THE OTHER OPTIONS LOST:",
    ...rejected.map((o) => `- ${o.title}: ${o.reason}`),
    "",
    "EXECUTION TASKS:",
    ...r.executionTasksJson.map((t, i) => `${i + 1}. ${t}`),
    "",
    `SUCCESS CRITERIA: ${r.successCriteria}`,
    `CONFIDENCE: ${r.confidenceLevel}`,
    "",
    "SOURCES:",
    ...detail.sources.map((s) => `- ${s.title} — ${s.url}`),
  ].join("\n");
}

function optionById(
  options: WeeklyOption[],
  id: string | null,
): WeeklyOption | null {
  return id ? (options.find((o) => o.id === id) ?? null) : null;
}

export default async function RecommendationPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ reviewed?: string }>;
}) {
  const { user } = await requireOnboardedUser();
  const { id } = await params;
  const { reviewed } = await searchParams;

  const detail = await getRecommendationForUser(user.id, id);
  if (!detail) notFound();

  const r = detail.recommendation;
  const rejected = rejectedOptions(detail);
  const chosen = detail.chosenOption;
  track("recommendation_viewed", { recommendationId: r.id, userId: user.id });

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      {reviewed ? (
        <p className="rounded-sm border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Week closed. Your review feeds directly into next week&apos;s
          decision.
        </p>
      ) : null}

      {/* A. Chosen this week */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Eyebrow>
            {formatWeekOf(detail.weekStartDate)} · Chosen from{" "}
            {detail.options.length || rejected.length + 1} options
          </Eyebrow>
          <ConfidenceBadge level={r.confidenceLevel} />
        </div>
        <h1 className="font-heading text-3xl font-medium leading-tight tracking-tight md:text-[40px]">
          {r.recommendationTitle}
        </h1>
        {chosen ? (
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>
                Your option: <span className="font-medium text-foreground">{chosen.title}</span>
              </span>
            </div>
            <OptionMetaRow
              type={chosen.type}
              expectedImpact={chosen.expectedImpact}
              effort={chosen.effort}
              reversible={chosen.reversible}
            />
          </div>
        ) : detail.options.length ? (
          <p className="text-sm text-muted-foreground">
            Sentraea went outside your list this week — the reasoning below
            explains why none of the listed options addressed the leverage
            point.
          </p>
        ) : null}
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
          {r.recommendationSummary}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <FeedbackActions
            recommendationId={r.id}
            currentUsefulness={detail.feedback?.usefulness ?? null}
          />
          <CopyBriefButton briefText={buildBriefText(detail)} />
        </div>
      </div>

      {/* B. Why this wins now */}
      <Card className="gap-3 border-l-2 border-l-primary px-6 py-6 md:px-8">
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-primary" />
          <h2 className="font-heading text-lg font-medium tracking-tight">
            Why this wins now
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-foreground/90 md:text-[15px]">
          {r.whyNow}
        </p>
      </Card>

      {/* Signals grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="gap-3 px-6 py-6">
          <div className="flex items-center gap-2">
            <ScrollText className="h-4 w-4 text-muted-foreground" />
            <h2 className="font-heading text-lg font-medium tracking-tight">
              Internal context used
            </h2>
          </div>
          <ul className="flex flex-col gap-2.5">
            {r.internalSignalsJson.map((signal, i) => (
              <li key={i} className="flex gap-2.5 text-sm leading-relaxed">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
                {signal}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="gap-3 px-6 py-6">
          <div className="flex items-center gap-2">
            <Radar className="h-4 w-4 text-muted-foreground" />
            <h2 className="font-heading text-lg font-medium tracking-tight">
              External market signals
            </h2>
          </div>
          {r.externalSignalsJson.length ? (
            <ul className="flex flex-col gap-2.5">
              {r.externalSignalsJson.map((signal, i) => (
                <li key={i} className="flex gap-2.5 text-sm leading-relaxed">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                  {signal}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm leading-relaxed text-muted-foreground">
              Live web research wasn&apos;t available for this run, so this
              week&apos;s decision rests on your internal context alone — the
              confidence level reflects that.
            </p>
          )}
        </Card>
      </div>

      {/* C. Why the other options lost */}
      <Card className="gap-3 px-6 py-6 md:px-8">
        <div className="flex items-center gap-2">
          <CircleSlash className="h-4 w-4 text-muted-foreground" />
          <h2 className="font-heading text-lg font-medium tracking-tight">
            Why the other options lost this week
          </h2>
        </div>
        <p className="text-xs text-muted-foreground">
          Lower leverage right now — not wrong forever. Some of these may win a
          future week.
        </p>
        {rejected.length ? (
          <ul className="flex flex-col divide-y divide-muted-foreground/10">
            {rejected.map((opt, i) => {
              const original = optionById(detail.options, opt.optionId);
              return (
                <li
                  key={i}
                  className="flex flex-col gap-1.5 py-3.5 first:pt-0 last:pb-0"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium">{opt.title}</p>
                    {original ? (
                      <OptionMetaRow
                        type={original.type}
                        expectedImpact={original.expectedImpact}
                        effort={original.effort}
                        reversible={original.reversible}
                      />
                    ) : null}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {opt.reason}
                  </p>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">
            No competing options were recorded for this week.
          </p>
        )}
      </Card>

      {/* E. Execution support */}
      <Card className="gap-3 px-6 py-6 md:px-8">
        <div className="flex items-center gap-2">
          <ListChecks className="h-4 w-4 text-muted-foreground" />
          <h2 className="font-heading text-lg font-medium tracking-tight">
            {chosen
              ? `Start executing — ${OPTION_TYPE_LABELS[chosen.type] ?? chosen.type} playbook`
              : "Start executing"}
          </h2>
        </div>
        <p className="text-xs text-muted-foreground">
          Small and reversible — each one is hours, not weeks.
        </p>
        <ol className="flex flex-col gap-2.5">
          {r.executionTasksJson.map((task, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-foreground/5 font-mono text-[10px] font-medium">
                {i + 1}
              </span>
              {task}
            </li>
          ))}
        </ol>
      </Card>

      {/* F. Success criteria */}
      <Card className="gap-2 bg-foreground text-background px-6 py-6 md:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-background/60">
          By the end of the week
        </p>
        <p className="font-heading text-lg leading-relaxed tracking-tight md:text-xl">
          {r.successCriteria}
        </p>
        {chosen ? (
          <p className="text-sm text-background/60">
            Your stated target: {chosen.targetOutcome}
          </p>
        ) : null}
      </Card>

      {/* G. Evidence / sources */}
      <div className="flex flex-col gap-3">
        <h2 className="font-heading text-lg font-medium tracking-tight">
          Evidence & sources
        </h2>
        {detail.sources.length ? (
          <ul className="flex flex-col gap-2">
            {detail.sources.map((source) => (
              <li key={source.id}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-1 rounded-md border border-muted-foreground/10 bg-card px-4 py-3 transition-colors hover:border-primary/30"
                >
                  <span className="flex items-start justify-between gap-2">
                    <span className="text-sm font-medium leading-snug group-hover:text-primary">
                      {source.title}
                    </span>
                    <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground group-hover:text-primary" />
                  </span>
                  {source.signalSummary ? (
                    <span className="text-xs leading-relaxed text-muted-foreground">
                      {source.signalSummary}
                    </span>
                  ) : source.snippet ? (
                    <span className="text-xs leading-relaxed text-muted-foreground">
                      “{source.snippet.slice(0, 180)}
                      {source.snippet.length > 180 ? "…" : ""}”
                    </span>
                  ) : null}
                  <span className="truncate font-mono text-[10px] text-muted-foreground/70">
                    {source.url}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm leading-relaxed text-muted-foreground">
            No external sources were used for this brief — web research
            wasn&apos;t available this run.
          </p>
        )}
      </div>

      {/* Footer actions */}
      <div className="flex flex-col items-start gap-3 border-t border-muted-foreground/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href={`/app/weekly-review/${r.id}`}
          className="inline-flex items-center gap-1.5 rounded-sm bg-black px-4 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-px"
        >
          Start weekly review <ArrowRight className="h-4 w-4" />
        </Link>
        <p className="text-xs text-muted-foreground">
          Work the chosen option first — run a new analysis next week.
        </p>
      </div>
    </div>
  );
}
