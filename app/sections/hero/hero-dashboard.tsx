/**
 * Sentraea landing page hero mockup component.
 * This component is designed to be displayed on the right side of the landing-page hero section.
 * It functions as a visual explainer of Sentraea's core value proposition:
 * "Know the one highest-leverage move for your SaaS every week."
 *
 * Visual Style:
 * - Clean white card, thin neutral borders, soft shadows, rounded corners.
 * - Warm/yellow bottleneck alert accent, blue move accent line.
 * - Custom inline SVG representations for integration signal chips.
 * - Tiny inline CSS/SVG sparkline decorative trend strip.
 */

"use client";

import React from "react";

export function HeroDashboard() {
  return (
    <div className="w-full max-w-[490px] mx-auto transition-all duration-300">
      {/* Main card */}
      <div className="bg-white/80 border rounded-lg p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03),0_1px_3px_rgba(0,0,0,0.02)] select-none">
        {/* A) Top Bar */}
        <div className="flex flex-col gap-2 pb-4 border-b border-neutral-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-5 h-5 rounded-md bg-blue-50 text-blue-600">
                <svg
                  className="w-3 h-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <span className="text-xs font-semibold text-neutral-800 tracking-tight">
                Monday Founder Brief
              </span>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-neutral-100 text-neutral-600 border border-neutral-200/30">
              Updated 8:00 AM
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 pl-7">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-medium">Live signals connected</span>
          </div>
        </div>

        {/* B) Main Recommendation Area */}
        <div className="py-4 space-y-4">
          {/* Bottleneck Section */}
          <div>
            <div className="flex items-center mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/30">
                This week’s bottleneck
              </span>
            </div>
            <div className="group relative flex items-center justify-between p-3.5 bg-amber-50/30 border border-amber-200/20 rounded-md hover:border-amber-200/40 transition-colors duration-200">
              <div className="space-y-1">
                <h4 className="text-[15px] font-semibold text-neutral-900 leading-tight">
                  Conversion
                </h4>
                <p className="text-xs text-neutral-600">
                  Demo-to-close dropped over the last 3 weeks
                </p>
              </div>
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-amber-100/50 text-amber-700">
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <polyline points="9 18 18 18 18 9" />
                </svg>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-neutral-100" />

          {/* Leverage Move Section */}
          <div>
            <div className="mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600/90 bg-blue-50/60 px-2 py-0.5 rounded border border-blue-100">
                One highest-leverage move
              </span>
            </div>
            <div className="border-l-2 border-blue-500 pl-4 py-1 space-y-1">
              <h3 className="text-[15px] font-semibold text-neutral-900 tracking-tight leading-tight">
                Rewrite demo flow for ICP X
              </h3>
              <p className="text-xs text-neutral-600">
                Test it on the next 5 sales calls
              </p>
            </div>
          </div>
        </div>

        {/* C) Why Now Section */}
        <div className="py-4 border-t border-neutral-100">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-3">
            Why this matters now
          </h4>
          <ul className="space-y-2">
            {[
              { text: "Pipeline volume is stable", type: "neutral" },
              { text: "Drop is happening after the demo", type: "warning" },
              { text: "Activation looks unchanged", type: "neutral" },
            ].map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs text-neutral-600"
              >
                <span className="mt-0.5 shrink-0">
                  {item.type === "warning" ? (
                    <svg
                      className="w-3.5 h-3.5 text-amber-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  ) : (
                    <svg
                      className="w-3.5 h-3.5 text-emerald-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </span>
                <span className="text-neutral-700 leading-normal">
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* D) Ignore This Week Section */}
        <div className="py-4 border-t border-neutral-100">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2.5">
            Ignore this week
          </h4>
          <div className="flex flex-wrap gap-2">
            {["New blog series", "Side integration launch"].map((item, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-2.5 py-1 rounded-md border border-neutral-200/40 bg-neutral-50 text-[11px] font-medium text-neutral-400 line-through decoration-neutral-300"
              >
                <svg
                  className="w-3 h-3 mr-1.5 text-neutral-300 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* E) Signal Sources Row */}
        <div className="py-4 border-t border-neutral-100">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2.5">
            Signals used
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {[
              {
                name: "Stripe",
                color: "bg-indigo-50/50 text-indigo-700 border-indigo-200/30",
                icon: (
                  <svg
                    className="w-2.5 h-2.5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M13.93 10.09c0-1.22.95-1.62 2.37-1.62 1.66 0 3.32.55 4.54 1.25V5.1c-1.39-.5-3.08-.75-4.73-.75-4.22 0-7.07 2.12-7.07 5.92 0 5.86 7.6 4.9 7.6 7.55 0 1.48-1.21 1.9-2.79 1.9-1.92 0-3.83-.75-5.11-1.46v4.75c1.61.69 3.52 1.01 5.37 1.01 4.39 0 7.42-2.12 7.42-6.19 0-6.19-7.6-5.06-7.6-7.38z" />
                  </svg>
                ),
              },
              {
                name: "HubSpot",
                color: "bg-orange-50/50 text-orange-700 border-orange-200/30",
                icon: (
                  <svg
                    className="w-2.5 h-2.5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.89 10.74a3.37 3.37 0 0 0-2.38.98L13.6 9.68a3.39 3.39 0 0 0-2.39-3.26V4.76A3.37 3.37 0 1 0 9.8 4.76v1.66a3.39 3.39 0 0 0-2.39 3.26v4.63a3.39 3.39 0 0 0 2.39 3.26v1.66a3.37 3.37 0 1 0 1.41 0v-1.66a3.39 3.39 0 0 0 2.39-3.26l2.91-2.04a3.37 3.37 0 1 0 2.38-1.47zm-9-1.68a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm9 4a2 2 0 1 1 2-2 2 2 0 0 1-2 2z" />
                  </svg>
                ),
              },
              {
                name: "PostHog",
                color: "bg-zinc-50 text-zinc-700 border-zinc-200",
                icon: (
                  <svg
                    className="w-2.5 h-2.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 20V10M12 20V4M6 20v-6" />
                  </svg>
                ),
              },
              {
                name: "Founder Notes",
                color: "bg-neutral-50 text-neutral-700 border-neutral-200/60",
                icon: (
                  <svg
                    className="w-2.5 h-2.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                ),
              },
            ].map((chip, idx) => (
              <span
                key={idx}
                className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-[10px] font-semibold tracking-tight ${chip.color}`}
              >
                {chip.icon}
                {chip.name}
              </span>
            ))}
          </div>
        </div>

        {/* F) Mini Trend Area at Bottom */}
        <div className="pt-4 border-t border-neutral-100 bg-neutral-50/30 -mx-5 px-5 -mb-5 rounded-b-xl space-y-3.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              This week’s metrics
            </span>
            <div className="flex items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-blue-500"></span>
              <span className="text-[9px] text-neutral-400 font-medium uppercase tracking-wider">
                Live Metrics
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {/* Trials */}
            <div className="p-2 bg-white border border-neutral-200/40 rounded-lg hover:shadow-[0_2px_8px_rgba(0,0,0,0.01)] transition-shadow duration-150">
              <p className="text-[9px] font-medium text-neutral-400">Trials</p>
              <div className="flex items-center gap-0.5 mt-0.5">
                <span className="text-xs font-bold text-neutral-800">+12%</span>
                <svg
                  className="w-2.5 h-2.5 text-emerald-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="18 15 12 9 6 15" />
                </svg>
              </div>
            </div>

            {/* Demo→Close */}
            <div className="p-2 bg-white border border-neutral-200/40 rounded-lg hover:shadow-[0_2px_8px_rgba(0,0,0,0.01)] transition-shadow duration-150">
              <p className="text-[9px] font-medium text-neutral-400">
                Demo→Close
              </p>
              <div className="flex items-center gap-0.5 mt-0.5">
                <span className="text-xs font-bold text-neutral-800">-18%</span>
                <svg
                  className="w-2.5 h-2.5 text-rose-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>

            {/* Churn Risk */}
            <div className="p-2 bg-white border border-neutral-200/40 rounded-lg hover:shadow-[0_2px_8px_rgba(0,0,0,0.01)] transition-shadow duration-150">
              <p className="text-[9px] font-medium text-neutral-400">
                Churn Risk
              </p>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-xs font-bold text-neutral-800">
                  Stable
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400"></span>
              </div>
            </div>
          </div>

          {/* Sparkline row */}
          <div className="flex items-center gap-3 p-2 bg-white border border-neutral-200/40 rounded-lg">
            <span className="text-[10px] font-semibold text-neutral-500 whitespace-nowrap pl-0.5">
              Demo→Close Trend
            </span>
            <div className="flex-1 h-5 relative flex items-center">
              <svg
                className="w-full h-full text-rose-500 overflow-visible"
                viewBox="0 0 200 20"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="trend-gradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#EF4444" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,2 C30,3 60,1 90,8 C120,15 150,18 200,19"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M0,2 C30,3 60,1 90,8 C120,15 150,18 200,19 L200,20 L0,20 Z"
                  fill="url(#trend-gradient)"
                />
                <circle cx="200" cy="19" r="2" fill="#EF4444" />
              </svg>
            </div>
            <span className="text-[9px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded shrink-0">
              3wk Drop
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroDashboard;
