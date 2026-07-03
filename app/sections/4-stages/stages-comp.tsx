"use client";

import React from "react";
import { motion } from "framer-motion";

import BusinessFailure from "@/public/illustrations/BusinessFailure.svg";
import BusinessDecision from "@/public/illustrations/BusinessDecisons.svg";
import BusinessCompetition from "@/public/illustrations/Business competition-bro.svg";
import Image from "next/image";

const SYMPTOMS = [
  "You're building before you've proven anyone wants it.",
  "You don't know if the right move is to pivot, wait, validate, or build.",
  "A competitor launches and your roadmap changes out of panic, not evidence.",
  "Every “next step” is a guess dressed up as a decision.",
];

const images = [
  BusinessFailure,
  BusinessDecision,
  BusinessCompetition,
  BusinessFailure,
];

const FourStagesSection = () => {
  return (
    <section className="flex flex-col w-full items-start text-start gap-14 min-h-screen justify-center">
      <div className="max-w-4xl">
        <p className="text-sm font-number uppercase tracking-[0.2em] text-primary font-medium">
          The Problem
        </p>
        <h2 className="text-4xl md:text-7xl font-manrope  font-semibold tracking-tight md:tracking-[-3px] mt-3 text-balance">
          Most solo founders don&apos;t fail because of a bad idea.
        </h2>
      </div>

      <div className="w-full flex flex-col">
        {SYMPTOMS.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="flex items-start gap-5  pt-5"
          >
            <span className="font-number  text-9xl tracking-tighter">
              {i + 1}
            </span>
            <Image
              className="w-[300px]"
              src={images[i]}
              alt={line}
              width={1000}
              height={1000}
            />
            <p className="text-xl md:text-6xl tracking-tighter text-foreground/90">
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
