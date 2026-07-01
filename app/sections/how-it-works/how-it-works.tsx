"use client";

import React from "react";
import { motion } from "framer-motion";
import { Lock, Unlock } from "lucide-react";

const STEPS = [
  {
    number: "01",
    title: "Get your playbook",
    description:
      "Answer a few questions about your startup and get assigned the stage you're actually in — not the stage you wish you were in.",
  },
  {
    number: "02",
    title: "Execute with evidence gates",
    description:
      "Work through the tasks for your stage. Each one asks for proof — a conversation, a signup, a real test — before it counts as done.",
  },
  {
    number: "03",
    title: "Build in the right direction",
    description:
      "The next stage only unlocks once the evidence is in. You always know your next move, and it's always backed by something real.",
  },
];

const HowItWorks = () => {
  return (
    <section className="flex flex-col py-24 md:py-32">
      <p className="text-sm uppercase tracking-[0.2em] text-primary font-medium">
        How It Works
      </p>
      <h2 className="text-4xl md:text-6xl font-medium tracking-tight md:tracking-[-3px] mt-3 max-w-3xl">
        Three steps. No guessing.
      </h2>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-14 relative">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative flex flex-col"
          >
            <div className="flex items-center gap-3">
              <span className="font-number text-3xl text-muted-foreground/40 tracking-tighter">
                {step.number}
              </span>
              <div className="h-px flex-1 bg-border hidden md:block" />
              {i < STEPS.length - 1 ? (
                <Lock className="w-4 h-4 text-muted-foreground/40 shrink-0 hidden md:block" />
              ) : (
                <Unlock className="w-4 h-4 text-primary shrink-0 hidden md:block" />
              )}
            </div>
            <h3 className="text-2xl md:text-3xl font-medium tracking-tight mt-4">
              {step.title}
            </h3>
            <p className="text-muted-foreground mt-3 tracking-tight leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
