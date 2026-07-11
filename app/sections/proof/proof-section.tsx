"use client";

import { Card } from "@/components/ui/card";
import React, { useState } from "react";

/* ---------------------------------------------------------------- */
/*  Data                                                             */
/* ---------------------------------------------------------------- */

const PROBLEMS = [
  {
    title: "Six plausible directions. One week. No way to rank them.",
    desc: "Ship the feature, talk to users, fix onboarding, change pricing, write content, run outreach. They all sound right — and most weeks die in that ambiguity.",
  },
  {
    title: "The plan you made Monday is stale by Thursday.",
    desc: "Competitors ship, buyers move, channels tire. The context you gathered last month quietly stops being true — and you keep executing on it anyway.",
  },
  {
    title: "You reopen the same decisions every single week.",
    desc: "Pricing, positioning, priorities — decided, doubted, re-decided. And every follow-up, draft, and reminder around those decisions is carried by you alone.",
  },
];

type Tool = {
  name: string;
  friction: string;
  y: number;
  path: string;
  hue: string;
  icon: React.ReactNode;
};

/* Monochrome 12x12 icons, stroke-based, drawn at origin */
const ICONS = {
  doc: (
    <g
      stroke="currentColor"
      strokeWidth="1.2"
      fill="none"
      strokeLinecap="round"
    >
      <path d="M2 1h5.5L10 3.5V11H2z" strokeLinejoin="round" />
      <path d="M4 5.5h4M4 7.5h4" />
    </g>
  ),
  target: (
    <g stroke="currentColor" strokeWidth="1.2" fill="none">
      <circle cx="6" cy="6" r="4.6" />
      <path d="M6 3.2v2M6 6.8v2M3.2 6h2M6.8 6h2" strokeLinecap="round" />
    </g>
  ),
  diamond: (
    <g
      stroke="currentColor"
      strokeWidth="1.2"
      fill="none"
      strokeLinejoin="round"
    >
      <path d="M6 1.2 10.8 6 6 10.8 1.2 6z" />
      <path d="M6 3.8 8.2 6 6 8.2 3.8 6z" />
    </g>
  ),
  mail: (
    <g
      stroke="currentColor"
      strokeWidth="1.2"
      fill="none"
      strokeLinejoin="round"
    >
      <rect x="1.2" y="2.4" width="9.6" height="7.2" rx="1.2" />
      <path d="m1.6 3.2 4.4 3.4 4.4-3.4" strokeLinecap="round" />
    </g>
  ),
  chart: (
    <g
      stroke="currentColor"
      strokeWidth="1.3"
      fill="none"
      strokeLinecap="round"
    >
      <path d="M2.2 10.5V6.8M5 10.5V3.6M7.8 10.5V5.4M10.6 10.5V2.2" />
    </g>
  ),
};

/*
 * Canvas viewBox: 0 0 1100 460
 * Zone A pills end at x=200. Funnel mouth x=330, neck x=700..730 (y 208-252).
 * n8n-style bezier connectors: horizontal out of the pill, horizontal into
 * the convergence point (722, 230) — nested curves, no crossings.
 * Outcome card x=840..1060.
 */
const TOOLS: Tool[] = [
  {
    name: "Notion",
    friction: "Docs nobody re-reads",
    y: 70,
    hue: "#60a5fa",
    icon: ICONS.doc,
    path: "M200,70 C470,70 480,230 722,230",
  },
  {
    name: "Linear",
    friction: "Scattered priorities",
    y: 150,
    hue: "#818cf8",
    icon: ICONS.target,
    path: "M200,150 C470,150 480,230 722,230",
  },
  {
    name: "Jira",
    friction: "Ticket noise, no signal",
    y: 230,
    hue: "#38bdf8",
    icon: ICONS.diamond,
    path: "M200,230 C470,230 480,230 722,230",
  },
  {
    name: "Email",
    friction: "Urgent, rarely important",
    y: 310,
    hue: "#a78bfa",
    icon: ICONS.mail,
    path: "M200,310 C470,310 480,230 722,230",
  },
  {
    name: "Analytics",
    friction: "Metrics without a move",
    y: 390,
    hue: "#34d399",
    icon: ICONS.chart,
    path: "M200,390 C470,390 480,230 722,230",
  },
];

const OUTPUT_PATH = "M722,230 L842,230";

/* ---------------------------------------------------------------- */
/*  Bottleneck canvas                                                */
/* ---------------------------------------------------------------- */

