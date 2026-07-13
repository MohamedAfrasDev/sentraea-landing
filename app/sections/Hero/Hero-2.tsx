"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import LoginPageImage from "@/public/illustrations/workspace-mockup.png";
import LoginPageDark from "@/public/illustrations/hero-dark.png";
import Image from "next/image";
import { useTheme } from "@/lib/theme";
import HeroRightSideCard from "./components/hero-right-side-card";
import BG from "@/public/bg-hero.jpg";
import Label from "@/public/icons/text-label.png";
import { Badge } from "@/components/ui/badge";
const Hero2 = () => {
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
      className="relative px- items-center justify-start w-full pb-40 md:pb-0 h-full md:h-screen bg-white flex flex-col"
      style={{ overflow: "clip" }}
    >
      <Image
        src={Label}
        alt="label"
        width={900}
        height={200}
        className="absolute z-1 opacity-50 left-1 -bottom-20"
      />
      <Image
        src={Label}
        alt="label"
        width={900}
        height={200}
        className="absolute z-1 opacity-50 -right-100 -bottom-20"
      />
      {/* <div className="absolute inset-0 z-0 bg-[radial-gradient(#cacccf_1px,transparent_1px)] bg-size-[20px_20px] dark:bg-[radial-gradient(#4f5052_1px,transparent_1px)] opacity-70 mask-[radial-gradient(ellipse_80%_60%_at_50%_40%,#000_60%,transparent_100%)]" /> */}
      <div className="absolute inset-0 p-2 pointer-events-none">
        <div className="relative w-full h-full overflow-hidden rounded-xl">
          <Image
            src={BG}
            alt="bg"
            width={1000}
            height={1000}
            priority
            className="w-full h-full object-cover"
          />
          {/* Visual noise overlay */}
          <div
            className="absolute inset-0 opacity-[0.7] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
          {/* Subtle inner border for premium styling */}
        </div>
      </div>
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
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 55% at 50% 50%, transparent 50%, oklch(64.559% 0.19149 257.011 / 0.02) 100%)",
          pointerEvents: "none",
          zIndex: 10,
        }}
      />
      {/* ── Content sits above the grid ── */}
      <div className="flex gap-5">
        <div className="relative z-2 flex-2 bg-transparent w-full px-10 justify-start flex flex-col items-center mt-10">
          <Card className="px-5 py-2 shadow-sm border-white/10 text-white bg-card/10    backdrop-blur-2xl flex flex-row items-center text-xl font-medium tracking-tight">
            Weekly operating system for solo founders
          </Card>
          <h1 className="text-[40px] font-heading  text-foreground/85  md:text-[130px]   mt-2  tracking-[-10px]   text-center leading-14 md:leading-30">
            <span>Stop wasting weeks on</span>
            <br />
            <span className="text-primary     gap-2">the wrong work.</span>
          </h1>
          <p className="text-lg md:text-3xl px-3 text-center tracking-tight  mt-5 md:mt-10  items-start ">
            Sentraea looks at your founder context, checks the live market,
            identifies the next highest-leverage move, and handles the small
            execution around it so you can move with less decision fatigue.
          </p>

          <div className="mt-10 gap-4 flex px-3 ">
            {/* <GetStartedBtn title="Create Your 4 Stages Plan Now" className="" /> */}
            <Button
              className={
                "text-2xl py-6 px-5 bg-black text-white tracking-tight"
              }
              variant={"outline"}
              onClick={(e) => scrollTo("waitlist")}
            >
              Get Early Access
            </Button>
            <Button
              className={
                "text-2xl py-6 px-5 bg-card/40 text-muted-foreground backdrop-blur-lg tracking-tight"
              }
              variant={"outline"}
              onClick={(e) => scrollTo("features")}
            >
              How it works
            </Button>
          </div>
          <p className="font-number mt-4 text-xl up text-muted-foreground">
            For founders who are tired of guessing what deserves the week.
          </p>

          {/* <Card
          ref={cardRef}
          className="flex border transition-none shadow-[100px_100px_200px_rgba(105, 105, 105,0.001)]  shadow-gray-500/50  bg-gray-600 dark:bg-card flex-col px-1 py-1 justify-center items-center mt-10 w-[90%] h-fit overflow-hidden rounded-md"
        >
          <Image
            src={LoginPageImage}
            alt="a"
            width={2100}
            height={2100}
            className="w-full items-center justify-center mt-1 h-full object-cover"
            suppressHydrationWarning
          />
        </Card> */}
        </div>

        <div className="flex-1 z-2 mt-5 mr-5">
          <Card className="px-4 py-3">
            <div>
              <h2 className="text-xl font-medium">This week's move</h2>
              <h3 className="text-muted-foreground">
                Interview 5 agency owners before building feature X
              </h3>
            </div>

            <div>
              <h2 className="text-xl font-medium">Why now</h2>
              <h2 className="text-muted-foreground">
                Your onboarding feedback is weak, activation is unclear, and
                recent market signals show buyers care more about workflow
                automation than another dashboard.
              </h2>
            </div>

            <div className="flex gap-2 items-center">
              <h3 className="text-xl">Confidence:</h3>
              <Badge className="rounded-sm text-sm px-4 py-3 bg-amber-100/50 text-orange-400">
                Medium-High
              </Badge>
            </div>
            <div>
              <h3 className="text-xl font-medium">Evidence used</h3>
              <p className="font-number">-Founder notes</p>
              <p className="font-number">-Product metrics</p>
              <p className="font-number">-6 live market sources</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Hero2;
