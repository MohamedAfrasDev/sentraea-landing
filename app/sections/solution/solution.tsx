import {
  CalendarCheck,
  Minus,
  ScanSearch,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { Container, Section, SectionHeading } from "../shared/section";
import { Reveal } from "../shared/reveal";
import { Card } from "@/components/ui/card";

import DARKBG from "@/public/dark-blue-bg.jpg";
import Image from "next/image";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    icon: CalendarCheck,
    title: "Weekly Founder Brief",
    body: "One compact summary of where your business actually stands.",
  },
  {
    icon: ScanSearch,
    title: "Bottleneck Diagnosis",
    body: "Demand, conversion, activation, retention, or systems — pinpointed.",
  },
  {
    icon: Sparkles,
    title: "One Recommended Move",
    body: "One focus for the week, backed by your own numbers.",
  },
  {
    icon: ShieldCheck,
    title: "What NOT To Do",
    body: "Ignore distractions with confidence, not guilt.",
  },
] as const;

export function Solution() {
  return (
    <Section
      id="solution"
      className="min-h-screen bg-linear-to-b relative from-transparent via-primary/2.5 to-transparent "
    >
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#cacccf_1px,transparent_1px)] bg-size-[20px_20px] dark:bg-[radial-gradient(#4f5052_1px,transparent_1px)] opacity-70 mask-[radial-gradient(ellipse_80%_60%_at_50%_40%,#000_60%,transparent_100%)]" />
      {/* <Image
        src={DARKBG}
        alt="BG"
        width={10000}
        height={1000}
        className="absolute z-0 h-full px-5 rounded-4xl py-4"
      /> */}
      <div
        className="absolute inset-0 opacity-[0.2] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />{" "}
      <div
        className="absolute inset-0 opacity-[0.2] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      <Container className="relative h-full justify-center flex flex-col items-center">
        <div className="text-center items-center">
          <p className="uppercase font-number text-primary">The Solution</p>

          <h2 className=" text-4xl md:text-[3.5rem] md:leading-[80px] font-medium bg-linear-to-r bg-clip-text text-transparent from-foreground via-blue-800/70  to-blue-800 font-heading tracking-[-2px] md:tracking-[-3px]">
            Sentraea is your weekly focus system.
          </h2>
          <p className="mt-5 md:mt-0 text-xl">
            {" "}
            Sentraea sits on top of your existing tools and data. Once a week,
            it looks at what’s happening in your SaaS and tells you <br />
            <span className="font-medium">
              the one move most likely to create leverage now.
            </span>
          </p>
        </div>
        <Card className="p-0 bg-card/10 border border-gray-200 mt-10">
          <div className="grid rounded-none bg-linear-to-br from-white via-blue-100/10 to-blue-100/40  grid-cols-1 md:grid-cols-2     p-0 gap-0">
            {FEATURES.map((feature, index) => {
              return (
                <div
                  key={index}
                  className={cn(
                    "p-12 text-center flex flex-col items-start",

                    index <= 1 && "border-b",
                    index == 0 && "border-r",
                    index == 2 && "border-r",
                  )}
                >
                  <div className="bg-primary/10 p-2 mb-4 rounded-xl">
                    <feature.icon className="text-primary text-xl" />
                  </div>
                  <h3 className="text-3xl text-start font-heading font-medium tracking-[-1px]">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-start text-muted-foreground">
                    {feature.body}
                  </p>
                </div>
              );
            })}
          </div>
        </Card>
      </Container>
    </Section>
  );
}
