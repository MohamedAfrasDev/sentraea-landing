import { ReactNode } from "react";
import { MockupCard, MockupLabel, ToolChip } from "./mockup-primitives";

/**
 * Three-panel workflow strip for the "How it works" section:
 * Inputs → Diagnosis → Recommendation. Shows how business signals become
 * one weekly move. Sits on the section's dark background, so connecting
 * arrows are light.
 */

const CONNECTED_TOOLS = [
  "Stripe",
  "HubSpot",
  "Notion",
  "Linear",
  "PostHog",
] as const;

const DIAGNOSIS_CHECKS = [
  { text: "Pipeline volume stable", warning: false },
  { text: "Close rate falling", warning: true },
  { text: "Activation normal", warning: false },
] as const;

function FlowArrow() {
  return (
    <div className="flex items-center justify-center py-1 text-white/70 md:py-0">
      <svg
        className="size-4 rotate-90 md:rotate-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </div>
  );
}

export function FlowPanel({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <MockupCard className="flex h-full flex-col gap-3">
      <div className=" pb-2">
        <MockupLabel className="text-sm font-medium">{label}</MockupLabel>
      </div>
      {children}
    </MockupCard>
  );
}

export function HowItWorksFlowMockup() {
  return (
    <div
      role="img"
      aria-label="Product workflow in three panels: connected tools and founder notes as inputs, a diagnosis naming conversion as the bottleneck, and one recommended move with approve, edit, and send-to-Linear controls"
      className="grid select-none items-stretch gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:gap-3"
    >
      {/* 1 — Inputs */}
      <FlowPanel label="Inputs">
        <div className="flex flex-wrap gap-1.5">
          {CONNECTED_TOOLS.map((tool) => (
            <ToolChip key={tool} name={tool} />
          ))}
        </div>
        <div className="rounded-sm bg-white px-2.5 py-2">
          <p className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">
            Founder note
          </p>
          <p className="mt-0.5 text-[11px] italic leading-snug text-neutral-600">
            “Demos go well, but deals keep stalling right after the call.”
          </p>
        </div>
        <div className="mt-auto flex items-center justify-between pt-1">
          <span className="text-[10px] font-medium text-neutral-400">
            Stage
          </span>
          <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
            Early traction
          </span>
        </div>
      </FlowPanel>

      <FlowArrow />

      {/* 2 — Diagnosis */}
      <FlowPanel label="Diagnosis">
        <div className="rounded-lg border border-amber-200/40 bg-amber-50/50 px-3 py-2">
          <p className="text-[9px] font-bold uppercase tracking-wider text-amber-700">
            Current bottleneck
          </p>
          <p className="mt-0.5 text-sm font-semibold text-neutral-900">
            Conversion
          </p>
        </div>
        <ul className="space-y-2">
          {DIAGNOSIS_CHECKS.map(({ text, warning }) => (
            <li
              key={text}
              className="flex items-center gap-2 text-xs text-neutral-600"
            >
              {warning ? (
                <svg
                  className="size-3.5 shrink-0 text-amber-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              ) : (
                <svg
                  className="size-3.5 shrink-0 text-emerald-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
              {text}
            </li>
          ))}
        </ul>
      </FlowPanel>

      <FlowArrow />

      {/* 3 — Recommendation */}
      <FlowPanel label="Recommendation">
        <div className="space-y-1 border-l-2 border-blue-500 py-0.5 pl-3">
          <p className="text-sm font-semibold leading-snug text-neutral-900">
            Rewrite demo flow for ICP X
          </p>
          <p className="text-[11px] leading-snug text-neutral-500">
            Close rate has dropped for 3 weeks while pipeline held steady.
          </p>
        </div>
        <div>
          <p className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">
            Not this week
          </p>
          <p className="mt-0.5 text-[11px] text-neutral-400 line-through decoration-neutral-300">
            New blog series · Side integration
          </p>
        </div>
        <div className="mt-auto flex flex-wrap items-center gap-1.5 border-t border-neutral-100 pt-2.5">
          <span className="rounded-md bg-blue-600 px-2.5 py-1 text-[10px] font-semibold text-white">
            Approve
          </span>
          <span className="rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-neutral-600">
            Edit
          </span>
          <span className="rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-neutral-600">
            Send to Linear
          </span>
        </div>
      </FlowPanel>
    </div>
  );
}
