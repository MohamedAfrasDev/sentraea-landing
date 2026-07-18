"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Container, Section, SectionHeading } from "../shared/section";
import { Reveal } from "../shared/reveal";
import { ContinuityMemoryMiniCard } from "@/app/components/mockups/continuity-memory-mini-card";

const FAQS = [
  {
    question: "How is this different from ChatGPT?",
    answer:
      "ChatGPT answers the questions you think to ask. Sentraea works from your actual business context — your metrics, stage, ICP, and past experiments — and proactively tells you where the bottleneck is and what to do about it. It's a structured weekly decision system, not a chat window.",
  },
  {
    question: "Will Sentraea make decisions for me?",
    answer:
      "No. Sentraea suggests, you decide. Every week it gives you one recommended move with the reasoning and the data behind it, plus what to ignore. You stay in full control of what actually gets done.",
  },
  {
    question: "What data do I need?",
    answer:
      "The basics that describe your week: MRR, customer count, and funnel signals like demo or trial conversion. Connect tools like Stripe, HubSpot, or Segment — or simply upload a short weekly snapshot by hand. Manual input is fully supported.",
  },
  {
    question: "Which SaaS stage does it support?",
    answer:
      "Sentraea is built for founder-led B2B SaaS between first customers and repeatable growth — roughly 1–200 customers and $1k–50k MRR. If you're pre-idea or already running a large executive team, it's probably not the right fit yet.",
  },
  {
    question: "How much will it cost?",
    answer:
      "Pricing isn't final yet. Early access founders get hands-on support, help shape the roadmap, and lock in founding pricing before public launch.",
  },
] as const;

function FaqItem({
  question,
  answer,
  open,
  onToggle,
  index,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
  index: number;
}) {
  const contentId = `faq-answer-${index}`;

  return (
    <div
      className={cn(
        "rounded-md border transition-all duration-300",
        open
          ? "border-primary/10 bg-white shadow-[0_16px_44px_-24px_rgba(30,58,138,0.25)]"
          : "border-black/5 bg-white/60 hover:border-black/5",
      )}
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={contentId}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-heading text-base font-medium tracking-tight text-foreground md:text-[17px]">
          {question}
        </span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform duration-300",
            open && "rotate-180 text-primary",
          )}
          aria-hidden
        />
      </button>
      <div
        id={contentId}
        role="region"
        aria-label={question}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-[15px] leading-relaxed text-muted-foreground">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq">
      <Container className="max-w-3xl">
        <div className="items-center text-center">
          <p className="uppercase font-number text-primary">FAQ</p>

          <h2 className=" text-4xl md:text-[3.5rem] font-medium bg-linear-to-r bg-clip-text text-transparent from-foreground/80 via-orange-900/80  to-orange-600/60 font-heading tracking-[-2px] md:tracking-[-3px]">
            Questions, answered
          </h2>
        </div>

        <div className="mt-10 flex flex-col gap-3">
          {FAQS.map(({ question, answer }, i) => (
            <Reveal key={question} delay={0.05 * i}>
              <FaqItem
                question={question}
                answer={answer}
                index={i}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
