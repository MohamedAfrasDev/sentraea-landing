import { Card } from "@/components/ui/card";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { Rocket, LightbulbOff, Files, TrendingDown } from "lucide-react";
import React, { useEffect, useRef } from "react";

import AIShipping from "@/public/illustrations/ai-shipping-3.svg";
import AICoding from "@/public/illustrations/ai-coding-2.svg";
import RandomDocs from "@/public/illustrations/random-docs-3.svg";

import GrowthImage from "@/public/illustrations/growth-scale.svg";

import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const content = [
  {
    title: "AI made shipping faster.",
    description:
      "You can ship 10x faster now. That just means you can build the wrong thing 10x faster too.",
    content: (
      <div>
        <Image src={AIShipping} alt="AI-Coding" width={500} />
      </div>
    ),
  },
  {
    title: "Nobody cares about the code.",
    description:
      "Most founders jump from idea to code and find out months later nobody wanted it. Building the product is the easy part. Building the right product is the hard part.",
    content: (
      <div>
        <Image src={AICoding} alt="AI-Shipping" width={600} />
      </div>
    ),
  },
  {
    title: "Random docs, random decisions.",
    description:
      "Your experiments live in scattered docs and your decisions live in memory. When something fails, you can't tell if it was a bad idea or bad timing — so you can't avoid it next time.",
    content: (
      <div>
        <Image src={RandomDocs} alt="Random Docs" width={600} />
      </div>
    ),
  },
  {
    title: "False urgency, real damage.",
    description:
      "A competitor launches, raises a round, or posts a big number — and suddenly your roadmap changes out of fear, not evidence. Most pivots aren't bad instincts. They're panic wearing a strategy costume.",
    content: (
      <div>
        <Image src={GrowthImage} alt="Growth Image" width={500} />
      </div>
    ),
  },
];

const ShippingComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "bottom bottom", // Pin when the bottom of this section hits the bottom of the viewport
        end: "max", // Stay pinned until the page ends
        pin: true,
        pinSpacing: false, // Don't add padding below, allowing the next section to overlap
        invalidateOnRefresh: true,
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative bg-white px-20 pt-20 pb-20">
      <div className=" ">
        <p className="text-sm uppercase tracking-[0.2em] text-primary font-medium">
          The Cost
        </p>
        <h2 className="text-5xl md:text-7xl font-medium tracking-tighter md:tracking-[-3px] text-balance mt-3">
          Shipping is easy now.
          <br />{" "}
          <span className="text-primary font-medium font-heading tracking-tighter md:tracking-[-5px] capitalize">
            Building the right thing isn’t.
          </span>
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl tracking-tight">
          Without a system, every one of these compounds into wasted months,
          burned runway, and a product nobody asked for.
        </p>
      </div>

      <div className="mt-15">
        <StickyScroll content={content} />
      </div>
    </div>
  );
};

export default ShippingComponent;
