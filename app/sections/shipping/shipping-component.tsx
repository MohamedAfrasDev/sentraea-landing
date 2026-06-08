import { Card } from "@/components/ui/card";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { Rocket, LightbulbOff, Files, TrendingDown } from "lucide-react";
import React from "react";

import AIShipping from "@/public/illustrations/nobody-cares-code.jpg";
import AICoding from "@/public/illustrations/ai-shipping.jpg";
import RandomDocs from "@/public/illustrations/random-docs.jpg";

import GrowthImage from "@/public/illustrations/growth.jpg";

import Image from "next/image";

const content = [
  {
    title: "AI made shipping faster.",
    description:
      "But it also made fake validation easier. Now everyone can ship an MVP in a weekend, making it harder to stand out and find real signal.",
    content: (
      <div>
        <Image src={AICoding} alt="AI-Coding" width={700} />
      </div>
    ),
  },
  {
    title: "Nobody cares about the code.",
    description:
      "Most founders jump from idea to code and only later discover nobody cares. Building the product is the easy part. Building the right product is the hard part.",
    content: (
      <div>
        <Image src={AIShipping} alt="AI-Shipping" width={700} />
      </div>
    ),
  },
  {
    title: "Random docs, random decisions.",
    description:
      "Experiments live in random docs, and decisions get made from memory. Without a system of record, your team forgets why things failed.",
    content: (
      <div>
        <Image src={RandomDocs} alt="Random Docs" width={700} />
      </div>
    ),
  },
  {
    title: "Growth is not random tactics.",
    description:
      "Growth becomes a mix of random tactics instead of one clear motion. You need a structured approach to find what actually moves the needle.",
    content: (
      <div>
        <Image src={GrowthImage} alt="Growth Image" width={700} />
      </div>
    ),
  },
];

const ShippingComponent = () => {
  return (
    <div className="relative   ">
      <div className=" ">
        <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter text-balance">
          Shipping is easy now.
          <br />{" "}
          <span className="text-primary font-semibold font-heading tracking-tight capitalize">
            Building the right thing isn’t.
          </span>
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl">
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
