"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Check,
  X,
  ArrowDown,
  AlertTriangle,
  Users,
  Zap,
  RefreshCw,
  Compass,
  Filter,
  ArrowRight,
} from "lucide-react";
import { Container, Section } from "../shared/section";
import { Reveal } from "../shared/reveal";
import { Card } from "@/components/ui/card";

const FUNNEL_STAGES = [
  {
    id: "traffic",
    name: "Traffic",
    isBottleneck: false,
    statusSymbol: "✓",
    statusLabel: "Healthy",
    icon: Users,
    throughput: "100%",
    widthClass: "w-full max-w-xl",
    bgGradient: "from-emerald-500/10 via-emerald-500/5 to-transparent",
    borderColor: "border-emerald-500/30 dark:border-emerald-500/20",
    badgeClass:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    iconBg: "bg-emerald-500/10 text-emerald-500",
    note: "Top-of-funnel visitor acquisition is functioning properly.",
  },
  {
    id: "activation",
    name: "Activation",
    isBottleneck: false,
    statusSymbol: "✓",
    statusLabel: "Healthy",
    icon: Zap,
    throughput: "84%",
    widthClass: "w-[92%] sm:w-[88%] max-w-lg",
    bgGradient: "from-emerald-500/10 via-emerald-500/5 to-transparent",
    borderColor: "border-emerald-500/30 dark:border-emerald-500/20",
    badgeClass:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    iconBg: "bg-emerald-500/10 text-emerald-500",
    note: "New signups reach core product value successfully.",
  },
  {
    id: "conversion",
    name: "Conversion",
    isBottleneck: true,
    statusSymbol: "❌",
    statusLabel: "Active Bottleneck",
    icon: AlertTriangle,
    throughput: "14%",
    widthClass: " sm:w-[76%] max-w-md",
    bgGradient: "from-rose-500/20 via-rose-500/10 to-rose-500/5",
    borderColor:
      "border-rose-500/60 dark:border-rose-500/50 shadow-[0_0_35px_rgba(244,63,94,0.18)]",
    badgeClass:
      "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30 animate-pulse font-semibold",
    iconBg: "bg-rose-500/20 text-rose-500",
    note: "Primary constraint choking revenue growth. Fix this first.",
  },
  {
    id: "retention",
    name: "Retention",
    isBottleneck: false,
    statusSymbol: "✓",
    statusLabel: "Constrained Downstream",
    icon: RefreshCw,
    throughput: "12%",
    widthClass: " sm:w-[64%]",
    bgGradient: "from-blue-500/10 via-indigo-500/5 to-transparent",
    borderColor: "border-blue-500/20 dark:border-blue-500/20",
    badgeClass:
      "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    iconBg: "bg-blue-500/10 text-blue-500",
    note: "Retention efforts cannot move overall growth until conversion constraint is unblocked.",
  },
];