function BottleneckCanvas() {
  const [active, setActive] = useState<number | null>(null);

  const dimmed = (i: number) => active !== null && active !== i;

  return (
    <Card className="relative w-full px-3 py-2 bg-transparent shadow-2xl shadow-gray-100/60 backdrop-blur-sm">
      <style>{`
        @keyframes pf-flow {
          to { stroke-dashoffset: -1; }
        }
        .pf-flow {
          animation: pf-flow linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .pf-flow { animation: none; }
        }
      `}</style>
      <svg
        viewBox="0 0 1100 460"
        className="block h-auto w-full font-heading"
        role="img"
        aria-label="Diagram: scattered signals from Notion, Linear, Jira, Email and Analytics converge through a funnel into one clear weekly move"
      >
        <defs>
          <filter
            id="pf-card-glow"
            x="-40%"
            y="-40%"
            width="180%"
            height="180%"
          >
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="8"
              floodColor="#3b82f6"
              floodOpacity="0.28"
            />
          </filter>
          <filter id="pf-soft" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="4"
              floodColor="#0f172a"
              floodOpacity="0.06"
            />
          </filter>
          <filter id="pf-bloom" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
          <filter id="pf-blur-sm" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1" />
          </filter>
          <linearGradient
            id="pf-out"
            gradientUnits="userSpaceOnUse"
            x1="722"
            y1="0"
            x2="842"
            y2="0"
          >
            <stop offset="0" stopColor="#3b82f6" />
            <stop offset="1" stopColor="#10b981" />
          </linearGradient>
          <linearGradient id="pf-funnel" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="1" stopColor="#f1f5f9" stopOpacity="0.72" />
          </linearGradient>
        </defs>

        {/* ---- Zone B: straight-edged funnel (behind the lines) ---- */}
        <path
          d="M330,42 L700,208 L730,208 L730,252 L700,252 L330,418 "
          fill="url(#pf-funnel)"
          stroke="rgba(0,0,0,0.08)"
          strokeWidth="1"
          filter="url(#pf-soft)"
        />

        {/* ---- connectors: constant neon glow + continuous flowing pulses ---- */}
        {TOOLS.map((t, i) => (
          <g
            key={t.name}
            opacity={dimmed(i) ? 0.08 : 1}
            style={{ transition: "opacity .35s ease" }}
          >
            {/* wide soft bloom — always lit */}
            <path
              d={t.path}
              fill="none"
              stroke={t.hue}
              strokeWidth={active === i ? 8 : 6}
              strokeLinecap="round"
              opacity={active === i ? 0.5 : 0.32}
              filter="url(#pf-bloom)"
              style={{ transition: "opacity .35s ease" }}
            />
            {/* constant neon core */}
            <path
              d={t.path}
              fill="none"
              stroke={t.hue}
              strokeWidth="1.75"
              strokeLinecap="round"
              opacity={active === i ? 1 : 0.85}
              style={{ transition: "opacity .35s ease" }}
            />
            {/* flowing pulses — several per line, always moving */}
            <path
              className="pf-flow"
              d={t.path}
              pathLength={1}
              fill="none"
              stroke={t.hue}
              strokeWidth="3.25"
              strokeLinecap="round"
              strokeDasharray="0.07 0.18"
              opacity={active === i ? 1 : 0.85}
              filter="url(#pf-blur-sm)"
              style={{
                animationDuration: `${2.2 + i * 0.25}s`,
                animationDelay: `-${i * 0.6}s`,
              }}
            />
          </g>
        ))}

        {/* ---- compression: single bright output beam ---- */}
        <g>
          <path
            d={OUTPUT_PATH}
            fill="none"
            stroke="url(#pf-out)"
            strokeWidth="7"
            strokeLinecap="round"
            opacity="0.4"
            filter="url(#pf-bloom)"
          />
          <path
            d={OUTPUT_PATH}
            fill="none"
            stroke="url(#pf-out)"
            strokeWidth="2.25"
            strokeLinecap="round"
          />
          <path
            className="pf-flow"
            d={OUTPUT_PATH}
            pathLength={1}
            fill="none"
            stroke="url(#pf-out)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="0.16 0.17"
            filter="url(#pf-blur-sm)"
            style={{ animationDuration: "0.9s" }}
          />
        </g>

        {/* ---- Zone A: tool pills ---- */}
        {TOOLS.map((t, i) => (
          <foreignObject
            key={t.name}
            x="24"
            y={t.y - 23}
            width="176"
            height="46"
          >
            <div
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className={`w-[174px] h-[44px] rounded-sm border flex items-center px-5 gap-3 select-none transition-all duration-300 shadow-sm ${
                active === i ? "bg-white " : "bg-white "
              }`}
              style={{
                cursor: "pointer",
                opacity: dimmed(i) ? 0.45 : 1,
              }}
            >
              <svg viewBox="0 0 12 12" className="w-3.5 h-3.5 text-stone-500">
                {t.icon}
              </svg>
              <span className="text-sm font-medium text-stone-700 tracking-tight">
                {t.name}
              </span>
            </div>
          </foreignObject>
        ))}

        {/* ---- Zone C: outcome card ---- */}
        <foreignObject x="840" y="118" width="220" height="224">
          <Card className="w-full h-full p-5  flex flex-col justify-between">
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-bold text-blue-600 tracking-[0.14em] uppercase">
                CLEAR WEEKLY MOVE
              </span>
              <span className="text-xs text-stone-400 mt-0.5">
                Week of May 24th
              </span>
              <span className="text-[14.5px] font-bold text-stone-900 mt-2.5 leading-snug">
                A/B Test Onboarding Flow
              </span>
            </div>

            <div className="border-t border-stone-100 pt-3 flex flex-col gap-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-500">Leverage</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100">
                  High
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-500">Status</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-stone-50 text-stone-600 border border-stone-200/80 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                  To-Do
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-500">Effort</span>
                <span className="font-semibold text-stone-700">~6 hrs</span>
              </div>
            </div>
          </Card>
        </foreignObject>

        {/* ---- floating friction tooltip ---- */}
        <g
          opacity={active !== null ? 1 : 0}
          transform={`translate(0, ${active !== null ? 0 : 6})`}
          style={{
            transition: "opacity .3s ease, transform .3s ease",
            pointerEvents: "none",
          }}
        >
          <rect
            x="427"
            y="84"
            width="176"
            height="34"
            rx="8"
            fill="#1c1917"
            filter="url(#pf-soft)"
          />
          <path d="M508,118 l7,9 7,-9 z" fill="#1c1917" />
          <text
            x="515"
            y="105"
            fontSize="12"
            fontWeight="500"
            fill="#fafaf9"
            textAnchor="middle"
          >
            {active !== null ? TOOLS[active].friction : ""}
          </text>
        </g>
      </svg>
    </Card>
  );
}

