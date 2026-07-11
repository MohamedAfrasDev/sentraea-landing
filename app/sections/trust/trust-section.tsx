import { Card } from "@/components/ui/card";
import React from "react";

/* ---------------------------------------------------------------- */
/*  Checklist                                                        */
/* ---------------------------------------------------------------- */

const CHECKLIST = [
  { label: "What founder context was used" },
  { label: "What market evidence was checked" },
  { label: "Why this recommendation won" },
  { label: "How confident Sentraea is" },
  { label: "What it still does not know", muted: true },
];

/* thin geometric circular check — 1.25px strokes */
function CircleCheck({ muted = false }: { muted?: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className="mt-0.5 h-5 w-5 shrink-0"
      aria-hidden="true"
    >
      <circle
        cx="10"
        cy="10"
        r="8.75"
        fill="none"
        stroke={muted ? "#d4d4d4" : "#a3a3a3"}
        strokeWidth="1.25"
      />
      <path
        d="m6.5 10.2 2.4 2.4 4.6-5"
        fill="none"
        stroke={muted ? "#a3a3a3" : "#2563eb"}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------------------------------------------------------------- */
/*  Explainer UI panel (right column)                                */
/* ---------------------------------------------------------------- */

function AuditPanel() {
  return (
    <Card className="w-full gap-0  p-6  md:p-8">
      {/* meta header */}
      <div className="flex items-center justify-between pb-5">
        <span className="font-mono text-[11px] tracking-[0.08em] text-neutral-400">
          LOG ENGINE <span className="text-neutral-300">//</span>{" "}
          AUDIT_TRAIL_v1.04
        </span>
        <span className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-50 [animation-duration:2.4s]" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-500" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-400">
            live
          </span>
        </span>
      </div>

      {/* node 1 — founder context */}
      <div className="border-t border-black/[0.05] py-5">
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-400">
          Founder context used
        </p>
        <dl className="mt-3 space-y-2">
          {[
            ["Goal", "first 5 customers"],
            ["Drop-off", "activation drop after onboarding"],
            ["Source", "recent founder notes mention confusion"],
          ].map(([k, v]) => (
            <div key={k} className="flex gap-3 text-[13px] leading-relaxed">
              <dt className="w-20 shrink-0 text-neutral-400">{k}</dt>
              <dd className="text-neutral-700">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* node 2 — market evidence */}
      <div className="border-t border-black/[0.05] py-5">
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-400">
          Market evidence used
        </p>
        <dl className="mt-3 space-y-2">
          {[
            ["Shift", "competitor positioning shifted to workflow automation"],
            ["Signals", "buyer pain repeated across 4 recent sources"],
            ["Pressure", "pricing pressure rising in this segment"],
          ].map(([k, v]) => (
            <div key={k} className="flex gap-3 text-[13px] leading-relaxed">
              <dt className="w-20 shrink-0 text-neutral-400">{k}</dt>
              <dd className="text-neutral-700">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* node 3 — synthesis */}
      <div className="border-t border-black/[0.05] py-5">
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-400">
          Synthesis summary <span className="normal-case">(why this wins)</span>
        </p>
        <div className="mt-3 rounded-xl border border-blue-500/15 bg-gradient-to-b from-blue-50/70 to-blue-50/30 p-4">
          <p className="text-sm font-medium leading-relaxed text-neutral-800">
            Fixing onboarding and validating workflow pain is more likely to
            improve conversion this week than shipping another dashboard
            feature.
          </p>
        </div>
      </div>

      {/* node 4 — confidence + honesty */}
      <div className="border-t border-black/[0.05] pt-5">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-400">
            Confidence
          </span>
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-neutral-200/70">
            <div className="h-full w-[74%] rounded-full bg-gradient-to-r from-blue-500 to-blue-400" />
          </div>
          <span className="font-number text-xs font-semibold tabular-nums text-neutral-700">
            74%
          </span>
        </div>
        <p className="mt-2.5 text-xs leading-relaxed text-neutral-400">
          Still unknown: whether the confusion is copy or flow.{" "}
          <span className="text-neutral-500">
            Sentraea says so instead of guessing.
          </span>
        </p>
      </div>
    </Card>
  );
}

/* ---------------------------------------------------------------- */
/*  Section                                                          */
/* ---------------------------------------------------------------- */

const TrustSection = () => {
  return (
    <section id="trust" className="bg-white px-6 py-32 md:px-10">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-14 md:grid-cols-2 md:gap-16">
        {/* left — copy matrix */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
            Why trust it
          </p>
          <h2 className="mb-4 font-heading text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
            Not a black box.
          </h2>
          <p className="mb-8 max-w-md text-base leading-relaxed text-neutral-500">
            Sentraea should not ask founders for blind trust. Every
            recommendation is grounded in visible context, current market
            evidence, and a clear reason for why this move wins now.
          </p>

          <ul className="space-y-3.5">
            {CHECKLIST.map((item) => (
              <li key={item.label} className="flex items-start gap-3">
                <CircleCheck muted={item.muted} />
                <span
                  className={`text-[15px] leading-relaxed ${
                    item.muted ? "text-neutral-400" : "text-neutral-700"
                  }`}
                >
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* right — explainer UI panel */}
        <AuditPanel />
      </div>
    </section>
  );
};

export default TrustSection;
