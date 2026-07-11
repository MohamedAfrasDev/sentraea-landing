"use client";

import { Card } from "@/components/ui/card";
import React, { useEffect, useRef, useState } from "react";

/* ---------------------------------------------------------------- */
/*  Step mini-panels                                                 */
/* ---------------------------------------------------------------- */

/** STEP 1 — connected sources organizing into an intake queue */
function PanelSources() {
  const tools = ["Notion", "Linear", "Analytics", "Notes"];
  return (
    <Card className="bg-gray-100/10  p-5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-400">
          Connected Sources
        </span>
        <span className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />4 synced
        </span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {tools.map((t) => (
          <div
            key={t}
            className="flex items-center gap-2 rounded-xl border border-neutral-200/70 bg-white px-3 py-2.5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-neutral-300" />
            <span className="text-xs font-medium text-neutral-600">{t}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between rounded-xl border border-dashed border-neutral-300/70 bg-white/50 px-4 py-3">
        <span className="text-xs text-neutral-500">Intake queue</span>
        <span className="font-number text-xs tabular-nums text-neutral-400">
          4 items normalized
        </span>
      </div>
    </Card>
  );
}

/** STEP 2 — simulated research terminal with auto-typing line */
function PanelResearch() {
  return (
    <Card className="overflow-hidden p-0 border border-neutral-800 bg-neutral-950 shadow-[0_16px_40px_-20px_rgba(15,23,42,0.5)]">
      <div className="flex items-center gap-1.5 border-b border-neutral-800/80 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
        <span className="ml-3 font-mono text-[11px] text-neutral-500">
          sentraea — research
        </span>
      </div>
      <div className="space-y-2.5 px-4 py-4 font-mono text-xs leading-relaxed">
        <p className="text-neutral-500">
          <span className="text-neutral-600">$</span> sentraea research --week
          current
        </p>
        <p className="text-neutral-500">
          Generated 6 market questions from your context
        </p>
        <p className="flex items-center gap-2 text-neutral-300">
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          <span className="hw-type overflow-hidden whitespace-nowrap">
            Analyzing competitor pricing data...
          </span>
        </p>
      </div>
    </Card>
  );
}

/** STEP 3 — the weekly move + what to ignore */
function PanelMove() {
  const ignored = [
    "Redesigning the landing page again",
    "Adding a feature nobody asked for",
    "Polishing the pitch deck for no meeting",
  ];
  return (
    <div className="space-y-3">
      <Card className="relative overflow-visible border-blue-200/60 bg-gradient-to-b from-blue-50/80 to-white p-5 shadow-[0_16px_40px_-16px_rgba(59,130,246,0.25)]">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-600">
            Clear Weekly Move
          </span>
          <span className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-0.5 text-[10px] font-semibold text-blue-600">
            Leverage: High
          </span>
        </div>
        <p className="mt-2.5 font-heading text-lg font-bold tracking-[-0.01em] text-neutral-900">
          A/B test the onboarding flow
        </p>
        <p className="mt-1 text-xs leading-relaxed text-neutral-500">
          Activation is your bottleneck this week — 38% of signups never reach
          the first value moment.
        </p>
        <div className="mt-3 flex items-center gap-2 border-t border-blue-100/60 pt-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-400">
            Confidence
          </span>
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-neutral-200/70">
            <div className="h-full w-[74%] rounded-full bg-gradient-to-r from-blue-500 to-blue-400" />
          </div>
          <span className="font-number text-[11px] font-semibold tabular-nums text-neutral-600">
            74%
          </span>
        </div>
      </Card>
      <Card className=" border  p-5">
        <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-400">
          Ignore this week
        </span>
        <ul className="mt-2.5 space-y-1.5">
          {ignored.map((item) => (
            <li
              key={item}
              className="text-xs text-neutral-400/80 line-through decoration-neutral-300"
            >
              {item}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

/** STEP 4 — node connections feeding a markdown draft preview */
function PanelExecution() {
  const bars = [
    { w: "82%", d: "0s" },
    { w: "64%", d: "0.35s" },
    { w: "91%", d: "0.7s" },
    { w: "45%", d: "1.05s" },
  ];
  return (
    <Card className="grid grid-cols-[96px_1fr] gap-4 bg-primary/10  p-5">
      {/* node connection indicator */}
      <svg viewBox="0 0 96 128" className="h-full w-full" aria-hidden="true">
        {[24, 64, 104].map((y) => (
          <path
            key={y}
            d={`M16,${y} C48,${y} 48,64 80,64`}
            fill="none"
            stroke="#d4d4d4"
            strokeWidth="1.25"
          />
        ))}
        {[24, 64, 104].map((y) => (
          <circle
            key={y}
            cx="16"
            cy={y}
            r="3.5"
            fill="#fff"
            stroke="#a3a3a3"
            strokeWidth="1.25"
          />
        ))}
        <circle
          cx="80"
          cy="64"
          r="4.5"
          fill="#fff"
          stroke="#3b82f6"
          strokeWidth="1.5"
        />
        <circle
          cx="80"
          cy="64"
          r="4.5"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="1.5"
          className="animate-ping [transform-origin:80px_64px]"
          opacity="0.4"
        />
      </svg>
      {/* markdown editor preview */}
      <Card className="px-4 py-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] text-neutral-400">
            draft-followup.md
          </span>
          <span className="text-[10px] font-medium text-neutral-300">
            auto-drafted
          </span>
        </div>
        <div className="mt-3.5 space-y-2.5">
          {bars.map((b, i) => (
            <div
              key={i}
              className="hw-bar h-2 rounded-full bg-neutral-200/80"
              style={{ width: b.w, animationDelay: b.d }}
            />
          ))}
        </div>
      </Card>
    </Card>
  );
}

/** STEP 5 — looping pipeline + climbing context counter */
function PanelLoop() {
  const [count, setCount] = useState(1284);
  useEffect(() => {
    const id = setInterval(
      () => setCount((c) => c + Math.ceil(Math.random() * 3)),
      1800,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <Card className="flex flex-row items-center gap-8  p-6">
      <svg
        viewBox="0 0 120 120"
        className="h-28 w-28 shrink-0"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="hw-loop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3b82f6" />
            <stop offset="1" stopColor="#10b981" />
          </linearGradient>
        </defs>
        {/* static track */}
        <circle
          cx="60"
          cy="60"
          r="46"
          fill="none"
          stroke="#e5e5e5"
          strokeWidth="1.25"
        />
        {/* gradient pulse orbiting the loop */}
        <g className="animate-[spin_3.5s_linear_infinite] [transform-origin:60px_60px]">
          <circle
            cx="60"
            cy="60"
            r="46"
            fill="none"
            stroke="url(#hw-loop)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="72 217"
          />
        </g>
        <text
          x="60"
          y="63.5"
          textAnchor="middle"
          className="fill-neutral-400"
          fontSize="9"
          letterSpacing="0.18em"
          fontWeight="600"
        >
          LOOP
        </text>
      </svg>
      <div>
        <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-400">
          Context signals
        </span>
        <p className="mt-1 font-number text-3xl font-semibold tabular-nums tracking-tight text-neutral-900">
          {count.toLocaleString()}
        </p>
        <p className="mt-1 text-xs text-neutral-400">
          Every completed week sharpens next week&apos;s recommendation.
        </p>
      </div>
    </Card>
  );
}

/* ---------------------------------------------------------------- */
/*  Steps                                                            */
/* ---------------------------------------------------------------- */

const STEPS = [
  {
    title: "Connect your reality",
    desc: "Connect your tools, or start from a raw idea and a few details. Ten minutes, and Sentraea knows where you actually are.",
    panel: <PanelSources />,
  },
  {
    title: "Read context + research the market",
    desc: "It asks the market questions you'd never find time to research — and checks them against live evidence, not memory.",
    panel: <PanelResearch />,
  },
  {
    title: "Get one highest-leverage move",
    desc: "Not ten vague options. One priority, why it matters now, and what to deliberately ignore.",
    panel: <PanelMove />,
  },
  {
    title: "Let Sentraea handle the small execution around it",
    desc: "Your week starts with drafts prepared, follow-ups queued, and notes structured — instead of a blank page.",
    panel: <PanelExecution />,
  },
  {
    title: "Reset next week with better context",
    desc: "What happened this week sharpens next week's call. The system compounds. The guessing doesn't.",
    panel: <PanelLoop />,
  },
];

/* ---------------------------------------------------------------- */
/*  Section                                                          */
/* ---------------------------------------------------------------- */

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* scroll-focus: the card crossing the vertical center band is active */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = cardRefs.current.indexOf(entry.target as HTMLDivElement);
          if (idx !== -1) setActiveStep(idx);
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="howitworks" className="bg-white px-6 py-32 md:px-10">
      <style>{`
        @keyframes hw-type {
          0% { width: 0; }
          55%, 100% { width: 36ch; }
        }
        .hw-type {
          display: inline-block;
          width: 36ch;
          animation: hw-type 5s steps(36) infinite;
        }
        @keyframes hw-bar {
          0% { opacity: 0; transform: translateX(-14px); }
          18%, 78% { opacity: 1; transform: translateX(0); }
          100% { opacity: 0; transform: translateX(0); }
        }
        .hw-bar {
          animation: hw-bar 4.5s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .hw-type, .hw-bar { animation: none; }
        }
      `}</style>

      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
        {/* ---- sticky left rail ---- */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[120px]">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
              How it works
            </p>
            <h2 className="mt-3 mb-4 font-heading text-4xl font-medium tracking-tight text-neutral-900">
              One weekly loop.
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Not a founder chatbot — a repeatable operating rhythm. Every
              Monday you know the move, why it wins, and half the busywork is
              already drafted.
            </p>

            {/* step progress rail */}
            <ol className="mt-10 hidden space-y-3 lg:block">
              {STEPS.map((s, i) => (
                <li
                  key={s.title}
                  className={`flex items-center gap-3 text-lg transition-colors duration-300 ${
                    activeStep === i
                      ? "text-neutral-900"
                      : "text-muted-foreground/50"
                  }`}
                >
                  <span
                    className={`font-number text-lg tabular-nums transition-colors duration-300 ${
                      activeStep === i
                        ? "text-primary"
                        : "text-muted-foreground/50"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  {s.title}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* ---- scrolling step stack ---- */}
        <div className="lg:col-span-8">
          {STEPS.map((step, i) => (
            <Card
              key={step.title}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className={`mb-12 backdrop-blur-sm transition-all duration-500 last:mb-0 p-6 md:p-8 ${
                activeStep === i
                  ? "opacity-100 border-neutral-200/80 shadow-2xl shadow-gray-500/15 -translate-y-0.5"
                  : "opacity-40 shadow-xl shadow-gray-500/5"
              }`}
            >
              <div className="flex items-start gap-4">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border font-number text-xs tabular-nums transition-colors duration-500 ${
                    activeStep === i
                      ? "border-blue-100 bg-blue-50 text-blue-600"
                      : "border-neutral-200 bg-neutral-50 text-neutral-400"
                  }`}
                >
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-heading text-xl font-semibold tracking-[-0.01em] text-neutral-900 md:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-500 md:text-base">
                    {step.desc}
                  </p>
                </div>
              </div>
              <div className="mt-7">{step.panel}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
