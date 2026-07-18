import { ReactNode } from "react";
import { MockupCard, MockupLabel } from "./mockup-primitives";

/**
 * Product strip under the four solution cards: one small screen fragment per
 * feature, in the same order as the cards above, proving each claim with a
 * believable slice of real UI.
 */

const SUMMARY_ROWS = [
  { label: "Trials", value: "+12%", trend: "up" },
  { label: "Demo→Close", value: "−18%", trend: "down" },
  { label: "Churn", value: "Stable", trend: "flat" },
] as const;

const FUNNEL_CHECKS = [
  { label: "Demand", healthy: true },
  { label: "Activation", healthy: true },
  { label: "Conversion", healthy: false },
] as const;

const DEPRIORITIZED = [
  "New blog series",
  "Side integration",
  "Homepage redesign",
] as const;

export function MiniScreen({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <MockupCard className="flex h-full flex-col gap-2.5 p-3.5">
      <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
        <MockupLabel>{label}</MockupLabel>
        <span className="flex gap-1" aria-hidden>
          <span className="size-1.5 rounded-full bg-neutral-200" />
          <span className="size-1.5 rounded-full bg-neutral-200" />
        </span>
      </div>
      {children}
    </MockupCard>
  );
}

function TrendIcon({ trend }: { trend: "up" | "down" | "flat" }) {
  if (trend === "flat") {
    return (
      <span className="size-1.5 rounded-full bg-neutral-400" aria-hidden />
    );
  }
  const isUp = trend === "up";
  return (
    <svg
      className={`size-3 ${isUp ? "text-emerald-500" : "text-rose-500"}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points={isUp ? "18 15 12 9 6 15" : "6 9 12 15 18 9"} />
    </svg>
  );
}

export function SolutionMiniScreens() {
  return (
    <div
      role="img"
      aria-label="Four screen fragments from Sentraea: a weekly growth summary, the current bottleneck highlighted as conversion, one recommended move, and a list of deprioritized work"
      className="grid select-none grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4"
    >
      {/* A — Weekly Growth Summary */}

      {/* B — What's Slowing Growth */}

      {/* C — One Recommended Move */}

      {/* D — What to Ignore for Now */}
    </div>
  );
}
