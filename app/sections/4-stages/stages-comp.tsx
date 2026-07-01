"use client";

import React from "react";
import { motion } from "framer-motion";

const SYMPTOMS = [
  "You're building before you've proven anyone wants it.",
  "You don't know if the right move is to pivot, wait, validate, or build.",
  "A competitor launches and your roadmap changes out of panic, not evidence.",
  "Every “next step” is a guess dressed up as a decision.",
];

const FourStagesSection = () => {
  return (
    <section className="flex flex-col w-full items-start text-start gap-14 py-24 md:py-32">
      <div className="max-w-4xl">
        <p className="text-sm uppercase tracking-[0.2em] text-primary font-medium">
          The Problem
        </p>
        <h2 className="text-4xl md:text-7xl tracking-tight md:tracking-[-3px] font-medium mt-3 text-balance">
          Most solo founders don&apos;t fail because of a bad idea.
        </h2>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 max-w-6xl">
        {SYMPTOMS.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="flex items-start gap-5 border-t border-border pt-5"
          >
            <span className="font-number text-muted-foreground/50 text-xl tracking-tighter">
              0{i + 1}
            </span>
            <p className="text-xl md:text-2xl tracking-tight text-foreground/90">
              {line}
            </p>
          </motion.div>
        ))}
      </div>

      <h3 className="text-2xl md:text-4xl font-medium tracking-tight max-w-3xl">
        That&apos;s not bad luck.{" "}
        <span className="text-primary">That&apos;s a missing system.</span>
      </h3>
    </section>
  );
};

export default FourStagesSection;
