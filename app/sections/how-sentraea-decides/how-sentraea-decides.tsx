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

const STEPS = [
  {
    icon: Cable,
    step: "01",
    title: "Share your current setup",
    body: "Share your current setup and growth stage. We use this to understand what ‘good’ looks like for your business.",
    chips: ["MRR", "Customers", "Demo rate", "Stripe", "HubSpot", "Segment"],
    footnote: "Manual input supported.",
  },
  {
    icon: Brain,
    step: "02",
    title: "Understand your growth pattern",
    body: "Sentraea looks at the signals behind pipeline, conversion, activation, and retention to see where progress is getting stuck.",
    chips: [
      "Stage",
      "ICP",
      "Channels",
      "Past experiments",
      "History",
      "Memory",
    ],
    footnote: "Context compounds every week.",
  },
  {
    icon: Compass,
    step: "03",
    title: "Recommend the next best move",
    body: "Each week, you get one clear recommendation on where to focus next and what to deprioritize.",
    chips: [
      "Demand",
      "Conversion",
      "Activation",
      "Retention",
      "Founder bottleneck",
    ],
    footnote: "Prioritize one highest-leverage action.",
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
              ({ icon: Icon, step, title, body, chips, footnote }, i) => (
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
                    <p className="mt-auto pt-5 text-xs font-medium text-primary">
                      {footnote}
                    </p>
                  </Card>
                </Reveal>
              ),
            )}
          </div>

          <Reveal delay={0.2} className="mt-10 w-full">
            <Card className="relative overflow-hidden backdrop-blur-lg p-0 w-full border-none bg-card/5">
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(37,99,235,0.08),transparent_70%)]"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(37,99,235,0.08),transparent_70%)]"
                aria-hidden
              />

              <div
                className="bg-linear-to-r flex flex-col md:flex-row gap-5 justify-between from-primary/30 via-indigo-300/40 to-blue-200/60 backdrop-blur-lg   px-6 py-4 text-center md:px-10
"
              >
                <p className="relative  font-semibold font-heading text-xl leading-snug tracking-tight text-foreground md:text-2xl">
                  Keep this, or tighten to:
                  <span className="font-medium">
                    Sentraea recommends. You decide what to do.
                  </span>{" "}
                </p>
                <Button
                  variant={"outline_without_border"}
                  onClick={() => setOpen(true)}
                  className={
                    "items-center justify-center text-xl px-4 py-5 shadow-none bg-black text-white"
                  }
                >
                  Join the waitlist
                </Button>
              </div>
            </Card>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
