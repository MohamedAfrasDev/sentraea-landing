import { ReactNode } from "react";
import { MockupCard, MockupLabel } from "./mockup-primitives";

/**
 * "Before Sentraea" collage: four busy tool panels (CRM, tasks, analytics,
 * notes) slightly tilted and competing for attention, with one floating
 * verdict — "No clear priority". Supports the problem section emotionally
 * without turning into a full dashboard.
 */

const CRM_DEALS = [
  { name: "Acme Corp", status: "Demo booked", tone: "text-blue-600 bg-blue-50" },
  { name: "Northwind", status: "No reply · 6d", tone: "text-amber-700 bg-amber-50" },
  { name: "Globex", status: "Proposal sent", tone: "text-neutral-500 bg-neutral-100" },
] as const;

const TASKS = [
  "Ship onboarding v2",
  "Write 5 cold emails",
  "Fix billing edge case",
  "Record new demo video",
] as const;

const NOTES = [
  "Try LinkedIn outbound?",
  "Rebuild pricing page",
  "Podcast outreach",
  "Ship Slack integration?",
] as const;

function PanelHeader({ label }: { label: string }) {
  return (
    <div className="mb-2.5 flex items-center justify-between border-b border-neutral-100 pb-2">
      <MockupLabel>{label}</MockupLabel>
      <span className="flex gap-1" aria-hidden>
        <span className="size-1.5 rounded-full bg-neutral-200" />
        <span className="size-1.5 rounded-full bg-neutral-200" />
        <span className="size-1.5 rounded-full bg-neutral-200" />
      </span>
    </div>
  );
}

function Panel({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <MockupCard className={className}>
      <PanelHeader label={label} />
      {children}
    </MockupCard>
  );
}

export function ProblemChaosMockup() {
  return (
    <div
      role="img"
      aria-label="Four disconnected tool panels — CRM deals, tasks, trial analytics, and idea notes — all full of activity, overlaid with the verdict: no clear priority"
      className="relative mx-auto max-w-3xl select-none"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        <Panel label="CRM · Deals" className="sm:-rotate-1 sm:translate-y-1">
          <ul className="space-y-2">
            {CRM_DEALS.map(({ name, status, tone }) => (
              <li key={name} className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium text-neutral-700">
                  {name}
                </span>
                <span
                  className={`rounded px-1.5 py-0.5 text-[9px] font-semibold ${tone}`}
                >
                  {status}
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel label="Tasks · This week" className="sm:rotate-1">
          <ul className="space-y-2">
            {TASKS.map((task) => (
              <li key={task} className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-xs text-neutral-700">
                  <span
                    className="size-3 shrink-0 rounded-[3px] border border-neutral-300"
                    aria-hidden
                  />
                  {task}
                </span>
                <span className="rounded bg-rose-50 px-1.5 py-0.5 text-[9px] font-bold text-rose-600">
                  High
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel label="Analytics · Trials" className="sm:translate-y-0.5 sm:rotate-[1.5deg]">
          <svg
            viewBox="0 0 120 28"
            preserveAspectRatio="none"
            className="h-8 w-full text-neutral-400"
            aria-hidden
          >
            <path
              d="M0,14 L10,10 L20,17 L30,12 L40,19 L50,9 L60,15 L70,11 L80,18 L90,13 L100,16 L110,12 L120,15"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="mt-2 text-xs text-neutral-500">
            41 trials this week ·{" "}
            <span className="font-semibold text-neutral-600">flat</span>
          </p>
        </Panel>

        <Panel label="Notes · Ideas" className="sm:-translate-y-1 sm:-rotate-1">
          <ul className="space-y-2">
            {NOTES.map((note) => (
              <li
                key={note}
                className="flex items-center gap-2 text-xs text-neutral-600"
              >
                <span
                  className="size-1 shrink-0 rounded-full bg-neutral-300"
                  aria-hidden
                />
                {note}
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      {/* Floating verdict over the collage */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="rounded-full border border-amber-200 bg-amber-50/95 px-4 py-1.5 text-xs font-bold tracking-tight text-amber-800 shadow-[0_12px_32px_-8px_rgba(217,119,6,0.35)] backdrop-blur-sm sm:text-sm">
          No clear priority
        </span>
      </div>
    </div>
  );
}
