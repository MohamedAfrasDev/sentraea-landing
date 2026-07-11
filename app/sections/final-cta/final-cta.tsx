"use client";

import React from "react";
import { Button } from "@/components/ui/button";

function scrollToWaitlist() {
  const target = document.getElementById("waitlist");
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

const FinalCta = () => {
  return (
    <section id="final-cta" className="bg-white px-6">
      <div className="relative mx-auto my-16 max-w-6xl overflow-hidden rounded-[32px] border border-neutral-200/60 bg-white p-12 text-center shadow-sm md:p-20">
        {/* radial glow anchor */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.04)_0%,transparent_70%)]"
          aria-hidden="true"
        />

        <div className="relative">
          <h2 className="mb-4 font-heading text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
            Run your startup week with more clarity.
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-neutral-500 md:text-lg">
            Sentraea helps solo founders decide what matters now, backed by
            evidence and reduced execution overhead.
          </p>

          {/* button cluster */}
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Button
              className="bg-black px-6 py-5 text-base tracking-tight text-white"
              variant="outline"
              onClick={scrollToWaitlist}
            >
              Get early access
            </Button>
            <Button
              className="px-6 py-5 text-base tracking-tight text-neutral-600 hover:text-neutral-900"
              variant="ghost"
              onClick={scrollToWaitlist}
            >
              Join the waitlist
            </Button>
          </div>

          {/* micro-trust flags */}
          <span className="mt-6 block text-xs text-neutral-400">
            Start from a raw idea. Add tools later.
          </span>
          <span className="mt-2 block font-mono text-xs tracking-wide text-neutral-500">
            No bloated setup. No endless chat. One clear weekly move.
          </span>
        </div>
      </div>
    </section>
  );
};

export default FinalCta;
