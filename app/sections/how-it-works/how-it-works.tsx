import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import React from "react";

const HowItWorks = () => {
  const steps = [
    {
      title: "Get your playbook",
      desc: "Answer 5 questions about where you are right now. Sentraea assigns you a personalised stage-gated execution map built for solo founders at your exact stage.",
      badge: "Stage 1A assigned instantly",
    },
    {
      title: "Execute with evidence gates",
      desc: "Each stage has specific required actions. Complete them. Submit evidence. The next stage unlocks only when your current stage is genuinely done — not just attempted.",
      badge: "Gate requires real proof",
    },
    {
      title: "Build in the right direction",
      desc: "By the time you build anything, you've validated it. You've filtered the noise. You know who it's for and why they'll pay. Every decision has a paper trail.",
      badge: "Build only after validation",
    },
  ];
  return (
    <div className="bg-white px-10 min-h-screen h-full py-10 justify-center items-center">
      <div className="items-center justify-center w-full">
        <p className="uppercase  tracking-[0.08rem] text-center text-muted-foreground">
          How Sentraea works
        </p>
        <h2 className="font-heading font-medium text-center text-4xl md:text-7xl ">
          Three steps.
          <br />{" "}
          <span className=" text-primary">
            No guessing. No wasted <br /> months.
          </span>
        </h2>
      </div>

      <div className="flex gap-10 justify-center mt-10">
        {steps.map((step, index) => {
          return (
            <Card
              key={index}
              className="px-4 py-4 relative group hover:scale-101 transition-all duration-300"
            >
              <p className="absolute right-4 font-number text-7xl group-hover:opacity-100 group-hover:text-foreground transition-all duration-300   opacity-50 text-muted-foreground/30">
                {index + 1}
              </p>
              <h3 className="text-2xl font-heading font-medium group-hover:text-primary transition-all duration-300">
                {step.title}
              </h3>
              <p className="text-lg text-muted-foreground mt-2">{step.desc}</p>

              <Badge
                variant={"outline"}
                className="rounded-sm border-muted-foreground/5 text-md px-3 py-3 bg-primary/10"
              >
                {step.badge}
              </Badge>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default HowItWorks;
