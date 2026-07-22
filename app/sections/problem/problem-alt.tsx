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
import feat1 from "@/public/features/feat2.jpg";
import ProblemVisual from "./problem-visual";
import ProblemVisualCp from "./problem-visualCp";
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

        <div className="px-10 relative flex flex-col text-center items-center justify-center gap-5">
          <div className="flex-2">
            <h2 className="text-5xl font- tracking-tight">
              {" "}
              Your week is full. Your growth isn’t.
            </h2>
            <p className="text-xl text-muted-foreground mt-3">
              You make a lot of decisions every week. But most founders aren’t
              sure if they worked on what actually moved the needle.
            </p>

            <div className=" gap-20 mt-10">
              <div className="w-full ">
                <ProblemVisualCp />
              </div>
              <div className="w-full text-center flex-1 mt-10">
                <p className="text-xl  mt-2 text-muted-foreground">
                  At the end of the week you will ask:
                </p>
                <p className="mt-2 text-5xl font-normal md:leading-13 text-transparent tracking-tighter  font- bg-linear-450 bg-clip-text from-foreground via-blue-900 to-blue-950">
                  Did we work on the thing that mattered most?
                </p>
                <p className="text-lg md:text-2xl mt-1 text-gray-600 font-normal leading-relaxed">
                  You’re not short on effort. You’re short on clarity.
                </p>
                <p className="text-2xl  mt-10 text-muted-foreground">
                  You want one clear answer every week:
                </p>
                <p className="text-6xl  tracking-tight text-transparent bg-linear-to-r bg-clip-text from-foreground via-blue-900 to-blue-800">
                  Where should I focus this week?
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
