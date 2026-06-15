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
      "AI gives 10X the abiltity to build something. But zero additional clarity about what to build.",
    content: (
      <div>
        <Image src={AIShipping} alt="AI-Coding" width={500} />
      </div>
    ),
  },
  {
    title: "Nobody cares about the code.",
    description:
      "Most founders jump from idea to code and only later discover nobody cares. Building the product is the easy part. Building the right product is the hard part.",
    content: (
      <div>
        <Image src={AICoding} alt="AI-Shipping" width={600} />
      </div>
    ),
  },
  {
    title: "Random docs, random decisions.",
    description:
      "Experiments live in random docs, and decisions get made from memory. Without a system of record, your team forgets why things failed.",
    content: (
      <div>
        <Image src={RandomDocs} alt="Random Docs" width={600} />
      </div>
    ),
  },
  {
    title: "Growth is not random tactics.",
    description:
      "Growth becomes a mix of random tactics instead of one clear motion. You need a structured approach to find what actually moves the needle.",
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
        <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter md:tracking-[-5px] text-balance">
          Shipping is easy now.
          <br />{" "}
          <span className="text-primary font-semibold font-heading tracking-tighter md:tracking-[-5px] capitalize">
            Building the right thing isn’t.
          </span>
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl tracking-tighter">
          Sentraea exists to protect your work by forcing your startup through
          the right stages.
        </p>
      </div>

      <div className="mt-15">
        <StickyScroll content={content} />
      </div>
    </div>
  );
};

export default ShippingComponent;
