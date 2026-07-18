import { MockupCard, MockupLabel } from "./mockup-primitives";
import { cn } from "@/lib/utils";

/**
 * Tiny continuity card for the FAQ section: last week's move, this week's
 * move, and what changed — reinforcing that Sentraea retains startup context
 * over time instead of giving one-off answers.
 */

const TIMELINE = [
  {
    label: "Last week",
    text: "Tighten outbound ICP list",
    meta: "Done — reply rate improved",
    tone: "done",
  },
  {
    label: "This week",
    text: "Rewrite demo flow for ICP X",
    meta: "Chosen from your current signals",
    tone: "active",
  },
  {
    label: "What changed",
    text: "Close rate still falling · pipeline stable",
    meta: null,
    tone: "note",
  },
] as const;

export function ContinuityMemoryMiniCard() {
  return (
    <div
      role="img"
      aria-label="Sentraea memory card showing week twelve: last week's completed move, this week's recommended move, and what changed in between — context retained across weeks"
      className="mx-auto w-full max-w-md select-none"
    >
      <MockupCard className="p-4">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-2.5">
          <MockupLabel>Sentraea memory</MockupLabel>
          <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
            Week 12
          </span>
        </div>

        <ul className="mt-3 space-y-0">
          {TIMELINE.map(({ label, text, meta, tone }, i) => (
            <li key={label} className="relative flex gap-3 pb-3.5 last:pb-0">
              {/* Rail */}
              <span
                className="flex w-3 shrink-0 flex-col items-center"
                aria-hidden
              >
                <span
                  className={cn(
                    "mt-1 size-2 rounded-full",
                    tone === "done" && "bg-emerald-400",
                    tone === "active" && "bg-blue-500 ring-4 ring-blue-100",
                    tone === "note" && "bg-neutral-300",
                  )}
                />
                {i < TIMELINE.length - 1 && (
                  <span className="mt-1 w-px flex-1 bg-neutral-200" />
                )}
              </span>
              <div className="min-w-0">
                <p className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">
                  {label}
                </p>
                <p
                  className={cn(
                    "text-xs leading-snug",
                    tone === "active"
                      ? "font-semibold text-neutral-900"
                      : "font-medium text-neutral-600",
                  )}
                >
                  {text}
                </p>
                {meta && (
                  <p className="text-[10px] text-neutral-400">{meta}</p>
                )}
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-3 border-t border-neutral-100 pt-2.5 text-[10px] font-medium text-neutral-400">
          Context retained · 12 weeks of history
        </p>
      </MockupCard>
    </div>
  );
}
