import React from "react";
import { Card } from "@/components/ui/card";

const STATS = [
  {
    stat: "42%",
    desc: "of startups fail because they build something the market never needed.",
    source: "CB Insights — Startup Failure Post-Mortem Report",
  },
  {
    stat: "74%",
    desc: "of failed tech startups scaled prematurely, before the evidence supported it.",
    source: "Startup Genome — Analysis of 3,200+ startups",
  },
];

const Proofs = () => {
  return (
    <section className="flex flex-col gap-10 py-24 md:py-32">
      <div className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.2em] text-primary font-medium">
          Why This Exists
        </p>
        <h2 className="text-4xl md:text-6xl font-medium tracking-tight md:tracking-[-3px] mt-3 text-balance">
          Most startups don&apos;t die from a bad market. They die from
          building the wrong thing in it.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {STATS.map((item) => (
          <Card
            key={item.stat}
            className="flex flex-col gap-0 px-8 py-8 bg-card/60"
          >
            <span className="font-number text-6xl md:text-7xl font-semibold tracking-tighter text-primary">
              {item.stat}
            </span>
            <p className="text-xl mt-4 tracking-tight text-foreground/90">
              {item.desc}
            </p>
            <span className="text-sm text-muted-foreground italic mt-4">
              {item.source}
            </span>
          </Card>
        ))}
      </div>

      <h3 className="text-xl md:text-2xl font-medium tracking-tight max-w-2xl">
        Sentraea exists so you&apos;re not one of those numbers — every stage
        requires proof before you&apos;re allowed to spend another month
        building.
      </h3>
    </section>
  );
};

export default Proofs;
