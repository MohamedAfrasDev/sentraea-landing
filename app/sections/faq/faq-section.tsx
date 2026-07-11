"use client";

import React, { useState } from "react";

/* ---------------------------------------------------------------- */
/*  Content                                                          */
/* ---------------------------------------------------------------- */

const FAQS = [
  {
    q: "Is Sentraea a founder chatbot?",
    a: "No. It is a weekly founder operating system built to identify one next move, explain it, and reduce the execution burden around it.",
  },
  {
    q: "What makes it different from ChatGPT or Claude?",
    a: "General AI tools answer prompts. Sentraea runs a weekly loop using founder context, market research, recommendation logic, and small execution workflows.",
  },
  {
    q: "Do I need to connect tools?",
    a: "No. You can start from a raw idea and basic founder context, then connect tools later.",
  },
  {
    q: "Does it make decisions for me automatically?",
    a: "It recommends the next highest-leverage move and can handle small reversible tasks around it, while leaving major strategic judgment with the founder.",
  },
  {
    q: "Why weekly?",
    a: "Because startup momentum is shaped week by week. Sentraea is designed around the real cadence where focus, execution, and market reality need to come together.",
  },
];

/* thin plus that rotates into a cross-free minus state */
function TogglePlus({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4 shrink-0 text-neutral-400 transition-transform duration-300"
      aria-hidden="true"
    >
      <path
        d="M3.5 10h13"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M10 3.5v13"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        className="origin-center transition-all duration-300"
        style={{ opacity: open ? 0 : 1, transform: open ? "rotate(90deg)" : "none" }}
      />
    </svg>
  );
}

/* ---------------------------------------------------------------- */
/*  Section                                                          */
/* ---------------------------------------------------------------- */

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white">
      <div className="mx-auto max-w-3xl px-6 py-32">
        {/* header */}
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
          FAQ
        </p>
        <h2 className="mb-3 font-heading text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
          Common questions
        </h2>
        <p className="mb-12 text-base leading-relaxed text-neutral-500">
          The short version: not a chatbot, not a dashboard — a weekly
          operating rhythm.
        </p>

        {/* accordion stack */}
        <div className="border-t border-black/[0.06]">
          {FAQS.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={item.q} className="border-b border-black/[0.06]">
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  className="group -mx-3 flex w-[calc(100%+1.5rem)] items-center justify-between gap-6 rounded-lg px-3 py-6 text-left transition-colors hover:bg-neutral-50/80"
                >
                  <span
                    className={`text-base font-medium transition-colors duration-200 ${
                      open
                        ? "text-neutral-900"
                        : "text-neutral-700 group-hover:text-neutral-900"
                    }`}
                  >
                    {item.q}
                  </span>
                  <TogglePlus open={open} />
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-xl pb-7 text-[15px] leading-relaxed text-neutral-500">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
