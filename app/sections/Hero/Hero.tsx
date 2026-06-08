"use client";

import React, { useEffect, useRef, useState } from "react";
import GradientText from "@/components/GradientText";
import TestContent from "./components/test-content";

import HeroAbstract from "./components/hero-abstract";
import TestContentMobile from "./components/test-content-mobile";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ArrowRightIcon,
  GitGraph,
  Lightbulb,
  MoveUpIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import LoginPageImage from "@/public/illustrations/hero-light.png";
import LoginPageDark from "@/public/illustrations/hero-dark.png";
import Image from "next/image";
import { useTheme } from "next-themes";
import GetStartedBtn from "@/components/getstarted-btn";

const Hero = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  return (
    <div
      className="relative items-center h-screen flex flex-col"
      style={{ overflow: "clip" }}
    >
      {/* ── Sharp Noisy Background Overlay ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.08] dark:opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      {/* ── Subtle corner glow so the grid "pops" slightly at the edges ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 55% at 50% 50%, transparent 50%, oklch(64.559% 0.19149 257.011 / 0.02) 100%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* ── Content sits above the grid ── */}
      <div className="relative bg-transparent z-10 flex flex-col items-center mt-20">
        <Card className="px-5 py-2 shadow-xl text-muted-foreground bg-card/20    backdrop-blur-2xl border-card flex flex-row items-center text-xl font-medium tracking-tighter">
          Idea <ArrowRight /> Evidence <ArrowRight /> Growth
        </Card>
        <h1 className="text-8xl mt-2 font-semibold  tracking-tighter text-center leading-25">
          <span>An </span>
          <span className="text-primary font-heading   gap-2">Execution</span>
          <span className="text-primary font-heading mx-5   gap-2">System</span>
          <br />
          <span>For Your Next Startup</span>
        </h1>
        <p className="text-3xl text-center text-muted-foreground mt-3 px-30 items-center flex">
          Guide your startup with an AI execution system from idea{" "}
          <ArrowRight className="mx-4" /> scale
        </p>
        <div className="mt-5">
          <GetStartedBtn title="Get Started For Free" className="" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
