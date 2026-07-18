import { MockupCard } from "./mockup-primitives";

/**
 * Email-preview card for the early-access section: shows exactly what a
 * member receives every Monday, answering "what do I actually get if I join?"
 */

const BRIEF_LINES = [
  { label: "Bottleneck", value: "Conversion", accent: "text-amber-700" },
  {
    label: "Move",
    value: "Rewrite demo flow for ICP X",
    accent: "text-neutral-900",
  },
  {
    label: "Why",
    value: "Close rate has dropped for 3 weeks",
    accent: "text-neutral-600",
  },
  {
    label: "Ignore",
    value: "Blog sprint",
    accent: "text-neutral-400 line-through decoration-neutral-300",
  },
] as const;

export function WeeklyBriefDeliveryMockup() {
  return (
    <div
      role="img"
      aria-label="Email preview from Sentraea titled Your Sentraea Weekly Brief, listing the bottleneck as conversion, the move as rewriting the demo flow, the reason as a three-week close-rate drop, and blog sprint as the thing to ignore"
      className="w-full max-w-sm select-none"
    >
      <MockupCard className="overflow-hidden p-0">
        {/* Inbox-style header */}
        <div className="flex items-start gap-3 border-b border-neutral-100 px-4 py-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
            S
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-xs font-bold text-neutral-800">Sentraea</p>
              <p className="shrink-0 text-[10px] font-medium text-neutral-400">
                Mon 8:00 AM
              </p>
            </div>
            <p className="truncate text-xs font-semibold text-neutral-700">
              Your Sentraea Weekly Brief
            </p>
          </div>
        </div>

        {/* Body preview */}
        <ul className="space-y-2 px-4 py-3.5">
          {BRIEF_LINES.map(({ label, value, accent }) => (
            <li key={label} className="flex items-baseline gap-2 text-xs">
              <span className="w-16 shrink-0 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                {label}
              </span>
              <span className={`font-medium leading-snug ${accent}`}>
                {value}
              </span>
            </li>
          ))}
        </ul>

        <div className="border-t border-neutral-100 bg-neutral-50/60 px-4 py-2.5">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600">
            Open full brief
            <svg
              className="size-3"
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
          </span>
        </div>
      </MockupCard>
    </div>
  );
}
