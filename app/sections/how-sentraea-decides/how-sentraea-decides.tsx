"use client";
import { Brain, Cable, Compass } from "lucide-react";
import { Container, Section, SectionHeading } from "../shared/section";
import { Reveal } from "../shared/reveal";
import CTABG from "@/public/cta-bg.jpg";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import JoinWaitlistDialog from "@/app/components/join-waitlist-dialog";
import {
  FlowPanel,
  HowItWorksFlowMockup,
} from "@/app/components/mockups/how-it-works-flow-mockup";
import { ToolChip } from "@/app/components/mockups/mockup-primitives";
const CONNECTED_TOOLS = [
  "Stripe",
  "HubSpot",
  "Notion",
  "Linear",
  "PostHog",
] as const;

const DIAGNOSIS_CHECKS = [
  { text: "Pipeline volume stable", warning: false },
  { text: "Close rate falling", warning: true },
  { text: "Activation normal", warning: false },
] as const;
const STEPS = [
  {
    icon: Cable,
    step: "01",
    title: "Share your current setup",
    body: "Tell us your tools and current stage (manual input supported).",
    chips: ["MRR", "Customers", "Demo rate", "Stripe", "HubSpot", "Segment"],
    footnote: "Manual input supported.",
    widget: (
      <FlowPanel label="Inputs">
        <div className="flex flex-wrap gap-1.5">
          {CONNECTED_TOOLS.map((tool) => (
            <ToolChip key={tool} name={tool} />
          ))}
        </div>
        <div className="rounded-sm bg-white px-2.5 py-2">
          <p className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">
            Founder note
          </p>
          <p className="mt-0.5 text-[11px] italic leading-snug text-neutral-600">
            “Demos go well, but deals keep stalling right after the call.”
          </p>
        </div>
        <div className="mt-auto flex items-center justify-between pt-1">
          <span className="text-[10px] font-medium text-neutral-400">
            Stage
          </span>
          <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
            Early traction
          </span>
        </div>
      </FlowPanel>
    ),
  },
  {
    icon: Brain,
    step: "02",
    title: "Understand your growth pattern",
    body: "Sentraea reviews pipeline, conversion, activation, and retention.",
    chips: [
      "Stage",
      "ICP",
      "Channels",
      "Past experiments",
      "History",
      "Memory",
    ],
    footnote: "Context compounds every week.",
    widget: (
      <FlowPanel label="Diagnosis">
        <div className="rounded-lg border border-amber-200/40 bg-amber-50/50 px-3 py-2">
          <p className="text-[9px] font-bold uppercase tracking-wider text-amber-700">
            Current bottleneck
          </p>
          <p className="mt-0.5 text-sm font-semibold text-neutral-900">
            Conversion
          </p>
        </div>
        <ul className="space-y-2">
          {DIAGNOSIS_CHECKS.map(({ text, warning }) => (
            <li
              key={text}
              className="flex items-center gap-2 text-xs text-neutral-600"
            >
              {warning ? (
                <svg
                  className="size-3.5 shrink-0 text-amber-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              ) : (
                <svg
                  className="size-3.5 shrink-0 text-emerald-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
              {text}
            </li>
          ))}
        </ul>
      </FlowPanel>
    ),
  },
  {
    icon: Compass,
    step: "03",
    title: "Recommend the next best move",
    body: "You receive one focused move + what to ignore, with reasoning.",
    chips: [
      "Demand",
      "Conversion",
      "Activation",
      "Retention",
      "Founder bottleneck",
    ],
    footnote: "Prioritize one highest-leverage action.",
    widget: (
      <FlowPanel label="Recommendation">
        <div className="space-y-1 border-l-2 border-blue-500 py-0.5 pl-3">
          <p className="text-sm font-semibold leading-snug text-neutral-900">
            Rewrite demo flow for ICP X
          </p>
          <p className="text-[11px] leading-snug text-neutral-500">
            Close rate has dropped for 3 weeks while pipeline held steady.
          </p>
        </div>
        <div>
          <p className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">
            Not this week
          </p>
          <p className="mt-0.5 text-[11px] text-neutral-400 line-through decoration-neutral-300">
            New blog series · Side integration
          </p>
        </div>
        <div className="mt-auto flex flex-wrap items-center gap-1.5 border-t border-neutral-100 pt-2.5">
          <span className="rounded-md bg-blue-600 px-2.5 py-1 text-[10px] font-semibold text-white">
            Approve
          </span>
          <span className="rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-neutral-600">
            Edit
          </span>
          <span className="rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-neutral-600">
            Send to Linear
          </span>
        </div>
      </FlowPanel>
    ),
  },
] as const;

export function HowSentraeaDecides() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <JoinWaitlistDialog open={open} setOpen={setOpen} />
      <Section id="how-it-works" className="relative min-h-fit ">
        <Image
          src={CTABG}
          alt="cta"
          width={1000}
          height={1000}
          className="absolute w-full  h-full  px-5 py-5  rounded-4xl"
        />
        <div
          className="absolute inset-0 opacity-[0.4] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        <Container>
          <Reveal>
            <div className="text-center items-center mt-15">
              <p className="uppercase font-number text-black">How it works</p>

              <h2 className=" text-4xl md:text-[3.5rem] md:leading-[80px] font-medium bg-linear-to-r bg-clip-text text-transparent from-white via-blue-50  to-blue-100 font-heading tracking-[-2px] md:tracking-[-3px]">
                How does Sentraea choose your weekly move?
              </h2>
              <p className="text-white mt-5 md:mt-0">
                It looks at your signals, finds the constraint, and suggests the
                next best move.
              </p>
            </div>
          </Reveal>
          <div className="mt-16 grid gap-4 md:grid-cols-3">
            {STEPS.map(
              (
                { icon: Icon, step, title, body, chips, footnote, widget },
                i,
              ) => (
                <Reveal key={title} delay={0.1 * i}>
                  <Card className="group flex h-full flex-col bg-card/90 hover:bg-black/80 group cursor-pointer gap-0 backdrop-blur-sm p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_24px_56px_-24px_rgba(30,58,138,0.25)] md:p-7">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex size-11 items-center justify-center rounded-sm bg-primary/6 text-primary">
                        <Icon className="size-5" aria-hidden />
                      </div>
                      <span className="font-number text-3xl font-medium text-black/15 group-hover:text-white">
                        {step}
                      </span>
                    </div>
                    <h3 className="mt-5 group-hover:text-primary font-heading text-2xl font-medium tracking-tight text-foreground">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground group-hover:text-white">
                      {body}
                    </p>
                    {/* <div className="mt-4 flex flex-wrap gap-1.5">
                    {chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-sm  bg-black/2.5 px-2.5 py-1 text-xs text-muted-foreground transition-colors duration-300 group-hover:border-primary/10 group-hover:bg-primary/[0.04] group-hover:text-foreground"
                      >
                        {chip}
                      </span>
                    ))}
                  </div> */}
                    <div className="mt-5">{widget}</div>
                    <p className="mt-auto pt-5 text-xs font-medium text-primary">
                      {footnote}
                    </p>
                  </Card>
                </Reveal>
              ),
            )}
          </div>
          {/* 
          <Reveal delay={0.15} className="mt-6">
            <HowItWorksFlowMockup />
          </Reveal> */}

          <Reveal
            delay={0.2}
            className="mt-10 w-full mx-auto items-center justify-center flex"
          >
            <Button
              variant={"outline_without_border"}
              onClick={() => setOpen(true)}
              className={
                "items-center w-fit justify-center text-xl px-4 py-5 shadow-none bg-black text-white"
              }
            >
              Reserve My Spot
            </Button>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
