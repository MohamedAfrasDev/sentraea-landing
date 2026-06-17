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

import ProblemValidationImage from "@/public/illustrations/idea-validation-2.svg";
import PMFDesignImage from "@/public/illustrations/product-market.svg";
import ExperimentsImage from "@/public/illustrations/experiments.svg";
import ScaleImage from "@/public/illustrations/scale-grow.svg";

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

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
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

      return () => {
        if (spacerRef.current) {
          spacerRef.current.style.height = "0px";
        }
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      <div
        ref={sectionRef}
        className="flex flex-col  items-start text-start gap-10 overflow-hidden min-h-screen pt-24 -z-10"
      >
        <div className=" max-w-6xl">
          <h2 className="text-7xl tracking-[-1px] font-(family-name:--font-sfpro) font-medium capitalize flex-3">
            One{" "}
            <span className="text-primary tracking-[-5px] font-medium font-heading ">
              workspace
            </span>
            <br />
            Four disciplined stages
          </h2>
          <p className="text-xl text-muted-foreground mt-4 tracking-tig">
            Sentraea stores every version, experiment, and decision so you see
            how v1 → v2 → v3 actually improved.
          </p>
        </div>

        <div
          ref={containerRef}
          className="flex flex-col md:flex-row gap-10 w-max mx-auto lg:px-20 mt-10"
        >
          <StageCardComponent
            stage={"1"}
            title={"Problem & Idea Validation"}
            shortLine={
              "Prove the problem and niche are real before you touch an MVP."
            }
            image={ProblemValidationImage}
            mockup={isDark.resolvedTheme == "dark" ? Stage1Dark : Stage1}
            className="w-screen max-w-[900px] shrink-0"
            evidence="CB Insights data confirms 42% of startups die building products with zero market need. Validate the signal before compiling the code."
            source="CB Insights Startup Failure Post-Mortem Report"
            scale={1.9}
          />
          <StageCardComponent
            stage={"2"}
            title={"PMF Design"}
            shortLine={
              "Turn a validated problem into a concrete offer, smallest MVP, and clear PMF plan."
            }
            image={PMFDesignImage}
            mockup={isDark.resolvedTheme == "dark" ? Stage2Dark : Stage2}
            className="w-screen max-w-[900px] shrink-0"
            evidence="YC's primary axiom: 'It’s better to build something that a small number of users love, than a large number of users like.' Constrain the MVP."
            source="Y Combinator / Paul Graham"
          />
          <StageCardComponent
            stage={"3"}
            title={"Experiments & PMF Signal"}
            shortLine={
              "Turn your PMF plan into real experiments and see how strong your signal really is."
            }
            image={ExperimentsImage}
            mockup={isDark.resolvedTheme == "dark" ? Stage3Dark : Stage3}
            className="w-screen max-w-[900px] shrink-0"
            source="Reforge (Brian Balfour) / Growth Compounding Models."
            evidence="Reforge data models dictate that experimentation velocity is the highest-weighted variable in achieving PMF. If you aren't testing, you are guessing."
          />
          <StageCardComponent
            stage={"4"}
            title={"GTM & Scale Readiness"}
            shortLine={
              "Turn early traction into a focused GTM motion and know when you’re ready to scale"
            }
            image={ScaleImage}
            mockup={isDark.resolvedTheme == "dark" ? Stage4Dark : Stage4}
            className="w-[95vw] max-w-[900px] shrink-0"
            scale={1.4}
            evidence="Startup Genome analysis proves 74% of tech startups die due to premature scaling. Do not inject capital until the GTM vector is deterministic."
            source="Startup Genome Project (Comprehensive Analysis of 3,200+ startups)"
          />
        </div>
      </div>
      <div ref={spacerRef} className="w-full" />
    </>
  );
};

export default FourStagesSection;
