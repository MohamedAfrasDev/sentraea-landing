"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useCallback, useState } from "react";
import { Container } from "../shared/section";
import { HeroDashboard } from "./hero-dashboard";
import HeroBG from "@/public/bg-hero.jpg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import JoinWaitlistDialog from "@/app/components/join-waitlist-dialog";

/** Tiny SVG noise tile, inlined so the hero needs no asset request. */
const NOISE_TEXTURE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E")`;

function HeroBackground() {
  const reducedMotion = useReducedMotion();
  const enter = (delay: number) => ({
    initial: { opacity: 0, y: reducedMotion ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.8,
      delay,
      ease: [0.21, 0.47, 0.32, 0.98] as const,
    },
  });

  return (
    <div
      className="pointer-events-none absolute  inset-0 overflow-hidden"
      aria-hidden
    >
      {/* Soft radial wash anchoring the headline */}
      <div
        className="absolute inset-0 opacity-[0.4] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <motion.p className="rounded-md " {...enter(0.2)}>
        <Image
          src={HeroBG}
          alt="hero-bg"
          width={1000}
          height={1000}
          className="w-full h-full px-5 py-4"
          style={{
            borderRadius: 25,
          }}
        />
      </motion.p>
      {/* Slow-drifting gradient orbs */}

      {/* Subtle grid, faded toward the edges */}

      {/* Grain */}
    </div>
  );
}

export function Hero() {
  const reducedMotion = useReducedMotion();

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: reducedMotion ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.8,
      delay,
      ease: [0.21, 0.47, 0.32, 0.98] as const,
    },
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <>
      <JoinWaitlistDialog open={dialogOpen} setOpen={setDialogOpen} />
      <section
        id="hero"
        className="relative overflow-hidden pb-20 pt-10 md:pb-28 md:pt-15"
      >
        <HeroBackground />

        <Container className="relative">
          <div className=" items- gap-7 flex flex-col md:flex-row">
            {/* Copy */}
            <div className="flex flex-col items-start flex-4">
              <motion.p
                {...enter(0)}
                className="inline-flex items-center gap-2 bg-card/50 px-5 py-2 rounded-md border border-white/5 backdrop-blur-sm"
              >
                <span
                  className="size-1.5 rounded-full bg-primary"
                  aria-hidden
                />
                Weekly operating system for early-stage B2B SaaS founders
              </motion.p>

              <motion.h1
                {...enter(0.08)}
                className="mt-6 font-heading text-[2.8rem] font-medium leading-[1.06] tracking-[-3px] md:tracking-[-4px] text-foreground md:text-6xl lg:text-[4.9rem]"
              >
                Stop guessing <br />
                <span className="bg-linear-to-r pr-1 from-black via-blue-800 to-blue-900 bg-clip-text text-transparent">
                  what matters this week{" "}
                </span>{" "}
              </motion.h1>

              <motion.p
                {...enter(0.16)}
                className="mt-6 max-w-xl text-base leading-relaxed bg-linear-to-tl from-black/70 via-black/60 to-muted-foreground/70 bg-clip-text text-transparent md:text-lg"
              >
                Sentraea tells early‑stage B2B SaaS founders the one
                highest‑leverage move to focus on every week, based on their
                real data and context.
              </motion.p>

              <motion.div
                {...enter(0.24)}
                className="mt-9 flex flex-wrap items-center gap-3"
              >
                <Button
                  onClick={() => setDialogOpen(true)}
                  className={"text-md px-4 py-5 text-lg shadow-primary/10"}
                >
                  Get Early Access
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Button>
              </motion.div>

              <motion.p
                {...enter(0.32)}
                className="mt-3 text-sm text-muted-foreground hidden md:block"
              >
                For B2B SaaS founders with some customers, but no repeatable
                growth yet.
              </motion.p>
            </div>

            {/* Product mockup */}
            <div className=" flex-3">
              <HeroDashboard />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
