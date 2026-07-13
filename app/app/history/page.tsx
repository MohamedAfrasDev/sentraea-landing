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
import { getRecommendationHistory } from "@/lib/db/queries";

export const metadata: Metadata = {
  title: "History | Sentraea",
};

export default async function HistoryPage() {
  const { user } = await requireOnboardedUser();
  const history = await getRecommendationHistory(user.id);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Eyebrow>History</Eyebrow>
        <h1 className="font-heading text-3xl font-medium tracking-tight md:text-4xl">
          Every weekly move so far.
        </h1>
      </div>

      {history.length === 0 ? (
        <Card className="items-start gap-3 px-6 py-8 md:px-8">
          <p className="text-sm leading-relaxed text-muted-foreground">
            No recommendations yet. Run your first weekly analysis and it will
            show up here.
          </p>
          <Link
            href="/app/analyze"
            className="inline-flex items-center gap-1.5 rounded-sm bg-black px-4 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-px"
          >
            Run this week&apos;s analysis <ArrowRight className="h-4 w-4" />
          </Link>
        </Card>
      ) : (
        <ul className="flex flex-col gap-3">
          {history.map((item) => (
            <li key={item.recommendation.id}>
              <Link
                href={`/app/recommendations/${item.recommendation.id}`}
                className="group block"
              >
                <Card className="gap-3 px-6 py-5 transition-colors group-hover:border-primary/30">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-1.5">
                      <span className="font-mono text-[11px] tracking-wide text-muted-foreground">
                        {formatWeekOf(item.weekStartDate)}
                      </span>
                      <h2 className="font-heading text-lg font-medium leading-snug tracking-tight group-hover:text-primary">
                        {item.recommendation.recommendationTitle}
                      </h2>
                    </div>
                    <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <ConfidenceBadge
                      level={item.recommendation.confidenceLevel}
                    />
                    {item.feedback?.usefulness ? (
                      <UsefulnessBadge usefulness={item.feedback.usefulness} />
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        No review yet
                      </span>
                    )}
                  </div>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
