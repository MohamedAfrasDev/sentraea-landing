import { Card } from "@/components/ui/card";
import React from "react";

const ExecutionSystem = () => {
  const side_cards = [
    "Not an AI cofounder that does the work",
    "Not a generic productivity or project tool",
    "Not advice that works for everyone equally",
    "Not another framework you'll read and forget",
  ];

  const right_cards = [
    {
      icon: "🗺",
      title: "Stage-gated playbook",
      desc: "You get a personalised execution map. Every stage has required actions. No guessing what comes next.",
    },
    {
      icon: "🔒",
      title: "Evidence gates",
      desc: "Evidence gates Each stage is locked until you submit real evidence — conversations, signals, validation. Assumptions don't count.",
    },
    {
      icon: "📡",
      title: "Signal filtering",
      desc: "Competitor launches, market noise, false urgency — Sentraea helps you interpret signals without spiralling.",
    },
    {
      icon: "🕰",
      title: "Decision history",
      desc: "Every decision you've made is tracked. You can always see why you moved, what evidence you had, and what changed.",
    },
  ];
  return (
    <div className="px-10 min-h-screen h-full py-10 flex flex-col md:flex-row gap-10">
      <div>
        <h2 className="font-heading font-semibold text-4xl md:text-6xl ">
          An execution system.
          <br /> <span className=" text-primary">Not an AI cofounder.</span>
        </h2>
        <p className="text-xl font-muted-foreground mt-5">
          Sentraea doesn't execute tasks for you. It makes sure you're executing
          the right tasks, in the right order, with proof that each one actually
          worked before you move on.
        </p>

        <Card className="mt-10 w-fit px-4 py-4 gap-5">
          {side_cards.map((card, index) => {
            return (
              <div key={index} className="">
                <p className="text-xl text-muted-foreground">
                  <span className="text-red-600 font-medium">✕ </span>
                  {card}
                </p>
              </div>
            );
          })}
        </Card>
      </div>
      <div className="flex flex-col gap-5 ">
        {right_cards.map((card, index) => {
          return (
            <Card
              key={index}
              className="w-fit flex flex-row bg-card/5 px-4 py-4 gap-5"
            >
              <p>{card.icon}</p>
              <div className="">
                <p className="text-xl">{card.title}</p>
                <p className="text-lg text-muted-foreground">{card.desc}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ExecutionSystem;
