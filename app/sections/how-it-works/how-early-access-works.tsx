"use client";
import { ArrowRight, Cable, FileText, Send } from "lucide-react";
import { Fragment, useEffect, useRef, useState } from "react";
import { Container, Section, SectionHeading } from "../shared/section";
import { Reveal } from "../shared/reveal";
import BGOrange from "@/public/cta-bg.jpg";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import JoinWaitlistDialog from "@/app/components/join-waitlist-dialog";
import { WeeklyBriefDeliveryMockup } from "@/app/components/mockups/weekly-brief-delivery-mockup";
const STEPS = [
  {
    icon: Send,
    step: "Step 1",
    title: "Join the Founder Waitlist",
    body: "Tell us a bit about your SaaS and current growth stage.",
  },
  {
    icon: Cable,
    step: "Step 2",
    title: "Get selected for early access",
    body: "We’ll invite teams that are a strong fit and can benefit most from weekly guidance.",
  },
  {
    icon: FileText,
    step: "Step 3",
    title: "Get founder-led support",
    body: "Early users get hands-on onboarding, direct support, and a chance to shape the roadmap.",
  },
] as const;
export const WAITLIST_JOINED_EVENT = "waitlist:joined";

export function HowEarlyAccessWorks() {
  const [open, setOpen] = useState(false);
  function useWaitlistCount() {
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
      let cancelled = false;

      fetch("/api/waitlist")
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (!cancelled && typeof data?.count === "number") {
            setCount(data.count);
          }
        })
        .catch(() => {});

      const onJoined = () => setCount((c) => (c === null ? c : c + 1));
      window.addEventListener(WAITLIST_JOINED_EVENT, onJoined);

      return () => {
        cancelled = true;
        window.removeEventListener(WAITLIST_JOINED_EVENT, onJoined);
      };
    }, []);

    return count;
  }

  /** Counts up from 0 to `target` once, easing out. */
  function useCountUp(target: number | null) {
    const [display, setDisplay] = useState(0);
    const animated = useRef(false);

    useEffect(() => {
      if (target === null) return;

      // rAF doesn't fire in hidden tabs — show the final value straight away.
      if (animated.current || document.hidden) {
        animated.current = true;
        setDisplay(target);
        return;
      }
      animated.current = true;

      const duration = 900;
      const start = performance.now();
      let frame: number;

      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(Math.round(eased * target));
        if (t < 1) frame = requestAnimationFrame(tick);
      };

      frame = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(frame);
    }, [target]);

    return display;
  }
  const count = useWaitlistCount();
  const display = useCountUp(count);

  // Nothing to brag about yet — render nothing rather than "0 founders".
  if (count === null || count < 1) return null;

  return (
    <>
      <JoinWaitlistDialog open={open} setOpen={setOpen} />
      <Section id="early-access" className="relative">
        <Image
          src={BGOrange}
          alt="works"
          width={1000}
          height={1000}
          className="absolute w-full  h-full  px-5 py-5  rounded-4xl"
        />
        <Container className="items-center flex flex-col mt-10">
          <Reveal>
            <div className="text-start items-start mt-0">
              <p className="uppercase font-number text-black">Early Access</p>

              <h2 className="mt-2 text-4xl md:text-[3.5rem] md:leading-[50px] leading-[40px] font-medium bg-linear-to-r bg-clip-text text-transparent from-black via-black  to-black font-heading tracking-[-2px] md:tracking-[-3px]">
                Join the first Sentraea cohort{" "}
              </h2>
              <p className=" md:text-xl mt-1 md:mt-5">
                Get early access to one clear highest-leverage growth move every
                week + direct input on how the product is built.
              </p>
            </div>
          </Reveal>
          <Reveal className="text-start w-full">
            <div className="mt-8 flex flex-row items-start gap-8 md:flex-row md:items-stretch md:justify-start">
              <div className="text-start items-start flex flex-col">
                <p className="text-2xl text-white font-medium">
                  What early members get:
                </p>
                <div className="flex flex-col gap-2 mt-3  text-lg text-start">
                  <p>Priority access when we launch</p>
                  <p>Direct input on the product</p>
                  <p>Personal onboarding support from the founder</p>
                </div>
              </div>
            </div>
            <Button
              variant={"outline_without_border"}
              onClick={() => setOpen(true)}
              className={
                "items-center justify-center mt-5 text-xl px-4 py-5 shadow-none bg-black text-white"
              }
            >
              Join the Founder Waitlist
            </Button>
            <p className="mt-2">
              Early-access spots are limited. 47 founders have already joined
              the waitlist.
            </p>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
