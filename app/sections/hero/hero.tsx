"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { Container } from "../shared/section";
import { HeroDashboard } from "./hero-dashboard";
import HeroBG from "@/public/bg-hero.jpg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import JoinWaitlistDialog from "@/app/components/join-waitlist-dialog";
import { WaitlistCounter } from "@/app/components/waitlist-counter";

/**
 * Lightweight static noise grain — a tiny 150×150 SVG tile with a simple
 * rect-based noise pattern. Unlike feTurbulence (which the browser must
 * re-rasterize on every composite), this is decoded once and tiled as a
 * GPU texture, costing essentially zero per-frame.
 */
const NOISE_GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 150 150' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='150' height='150' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`;

function HeroBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
      style={{ contain: "strict" }}
    >
      {/* Lightweight grain overlay — uses a tiny tiled SVG decoded once */}
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage: NOISE_GRAIN,
          backgroundRepeat: "repeat",
          backgroundSize: "150px 150px",
        }}
      />

      {/* Hero background image */}
      <Image
        src={HeroBG}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover px-5 py-4"
        style={{ borderRadius: 25 }}
      />
    </div>
  );
}

/** Shared easing curve for hero entrance animations. */
const HERO_EASE = [0.21, 0.47, 0.32, 0.98] as const;

export function Hero() {
  const reducedMotion = useReducedMotion();

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  /** Memoised entrance animation factory — avoids new object allocation per render. */
  const enter = useMemo(
    () => (delay: number) => ({
      initial: { opacity: 0, y: reducedMotion ? 0 : 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.8, delay, ease: HERO_EASE },
    }),
    [reducedMotion],
  );
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
          <div className="items-start gap-12 flex flex-col md:flex-row ">
            {/* Copy */}
            <div className="flex flex-col items-start flex-1 md:flex-4">
              <motion.p
                {...enter(0)}
                className="inline-flex items-center gap-2 bg-card/50 px-5 py-2 rounded-md border border-white/5 backdrop-blur-sm"
              >
                <span
                  className="size-1.5 rounded-full bg-primary"
                  aria-hidden
                />
                Weekly growth priority for early-stage B2B SaaS founders
              </motion.p>

              <motion.h1
                {...enter(0.08)}
                className="mt-6 font-heading text-[2.8rem] font-medium leading-[1.06] md:leading-20 tracking-[-3px] md:tracking-[-4px] text-foreground md:text-6xl lg:text-[5rem]"
              >
                Know the One <br />
                <span className="bg-linear-to-r pr-1 from-black via-blue-800 to-blue-900 bg-clip-text text-transparent">
                  Highest-Leverage
                </span>{" "}
                <br />
                Move for Your SaaS Every Week
              </motion.h1>

              <motion.p
                {...enter(0.16)}
                className="mt-3 max-w-xl text-base leading-relaxed bg-linear-to-tl from-black/70 via-black/60 to-muted-foreground/70 bg-clip-text text-transparent md:text-lg"
              >
                Connect your growth data once. Every Week, Sentraea identifies
                your biggest bottleneck, explains why it's happening, and
                recommends the single action most likely to move your business
                forward.
              </motion.p>

              <motion.div
                {...enter(0.24)}
                className="mt-9 flex flex-wrap items-center gap-3"
              >
                <Button
                  onClick={() => setDialogOpen(true)}
                  className={"text-md px-4 py-5 text-lg shadow-primary/10"}
                >
                  Reserve My Spot{" "}
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Button>
              </motion.div>

              <motion.div {...enter(0.32)}>
                {/* <p className="text-xl mt-2">
                  Spend your week executing the right priority—not debating what
                  it should be.
                </p> */}
              </motion.div>
            </div>

            {/* Product mockup */}
            <motion.div
              {...enter(0.3)}
              className="flex-1 hidden xl:block md:flex-3 mt-10 items-start  md:mt-0 w-full justify-center md:justify-start"
            >
              <HeroDashboard />
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}
