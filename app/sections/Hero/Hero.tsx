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
import BGOverlayHero from "./components/components/bg-overlay";

const Hero = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamic loader helper for script injection
    const loadScript = (src: string): Promise<boolean> => {
      return new Promise((resolve) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve(true);
          return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    const initializeScrollTrigger = async () => {
      try {
        // Load GSAP & ScrollTrigger from high-performance cdnjs
        const gsapLoaded = await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js",
        );
        const triggerLoaded = await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js",
        );

        if (gsapLoaded && triggerLoaded) {
          const win = window as any;
          if (win.gsap && win.ScrollTrigger) {
            win.gsap.registerPlugin(win.ScrollTrigger);

            // Animate card up while scrolling down
            win.gsap.fromTo(
              cardRef.current,
              { y: -40 },
              {
                y: 400,
                ease: "none",
                scrollTrigger: {
                  trigger: cardRef.current,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1, // Smooth scrub delay
                },
              },
            );
          }
        }
      } catch (error) {
        console.error("GSAP ScrollTrigger setup failed:", error);
      }
    };

    initializeScrollTrigger();
  }, []);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div
      className="relative items-center bg-white flex flex-col"
      style={{ overflow: "clip" }}
    >
      {/* <div ref={cardRef} className="w-full h-full">
        <BGOverlayHero />
      </div> */}
      {/* ── Grid-line background ── */}
      <div aria-hidden="true" />
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
        <p className="text-3xl text-center tracking-tighter  mt-3 px-30 items-center flex">
          Guide your startup with an AI execution system from idea{" "}
          <ArrowRight className="mx-4" /> scale
        </p>
        <div className="mt-5">
          {/* <GetStartedBtn title="Create Your 4 Stages Plan Now" className="" /> */}
          <Button className={"text-xl py-5 px-4 tracking-tight"}>
            Explore for Free
          </Button>
        </div>
        <Card
          ref={cardRef}
          className="flex border transition-none shadow-[100px_100px_200px_rgba(105, 105, 105,0.001)]  shadow-gray-500/50  bg-gray-600 dark:bg-card flex-col px-2 py-2 justify-center items-center mt-10 w-[89%] overflow-hidden rounded-md"
        >
          <Image
            src={
              mounted && resolvedTheme === "dark"
                ? LoginPageDark
                : LoginPageImage
            }
            alt="a"
            width={2100}
            height={2100}
            className="w-full items-center justify-center mt-2 h-full object-cover"
            suppressHydrationWarning
          />
        </Card>
      </div>
    </div>
  );
};

export default Hero;
