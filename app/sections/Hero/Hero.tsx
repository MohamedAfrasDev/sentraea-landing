"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import LoginPageImage from "@/public/illustrations/workspace-mockup.png";
import LoginPageDark from "@/public/illustrations/hero-dark.png";
import Image from "next/image";
import { useTheme } from "next-themes";

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
      className="relative items-center bg-white flex flex-col"
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
      <div className="relative bg-transparent z-10 flex flex-col items-center mt-5">
        <Card className="px-5 py-2 shadow-xl text-muted-foreground bg-card/20 backdrop-blur-2xl border-card flex flex-row items-center text-sm md:text-base font-medium ">
          Built for Solo, Bootstrapped Startup Founders
        </Card>
        <h1 className="text-4xl sm:text-5xl font-serif tracking-tighter font-medium text-foreground/85  md:text-[125px] mt-4 text-center leading-11 sm:leading-14 md:leading-30">
          <span>The </span>
          <span className="text-primary    gap-2">Execution</span>
          <span className="text-primary  mx-2 md:mx-5   gap-2">System</span>
          <br className="hidden sm:block" />
          <span className="">
            That Stops Founders From
            <br />
            Building The Wrong Thing
          </span>
        </h1>
        <p className="text-lg md:text-3xl text-center tracking-tight  mt-5 px-5 md:px-30 items-center ">
          Sentraea gives solo, bootstrapped founders a stage-gated playbook with
          evidence requirements — so every next step is based on proof, not
          assumptions.
        </p>
        <div className="mt-5 flex flex-col items-center gap-3">
          {/* <GetStartedBtn title="Create Your 4 Stages Plan Now" className="" /> */}
          <Button
            className={"text-xl py-5 px-4 tracking-tight text-white bg-black"}
            variant={"outline"}
            onClick={(e) => scrollTo("waitlist")}
          >
            Get early access
          </Button>
          <p className="text-sm text-muted-foreground tracking-tight">
            Not an AI cofounder. Not for teams. Not for agencies.
          </p>
        </div>
        <Card
          ref={cardRef}
          className="flex border transition-none shadow-[100px_100px_200px_rgba(105, 105, 105,10)]  shadow-gray-500/50  bg-gray-600 dark:bg-card flex-col px-1 py-1 justify-center items-center mt-10 w-[89%] overflow-hidden rounded-2xl"
        >
          <Image
            src={LoginPageImage}
            alt="a"
            width={2200}
            height={2200}
            className="w-full items-center justify-center mt-1 mx-auto   h-full object-cover"
            suppressHydrationWarning
          />
        </Card>
      </div>
    </div>
  );
};

export default Hero;