/* ---------------------------------------------------------------- */
/*  Section                                                          */
/* ---------------------------------------------------------------- */

const ProofSection = () => {
  return (
    <section className="relative px-6 py-[100px] md:px-10">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#cacccf_1px,transparent_1px)] bg-size-[20px_20px] opacity-70 mask-[radial-gradient(ellipse_80%_60%_at_50%_40%,#000_60%,transparent_100%)]" />

      <div className="relative mx-auto max-w-[1280px]">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
          The real problem
        </p>
        <h2 className="mt-3 font-heading text-4xl font-medium leading-[1.1] tracking-[-0.03em] text-stone-900 md:text-5xl">
          Founders don&apos;t fail from lack of effort.
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          You&apos;re not short on effort. You&apos;re short on certainty — and
          it costs you whole weeks: scattered priorities, unclear bottlenecks,
          and a hundred small decisions stacked on the one that actually
          matters.
        </p>

        {/* Full-width interactive bottleneck canvas */}
        <div className="mt-12">
          <BottleneckCanvas />
        </div>

        {/* Problem cards below the canvas */}
        <div className="mt-12 grid gap-4 md:grid-cols-3 md:gap-5">
          {PROBLEMS.map((p, i) => (
            <Card
              key={p.title}
              className="gap-0 p-7 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-gray-500/15"
            >
              <span className="font-number text-xs tabular-nums text-neutral-300">
                0{i + 1}
              </span>
              <h4 className="mt-3 font-heading text-lg font-semibold leading-snug tracking-[-0.01em] text-stone-900">
                {p.title}
              </h4>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {p.desc}
              </p>
            </Card>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-3xl border-t border-black/[0.06] pt-10 text-center">
          <p className="font-heading text-xl font-medium leading-relaxed tracking-[-0.01em] text-stone-800 md:text-2xl">
            Most founder stress doesn&apos;t come from lack of motivation. It
            comes from never being sure this week is pointed at the{" "}
            <span className="text-primary">right bottleneck</span>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProofSection;