export default function GrowthConstraint() {
  const [activeStage, setActiveStage] = useState<string | null>("conversion");
  const reducedMotion = useReducedMotion();

  return (
    <Section id="growth-constraint" className="relative px-0 overflow-hidden">
      {/* Ambient background lighting */}

      <Container className="relative z-10">
        {/* Header Section */}
        <div className="text-center  mx-auto flex flex-col items-center">
          <Reveal delay={0.08}>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-medium tracking-tight text-foreground leading-[1.08]">
              Every growing SaaS has one bottleneck at a time.
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-2 space-y-2 text-lg sm:text-xl text-muted-foreground leading-relaxed ">
              <p>
                Improving retention won't help if conversion is broken.
                Increasing traffic won't matter if activation is weak.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Funnel Visualization Area */}
        <Reveal delay={0.24} className="mt-14 sm:mt-18 px-0">
          <div className="relative w-full mx-auto flex flex-col items-center">
            {/* Visual Funnel Stack */}
            <div className="w-full grid grid-cols-1 xl:grid-cols-4 items-center gap-4 sm:gap-3">
              {FUNNEL_STAGES.map((stage, idx) => {
                const Icon = stage.icon;
                const isSelected = activeStage === stage.id;

                return (
                  <div
                    key={stage.id}
                    className="w-full flex flex-col md:flex-row items-center"
                  >
                    {/* Arrow connector before non-first items */}
                    {idx > 0 && (
                      <div className="my-1 sm:my-2 flex flex-col items-center justify-center">
                        <motion.div
                          animate={
                            reducedMotion
                              ? {}
                              : {
                                  y: [0, 4, 0],
                                  opacity: [0.5, 1, 0.5],
                                }
                          }
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: idx * 0.3,
                          }}
                          className="flex items-center justify-center text-muted-foreground/60 dark:text-muted-foreground/40"
                        >
                          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 hidden xl:block" />
                          <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 block xl:hidden" />
                        </motion.div>
                      </div>
                    )}

                    {/* Stage Card */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => setActiveStage(stage.id)}
                      className={`cursor-pointer transition-all duration-300 `}
                    >
                      <Card
                        className={`relative  p-4 sm:p-5 min-w-full border-none bg-card/90 dark:bg-slate-900/90 backdrop-blur-xl bg-linear-to-r ${stage.bgGradient} ${stage.borderColor} shadow-lg flex items-center justify-between gap-4 overflow-hidden group`}
                      >
                        {/* Bottleneck Accent Glow */}
                        {stage.isBottleneck && (
                          <div className="absolute inset-0 bg-rose-500/5 animate-pulse pointer-events-none" />
                        )}

                        {/* Left Side: Symbol, Icon, Name */}
                        <div className="flex items-center w-full gap-3 sm:gap-4 relative z-10">
                          <div className="flex gap-2">
                            <div
                              className={`p-2.5   sm:p-3 max-h-fit rounded-xl ${stage.iconBg}`}
                            >
                              <Icon className="max-h-fit w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                            <div className="pl-1">
                              <div className="flex items-center gap-2">
                                <h3 className="text-lg sm:text-xl font-semibold text-foreground tracking-tight">
                                  {stage.name}
                                </h3>
                                <span className="text-base sm:text-lg font-bold select-none">
                                  {stage.statusSymbol}
                                </span>
                              </div>
                              <p className="text-xs sm:text-sm text-muted-foreground  sm:block mt-0.5">
                                {stage.note}
                              </p>
                              <div className="flex items-center gap-3 relative z-10">
                                <div className="text-right hidden xs:block">
                                  <span className="text-xs text-muted-foreground block font-mono">
                                    Throughput
                                  </span>
                                  <span
                                    className={`text-sm sm:text-base font-mono font-semibold ${
                                      stage.isBottleneck
                                        ? "text-rose-500"
                                        : "text-foreground"
                                    }`}
                                  >
                                    {stage.throughput}
                                  </span>
                                </div>

                                <span
                                  className={`px-3 py-1 rounded-sm text-xs font-medium  mt-2 backdrop-blur-md whitespace-nowrap ${stage.badgeClass}`}
                                >
                                  {stage.statusSymbol} {stage.statusLabel}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div></div>
                        </div>

                        {/* Right Side: Status Badge & Flow Throughput */}
                      </Card>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Bottom Takeaway Statement Card */}
        <Reveal delay={0.32} className="mt-16 md:mt-20 mx-auto">
          <h3 className="text-3xl sm:text-3xl text-center md:text-5xl md:leading-13 font- tracking-tight text-transparent bg-linear-to-r from-foreground via-blue-900 to-blue-800 dark:from-foreground dark:via-blue-300 dark:to-blue-500 bg-clip-text">
            Sentraea detects the active bottleneck before you waste another week
            solving the wrong problem.
          </h3>
        </Reveal>
      </Container>
    </Section>
  );
}
