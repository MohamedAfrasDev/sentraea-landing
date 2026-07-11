import React from "react";

/* ---------------------------------------------------------------- */
/*  Weekly Console — the hero product mockup.                        */
/*  Communicates: this week's move, why now, confidence, evidence,   */
/*  and the small execution Sentraea handles around the decision.    */
/* ---------------------------------------------------------------- */

const EVIDENCE_CHIPS = [
  "Founder notes",
  "Activation data",
  "4 market signals",
  "Competitor shift",
];

const HANDLED_TASKS = [
  { label: "Draft 12 outreach emails", status: "drafted", tone: "blue" },
  { label: "Queue follow-up reminders", status: "queued", tone: "neutral" },
  { label: "Interview notes → summary", status: "done", tone: "emerald" },
];

const STATUS_STYLES: Record<string, string> = {
  blue: "bg-blue-50 text-blue-600 border-blue-100",
  neutral: "bg-neutral-50 text-neutral-500 border-neutral-200",
  emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
};

const WeeklyConsole = () => {
  return (
    <div className="w-full max-w-5xl rounded-2xl border border-black/[0.08] bg-white/90 shadow-[0_32px_90px_-28px_rgba(15,23,42,0.35),0_2px_8px_rgba(15,23,42,0.04)] backdrop-blur-xl">
      {/* console header */}
      <div className="flex items-center justify-between gap-3 border-b border-black/[0.05] px-5 py-3.5 md:px-7">
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-400">
          Sentraea <span className="text-neutral-300">//</span> Weekly console
        </span>
        <div className="flex items-center gap-2">
          <span className="hidden rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-0.5 font-mono text-[10px] text-neutral-500 sm:inline">
            Week of May 24
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50/60 px-2.5 py-0.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50 [animation-duration:2.4s]" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono text-[10px] text-emerald-600">
              market scan · 2h ago
            </span>
          </span>
        </div>
      </div>

      {/* console body */}
      <div className="grid grid-cols-1 gap-px bg-black/[0.05] md:grid-cols-[1.55fr_1fr]">
        {/* left — the decision */}
        <div className="bg-white p-5 text-left md:p-7">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-600">
              This week&apos;s move
            </span>
            <span className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold text-blue-600">
              Leverage: High
            </span>
          </div>

          <p className="mt-3 font-heading text-xl font-bold tracking-[-0.01em] text-neutral-900 md:text-2xl">
            A/B test the onboarding flow
          </p>
          <p className="mt-2 max-w-md text-[13px] leading-relaxed text-neutral-500">
            Activation is your bottleneck — 38% of signups never reach first
            value. Two competitors repositioned onboarding this month. Fixing
            this outweighs shipping anything new.
          </p>

          {/* confidence */}
          <div className="mt-5 rounded-xl border border-black/[0.05] bg-neutral-50/60 px-4 py-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-400">
                Confidence
              </span>
              <span className="font-number text-xs font-semibold tabular-nums text-neutral-700">
                74%
              </span>
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-neutral-200/80">
              <div className="h-full w-[74%] rounded-full bg-gradient-to-r from-blue-500 to-blue-400" />
            </div>
            <p className="mt-2 text-[11px] text-neutral-400">
              Grounded in 4 sources — every one inspectable.
            </p>
          </div>

          {/* evidence chips */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {EVIDENCE_CHIPS.map((chip) => (
              <span
                key={chip}
                className="rounded-md border border-neutral-200/80 bg-white px-2 py-1 text-[10.5px] font-medium text-neutral-500"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        {/* right — the execution */}
        <div className="flex flex-col bg-neutral-50/60 p-5 text-left md:p-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-400">
            Sentraea handles
          </span>
          <div className="mt-3 space-y-2">
            {HANDLED_TASKS.map((task) => (
              <div
                key={task.label}
                className="flex items-center justify-between gap-2 rounded-lg border border-black/[0.05] bg-white px-3 py-2.5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]"
              >
                <span className="text-xs font-medium text-neutral-600">
                  {task.label}
                </span>
                <span
                  className={`shrink-0 rounded-full border px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-wide ${STATUS_STYLES[task.tone]}`}
                >
                  {task.status}
                </span>
              </div>
            ))}
          </div>

          {/* ignore list */}
          <div className="mt-4 rounded-lg border border-dashed border-neutral-300/70 px-3 py-2.5">
            <span className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
              Ignore this week
            </span>
            <p className="mt-1 text-[11px] leading-relaxed text-neutral-400 line-through decoration-neutral-300">
              Landing redesign · new feature · deck polish
            </p>
          </div>

          <p className="mt-auto pt-4 font-mono text-[10px] tracking-wide text-neutral-400">
            All reversible. Nothing sent without you.
          </p>
        </div>
      </div>

      {/* console footer — the approval loop */}
      <div className="flex items-center justify-between gap-3 border-t border-black/[0.05] px-5 py-3 md:px-7">
        <span className="font-mono text-[10px] tracking-wide text-neutral-400">
          3 tasks prepared <span className="text-neutral-300">·</span> 0 sent{" "}
          <span className="text-neutral-300">·</span> awaiting your review
        </span>
        <div className="flex items-center gap-2">
          <span className="hidden rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-[10.5px] font-medium text-neutral-500 sm:inline">
            Edit
          </span>
          <span className="rounded-md bg-neutral-900 px-2.5 py-1 text-[10.5px] font-semibold text-white shadow-[0_2px_6px_rgba(0,0,0,0.2)]">
            Review &amp; approve
          </span>
        </div>
      </div>
    </div>
  );
};

export default WeeklyConsole;
