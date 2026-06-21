"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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
      id="sentraea"
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
          Demo <ArrowRight /> Sell <ArrowRight /> Build <ArrowRight />
          Scale
        </Card>
        <h1 className="text-5xl font-heading text-foreground/85  md:text-9xl mt-2 font-medium  tracking-tighter text-center leading-14 md:leading-28">
          <span>An </span>
          <span className="text-primary    gap-2">Execution</span>
          <span className="text-primary  mx-5   gap-2">System</span>
          <br />
          <span className="">
            For Solo, Bootstrapped <br />
            Startup Founders
          </span>
        </h1>
        <p className="text-lg md:text-3xl text-center tracking-tight  mt-10 px-5 md:px-30 items-center ">
          Sentraea is an AI execution system for solo, bootstrapped founders
          that picks the right playbook for your startup and tells you exactly
          what to do next at every stage.
        </p>
        <div className="mt-5">
          {/* <GetStartedBtn title="Create Your 4 Stages Plan Now" className="" /> */}
          <Button
            className={"text-xl py-5 px-4 tracking-tight text-white bg-black"}
            variant={"outline"}
            onClick={(e) => scrollTo("waitlist")}
          >
            Join the waitlist
          </Button>
        </div>
        <Card
          ref={cardRef}
          className="flex border transition-none shadow-[100px_100px_200px_rgba(105, 105, 105,0.001)]  shadow-gray-500/50  bg-gray-600 dark:bg-card flex-col px-2 py-2 justify-center items-center mt-10 w-[89%] overflow-hidden rounded-md"
        >
          <Image
            src={LoginPageImage}
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
