import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { WeeklyReviewForm } from "@/components/feedback/weekly-review-form";
import { Eyebrow, formatWeekOf } from "@/components/shared/brief-bits";
import { requireOnboardedUser } from "@/lib/auth/session";
import { getRecommendationForUser } from "@/lib/db/queries";

export const metadata: Metadata = {
  title: "Weekly review | Sentraea",
};

export default async function WeeklyReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { user } = await requireOnboardedUser();
  const { id } = await params;

  const detail = await getRecommendationForUser(user.id, id);
  if (!detail) notFound();

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Eyebrow>Weekly review · {formatWeekOf(detail.weekStartDate)}</Eyebrow>
        <h1 className="font-heading text-3xl font-medium tracking-tight md:text-4xl">
          How did the week go?
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
          You were working on:{" "}
          <Link
            href={`/app/recommendations/${detail.recommendation.id}`}
            className="font-medium text-foreground underline-offset-4 hover:text-primary hover:underline"
          >
            {detail.recommendation.recommendationTitle}
          </Link>
          . This is about decision quality, not journaling — honest answers
          directly change how next week&apos;s options get weighed.
        </p>
      </div>

      {detail.feedback?.actedOn ? (
        <p className="rounded-sm border border-muted-foreground/15 bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
          You already reviewed this week — submitting again will update your
          review.
        </p>
      ) : null}

      <WeeklyReviewForm
        recommendationId={detail.recommendation.id}
        chosenOptionTitle={detail.chosenOption?.title ?? null}
        otherOptionTitles={detail.options
          .filter((o) => o.id !== detail.recommendation.chosenOptionId)
          .map((o) => o.title)}
      />
    </div>
  );
}
