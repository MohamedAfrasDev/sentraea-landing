"use client";

import React, { useRef, useEffect } from "react";
import StageCardComponent from "./components/stage-card-component";
import Stage1 from "@/public/stages/STAGE-1.png";
import Stage2 from "@/public/stages/STAGE-2.png";
import Stage3 from "@/public/stages/STAGE-3.png";
import Stage4 from "@/public/stages/STAGE-4.png";

import Stage1Dark from "@/public/stages/STAGE-1-DARK.png";
import Stage2Dark from "@/public/stages/STAGE-2-DARK.png";
import Stage3Dark from "@/public/stages/STAGE-3-DARK.png";
import Stage4Dark from "@/public/stages/STAGE-4-DARK.png";
import { useTheme } from "next-themes";

import ProblemValidationImage from "@/public/illustrations/idea-validation.svg";
import PMFDesignImage from "@/public/illustrations/product-quality-animate.svg";
import ExperimentsImage from "@/public/illustrations/experiments.svg";
import ScaleImage from "@/public/illustrations/scalee.svg";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FourStagesSection = () => {
  const isDark = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;

    if (!section || !container) return;

    const ctx = gsap.context(() => {
      // Calculate the exact horizontal distance we need to move
      const getScrollAmount = () => {
        const containerWidth = container.scrollWidth;
        const sectionWidth = section.offsetWidth;
        return containerWidth - sectionWidth + 100;
      };

      // Set the spacer height dynamically
      if (spacerRef.current) {
        spacerRef.current.style.height = `${getScrollAmount()}px`;
      }

      // 1. Animate horizontal scroll
      const tween = gsap.to(container, {
        x: () => -getScrollAmount(), // Move left by the exact distance
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${getScrollAmount()}`,
        animation: tween,
        scrub: true,
        invalidateOnRefresh: true,
      });

      // 2. Pin the section until the end of the page so it stays as a background
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "max",
        pin: true,
        pinSpacing: false, // Let the next sections scroll over it
        invalidateOnRefresh: true,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div
        ref={sectionRef}
        className="flex flex-col  items-start text-start gap-10 overflow-hidden min-h-screen pt-24 -z-10"
      >
      <div className=" max-w-6xl">
        <h2 className="text-7xl tracking-[-5px] font-semibold capitalize flex-3">
          One{" "}
          <span className="text-primary tracking-[-5px] font-semibold font-heading ">
            workspace
          </span>
          <br />
          Four disciplined stages
        </h2>
        <p className="text-2xl text-muted-foreground mt-4">
          Sentraea stores every version, experiment, and decision so you see how
          v1 → v2 → v3 actually improved.
        </p>
      </div>

      <div
        ref={containerRef}
        className="flex flex-row gap-10 w-max px-10 lg:px-20 mt-10"
      >
        <StageCardComponent
          stage={"1"}
          title={"Problem & Idea Validation"}
          shortLine={
            "Prove the problem and niche are real before you touch an MVP."
          }
          image={ProblemValidationImage}
          mockup={isDark.resolvedTheme == "dark" ? Stage1Dark : Stage1}
          className="w-[85vw] max-w-[800px] shrink-0"
        />
        <StageCardComponent
          stage={"2"}
          title={"PMF Design"}
          shortLine={
            "Turn a validated problem into a concrete offer, smallest MVP, and clear PMF plan."
          }
          image={PMFDesignImage}
          mockup={isDark.resolvedTheme == "dark" ? Stage2Dark : Stage2}
          className="w-[85vw] max-w-[800px] shrink-0"
        />
        <StageCardComponent
          stage={"3"}
          title={"Experiments & PMF Signal"}
          shortLine={
            "Turn your PMF plan into real experiments and see how strong your signal really is."
          }
          image={ExperimentsImage}
          mockup={isDark.resolvedTheme == "dark" ? Stage3Dark : Stage3}
          className="w-[85vw] max-w-[800px] shrink-0"
        />
        <StageCardComponent
          stage={"4"}
          title={"GTM & Scale Readiness"}
          shortLine={
            "Turn early traction into a focused GTM motion and know when you’re ready to scale"
          }
          image={ScaleImage}
          mockup={isDark.resolvedTheme == "dark" ? Stage4Dark : Stage4}
          className="w-[95vw] max-w-[800px] shrink-0"
        />
      </div>
    </div>
    <div ref={spacerRef} className="w-full" />
  </>
  );
};

export default FourStagesSection;
