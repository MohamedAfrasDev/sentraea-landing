import { CircleHelp, Layers, ListPlus, Target } from "lucide-react";
import { Container, Section, SectionHeading } from "../shared/section";
import { Reveal } from "../shared/reveal";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Img from "@/public/illustrations/problem-1.jpg";
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

export function Problem() {
  const problems = [
    "Fix bugs",
    "Improve pricing",
    "Launch ads",
    "Build Feature X",
    "Talk to customers",
    "New ICP",
  ];
  return (
    <Section id="problem" className="">
      <Container className="relative z-1 flex flex-col md:flex-row gap-15">
        <div className="flex-2">
          <p className="font-number text-primary text-lg font-medium">
            The Founder Reality
          </p>
          <h2 className="text-4xl sm:text-5xl tracking-tighter md:text-5xl font-heading font-medium text-foreground leading-[1.08]">
            Your week is full. Your growth isn't.
          </h2>
          <p className="md:text-xl text-muted-foreground mt-3">
            Every week you choose between fixing onboarding, rewriting pricing,
            launching campaigns, building features, or talking to customers.
          </p>

          <p className="text-4xl tracking-tight  mt-10">
            The problem isn't execution.
            <br /> It's choosing the one decision that compounds.
          </p>
        </div>

        <div className="flex-1 h-fit rounded-none  bg-div/30 backdrop-blur-2xl relative">
          <Card className="relative bg-card/20 mt-1 ml-1 p-4">
            <p className="font-number text-2xl uppercase">This Week</p>
            <div className="grid grid-cols-1 gap-2">
              {problems.map((prob, index) => {
                return (
                  <div key={index} className="flex gap-2 items-center">
                    <div className="w-2 h-2 bg-primary" />
                    <p className="text-xl text-muted-foreground">{prob}</p>
                  </div>
                );
              })}
            </div>
            <p className="text-2xl tracking-tight mt-3 px-2">
              Which one actually moves growth?
            </p>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
