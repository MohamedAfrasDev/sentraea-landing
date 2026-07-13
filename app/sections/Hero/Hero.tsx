"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import LoginPageImage from "@/public/illustrations/workspace-mockup.png";
import LoginPageDark from "@/public/illustrations/hero-dark.png";
import Image from "next/image";
import { useTheme } from "@/lib/theme";
import HeroRightSideCard from "./components/hero-right-side-card";
import WeeklyConsole from "./components/weekly-console";
import BG from "@/public/bg-hero.jpg";
import Label from "@/public/icons/text-label.png";
const Hero = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
      className="relative px- items-center justify-center w-full pb-40 md:pb-24 h-full md:min-h-screen bg-white flex flex-col"
      style={{ overflow: "clip" }}
    >
      <Image
        src={Label}
        alt="label"
        width={900}
        height={200}
        className="absolute z-1 opacity-30 left-1 -bottom-20"
      />
      <Image
        src={Label}
        alt="label"
        width={900}
        height={200}
        className="absolute z-1 opacity-40 -right-100 -bottom-20"
      />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#cacccf_1px,transparent_1px)] bg-size-[20px_20px] dark:bg-[radial-gradient(#4f5052_1px,transparent_1px)] opacity-70 mask-[radial-gradient(ellipse_80%_60%_at_50%_40%,#000_60%,transparent_100%)]" />
      <div className="absolute inset-0 p-2 pointer-events-none">
        <div className="relative w-full h-full overflow-hidden rounded-md ">
          <Image
            src={BG}
            alt="bg"
            width={1000}
            height={1000}
            priority
            className="w-full h-full object-"
          />
          {/* Visual noise overlay */}
          <div
            className="absolute inset-0 opacity-[0.3] mix-blend-overlay pointer-events-none"
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

      {/* ── Content sits above the grid ── */}
      <div>
        <div className="relative z-2 flex-2 bg-transparent w-full px-6 md:px-10 justify-center flex flex-col items-center mt-24 md:mt-32">
          <Card className="px-4 py-1.5 shadow-sm border-white/10 text-white bg-card/10 backdrop-blur-2xl flex flex-row items-center gap-2 text-sm font-medium tracking-tight">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Weekly operating system for solo founders
          </Card>
          <h1 className="text-[46px] font-heading  text-foreground/85  md:text-[120px]   mt-3 tracking-[-2px]  md:tracking-[-7px]   text-center leading-[1.02]">
            <span>Stop wasting weeks on</span>
            <br />
            <span className="text-primary     gap-2">the wrong work.</span>
          </h1>
          <p className="text-lg md:text-2xl px-3 text-center tracking-tight text-neutral-600 max-w-3xl mt-5 md:mt-7 leading-snug">
            Sentraea reads your founder context, checks the live market, gives
            you one highest-leverage move for the week — and handles the small
            execution around it.
          </p>

          <div className="mt-9 gap-3 flex px-3">
            <Button
              className={
                "text-base md:text-lg py-5 px-6 bg-black text-white tracking-tight shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)] transition-transform hover:-translate-y-px"
              }
              variant={"outline"}
              onClick={() => router.push("/sign-up")}
            >
              Get Early Access
            </Button>
            <Button
              className={
                "text-base md:text-lg py-5 px-6 bg-card/40 text-neutral-700 backdrop-blur-lg tracking-tight"
              }
              variant={"outline"}
              onClick={(e) => scrollTo("howitworks")}
            >
              See how it works
            </Button>
          </div>
          <p className="mt-5 font-mono text-[11px] md:text-xs tracking-[0.08em] text-neutral-500">
            For founders tired of guessing what deserves the week.
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-neutral-400">
            <span className="flex items-center gap-1.5">
              <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
                <path
                  d="m2.5 6.2 2.4 2.4 4.6-5"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              17 of 50 founding spots claimed
            </span>
            <span className="hidden h-3 w-px bg-neutral-200 sm:block" />
            <span className="flex items-center gap-1.5">
              <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
                <path
                  d="m2.5 6.2 2.4 2.4 4.6-5"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Nothing sent without your approval
            </span>
          </div>

          {/* product reality — the weekly console */}
          <div className="mt-14 flex w-full justify-center md:mt-16">
            <WeeklyConsole />
          </div>

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
      </div>
    </div>
  );
};

export default Hero;
