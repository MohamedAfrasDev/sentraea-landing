"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import LoginPageImage from "@/public/illustrations/workspace-mockup.png";
import LoginPageDark from "@/public/illustrations/hero-dark.png";
import Image from "next/image";
import { useTheme } from "next-themes";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import EarlyAccessCard from "./components/early-access-card";
import InteractiveCLI from "./components/InteractiveCLI";

const Hero = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);
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
              { y: -10 },
              {
                y: 200,
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
      id="sentraea"
      className="relative items-center bg-white dark:bg-black h-screen  flex flex-col"
      style={{ overflow: "clip" }}
    >
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#cacccf_1px,transparent_1px)] bg-size-[20px_20px] dark:bg-[radial-gradient(#4f5052_1px,transparent_1px)] opacity-70 mask-[radial-gradient(ellipse_80%_60%_at_50%_40%,#000_60%,transparent_100%)]" />

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
      <div className="flex gap-10 justify-center items-center flex-row">
        <div className="relative flex-5 justify-center bg-transparent z-10 px-10 py-5 flex flex-col items-start mt-5">
          <p className="uppercase tracking-[0.08rem] px-2">
            {" "}
            Execution system for solo founders
          </p>
          <h1 className="text-4xl sm:text-5xl  tracking-tighter    md:text-8xl mt-4 text-start leading-11 sm:leading-14 md:leading-20">
            <span className="  tracking-[-6px] font-manrope font-medium">
              Stop Building the
            </span>
            <br />
            <span className="text-primary text-9xl tracking-[-10px]   font-manrope font-medium  gap-2">
              Wrong thing
            </span>
          </h1>
          <p className="text-lg md:text-3xl text-start font-light text-muted-foreground  mt-5 px-1">
            Every tool that exists gives solo founders a report, a framework, or
            a checklist — and then lets them ignore it. Sentraea is the first
            execution system that does not give founders the option to skip the
            hard step.
          </p>
          <div className="mt-5 flex flex-col items-center gap-3">
            {/* <GetStartedBtn title="Create Your 4 Stages Plan Now" className="" /> */}
            {/* <Button
            className={"text-xl py-5 px-4 tracking-tight text-white bg-black"}
            variant={"outline"}
            onClick={(e) => scrollTo("waitlist")}
          >
            Get early access
          </Button> */}
            {/* <p className="text-sm text-muted-foreground tracking-tight">
            Not an AI cofounder. Not for teams. Not for agencies.
          </p> */}
          </div>
        </div>

        <div className="flex-4 px-10 items-center flex flex-col justify-center">
          <InteractiveCLI />
        </div>
      </div>
    </div>
  );
};

export default Hero;
