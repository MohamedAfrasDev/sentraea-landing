"use client";
import { CircleHelp, Layers, ListPlus, Target } from "lucide-react";
import { Container, Section, SectionHeading } from "../shared/section";
import { Reveal } from "../shared/reveal";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import JoinWaitlistDialog from "@/app/components/join-waitlist-dialog";
import { ProblemChaosMockup } from "@/app/components/mockups/problem-chaos-mockup";
import ProblemSection from "@/public/prob.png";
import Image from "next/image";
const PAIN_POINTS = [
  {
    icon: CircleHelp,
    title: "No clear diagnosis",
    body: "You’re not sure if the real constraint is demand, conversion, activation, or churn.",
  },
  {
    icon: ListPlus,
    title: "Addition by default",
    body: "Your roadmap keeps growing, but MRR doesn’t.",
  },
  {
    icon: Layers,
    title: "Signal buried in tools",
    body: "Dashboards show you everything, but don’t tell you what to do this week.",
  },
] as const;

export function ProblemAlt() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <JoinWaitlistDialog open={open} setOpen={setOpen} />
      <Section id="problem" className="min-h-screen   gap-30">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(#cacccf_1px,transparent_1px)] bg-size-[20px_20px] dark:bg-[radial-gradient(#4f5052_1px,transparent_1px)] opacity-70 mask-[radial-gradient(ellipse_80%_60%_at_50%_40%,#000_60%,transparent_100%)]" />

        <div className="flex gap-30 flex-col md:flex-row">
          <Container className="relative z-1 flex-4">
            <div className=" gap-10">
              <div className="flex-3 gap-0">
                <div className="items-center text-start">
                  <p className="uppercase font-number text-primary">
                    The Problem
                  </p>

                  <h2 className=" text-4xl md:text-[3.4rem] font-medium bg-linear-to-r bg-clip-text text-transparent from-foreground/80 via-black  to-black font-heading tracking-[-2px] md:tracking-[-3px] leading-11.25 md:leading-20">
                    Your week is full.
                    {/* <br /> */} Your growth isn’t.{" "}
                  </h2>
                </div>
                <Reveal delay={0.1} className="mx-auto mt-5 md:mt-0 text-start">
                  <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                    You ship features, run campaigns, jump on demos, fix bugs,
                    and tweak onboarding. But at the end of the week, you still
                    ask yourself:
                  </p>
                </Reveal>
              </div>
              <Reveal className="flex-2 text-start ">
                <p className="mt-10 text-4xl md:mt-5 bg-clip-text leading-10 font-heading text-transparent bg-linear-to-r from-black via-blue-900/80 to-blue-800/80 font-medium tracking-tight md:tracking-[-4px] md:text-5xl">
                  <span className="text-primary md:text-6xl">&ldquo;</span>Did
                  we work on the thing that actually mattered most?
                  <span className="text-primary md:text-6xl">&rdquo;</span>
                </p>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-xl">
                  Most founders try to solve this with more tasks, more tools,
                  and more dashboards. The real issue isn’t effort — it’s
                  priority.
                </p>
              </Reveal>
            </div>
            {/* <Reveal delay={0.15} className="mt-14">
            <ProblemChaosMockup />
          </Reveal> */}
            <div className="mt-5">
              {/* <h3 className="text-3xl">The quiet failure mode</h3> */}
              {/* <Card className="p-0 bg-card/10">
            <div className="mt-0 bg-linear-to-br from-white via-blue-300 to-blue-500 flex-2 grid gap-0 sm:grid-cols-2  lg:grid-cols-3">
              {PAIN_POINTS.map(({ icon: Icon, title, body }, i) => (
                <Reveal key={title} delay={0.08 * i}>
                  <div
                    className={cn(
                      "group relative h-full py-5 flex items-center text-center flex-col border-muted-foreground/10 gap-2 bg-card/90 backdrop-blur-lg px-6 transition-all duration-300",
                      i !== PAIN_POINTS.length - 1 && "border-r",
                    )}
                  >
                    <div className="inline-flex size-10 min-w-10 items-center justify-center rounded-sm bg-primary/6 text-primary transition-colors duration-300 group-hover:bg-primary/10">
                      <Icon className="size-5" aria-hidden />
                    </div>

                    <p className="mt-2 text-xl leading-relaxed ">{body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Card> */}
            </div>
          </Container>

          <div className="flex-2 hidden md:block mr-10 ">
            <Image
              src={ProblemSection}
              alt="Problem"
              className="relative max-w-100 scale-120"
              width={1000}
              height={1000}
            />
          </div>
        </div>
        <div className="px-10">
          <Card className="p-0 bg-card/10 mt-5 h-fit">
            <div className="px-5 py-5 bg-linear-to-r flex flex-col gap-5 md:flex-row justify-between items-start md:items-center  from white via-blue-100/50 to-blue-200/40 backdrop-blur-lg">
              <p className="text-xl md:text-4xl text-start tracking-tighter leading-5 font-medium bg-linear-to-r bg-clip-text text-transparent from-foreground/80 via-blue-900/80  to-blue-600 font-heading md:tracking-[-2px] md:leading-10">
                {" "}
                You want a clear answer to:{" "}
                <span className="text-2xl md:text-4xl leading-7.5 md:leading-11.25">
                  “Where should we focus right now?”
                </span>
              </p>
              <Button
                variant={"outline_without_border"}
                onClick={() => setOpen(true)}
                className={
                  "items-center justify-start text-xl px-4 py-5 shadow-none bg-black text-white"
                }
              >
                Reserve My Spot
              </Button>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
