"use client";

import { Card } from "@/components/ui/card";
import { motion, useReducedMotion } from "framer-motion";
import { Minus, Sparkles, TrendingDown } from "lucide-react";

/** Demo-to-close weekly series behind the sparkline (percent). */
const TREND = [28, 27, 25, 22, 19, 16, 14];

function Sparkline() {
  const width = 132;
  const height = 40;
  const max = Math.max(...TREND);
  const min = Math.min(...TREND);
  const points = TREND.map((value, i) => {
    const x = (i / (TREND.length - 1)) * width;
    const y = height - ((value - min) / (max - min)) * (height - 6) - 3;
    return `${x},${y}`;
  });

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-10 w-full"
      role="img"
      aria-label="Demo-to-close rate declining from 28% to 14% over seven weeks"
    >
      <defs>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,${height} ${points.join(" ")} ${width},${height}`}
        fill="url(#spark-fill)"
      />
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke="#2563EB"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={points[points.length - 1].split(",")[0]}
        cy={points[points.length - 1].split(",")[1]}
        r="3"
        fill="#2563EB"
      />
    </svg>
  );
}

function StatusDot({ tone }: { tone: "green" | "red" | "blue" }) {
  const color =
    tone === "green"
      ? "bg-emerald-500"
      : tone === "red"
        ? "bg-rose-500"
        : "bg-primary";
  return (
    <span className="relative inline-flex size-1.5">
      <span
        className={`absolute inline-flex size-full animate-ping rounded-full opacity-50 ${color}`}
      />
      <span className={`relative inline-flex size-1.5 rounded-full ${color}`} />
    </span>
  );
}

/** Floating "Weekly Founder Brief" product mockup shown beside the hero copy. */
export function HeroDashboard() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className="relative mx-auto w-full max-w-md lg:max-w-none"
      initial={{ opacity: 0, y: reducedMotion ? 0 : 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.9,
        delay: 0.25,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      <motion.div
        animate={reducedMotion ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Main brief card */}
        <Card className="relative bg-card/80 p-6 shadow-[0_32px_80px_-24px_rgba(30,58,138,0.25),0_8px_24px_-12px_rgba(15,23,42,0.08)] backdrop-blur-xl md:p-7">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-heading text-base font-semibold tracking-tight text-foreground">
                Weekly Founder Brief
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Monday · Week 32
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-sm border border-emerald-200/20 shadow-sm shadow-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
              <StatusDot tone="green" />
              Analyzed
            </span>
          </div>

          {/* Bottleneck */}
          <Card className="mt-5 flex flex-row items-center justify-between  bg-amber-50/70 px-4 py-3">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-amber-700/70">
                Current Bottleneck
              </p>
              <p className="mt-0.5 font-heading text-lg font-semibold tracking-tight text-amber-900">
                Conversion
              </p>
            </div>
            <TrendingDown className="size-5 text-amber-600" aria-hidden />
          </Card>

          {/* Recommended move */}
          <Card className="mt-4 bg-linear-to-br from-primary/5 to-white/1 px-4 py-4">
            <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-primary">
              <Sparkles className="size-3" aria-hidden />
              Recommended Move
            </div>
            <p className="mt-1.5 font-heading text-[15px] font-semibold leading-snug tracking-tight text-foreground">
              Rewrite demo flow for ICP X
            </p>
            <div className="mt-3">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Confidence</span>
                <span className="font-number font-medium text-foreground">
                  87%
                </span>
              </div>
              <div
                className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-primary/10"
                role="progressbar"
                aria-label="Recommendation confidence"
                aria-valuenow={87}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <motion.div
                  className="h-full rounded-full bg-linear-to-r from-primary to-indigo-500"
                  initial={{ width: reducedMotion ? "87%" : "8%" }}
                  whileInView={{ width: "87%" }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.2,
                    delay: 0.6,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                />
              </div>
            </div>
          </Card>

          {/* Ignore this week */}
          <div className="mt-4">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Ignore This Week
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {["Blog series", "Side integration"].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1 rounded-sm border border-black/6 bg-black/3 px-2.5 py-1 text-xs text-muted-foreground line-through decoration-black/20"
                >
                  <Minus className="size-3" aria-hidden />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div className="mt-5 grid grid-cols-3 gap-2.5">
            <Card className="gap-0  bg-white/70 px-3 py-2.5">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Pipeline
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-[13px] font-medium text-foreground">
                <StatusDot tone="green" />
                Healthy
              </p>
            </Card>
            <Card className="gap-0  bg-white/70 px-3 py-2.5">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Demo close
              </p>
              <p className="mt-1 flex items-center gap-1 font-number text-[13px] font-medium text-rose-600">
                14%
                <TrendingDown className="size-3.5" aria-hidden />
              </p>
            </Card>
            <Card className="gap-0  bg-white/70 px-3 py-2.5">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Retention
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-[13px] font-medium text-foreground">
                <StatusDot tone="blue" />
                Stable
              </p>
            </Card>
          </div>

          {/* Trend sparkline */}
          <Card className="gap-0  bg-white/70 px-3 py-2.5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Demo-to-close · 7 weeks
              </p>
              <p className="font-number text-[11px] font-medium text-rose-600">
                28% → 14%
              </p>
            </div>
            <div className="mt-1.5">
              <Sparkline />
            </div>
          </Card>
        </Card>
      </motion.div>

      {/* Companion chip floating behind the card */}
      <motion.div
        className="absolute -right-3 -top-6 hidden rounded-lg border border-white/60 bg-white/80 px-4 py-3 shadow-[0_16px_40px_-16px_rgba(30,58,138,0.25)] backdrop-blur-xl md:block"
        animate={reducedMotion ? undefined : { y: [0, -14, 0] }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
          Next brief
        </p>
        <p className="mt-0.5 font-heading text-sm font-semibold tracking-tight text-foreground">
          Monday, 8:00 AM
        </p>
      </motion.div>
      <div className="block md:hidden">
        <motion.p className="mt-6 text-sm text-muted-foreground  ">
          For B2B SaaS founders between first customers and repeatable growth.
        </motion.p>
      </div>
    </motion.div>
  );
}
