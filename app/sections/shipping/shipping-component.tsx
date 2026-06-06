import { Card } from "@/components/ui/card";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { Rocket, LightbulbOff, Files, TrendingDown } from "lucide-react";
import React from "react";

const content = [
  {
    title: "AI made shipping faster.",
    description:
      "But it also made fake validation easier. Now everyone can ship an MVP in a weekend, making it harder to stand out and find real signal.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white rounded-2xl shadow-2xl overflow-hidden relative">
        <Rocket className="w-32 h-32 opacity-80" />
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
      </div>
    ),
  },
  {
    title: "Nobody cares about the code.",
    description:
      "Most founders jump from idea to code and only later discover nobody cares. Building the product is the easy part. Building the right product is the hard part.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--pink-500),var(--indigo-500))] flex items-center justify-center text-white rounded-2xl shadow-2xl overflow-hidden relative">
        <LightbulbOff className="w-32 h-32 opacity-80" />
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
      </div>
    ),
  },
  {
    title: "Random docs, random decisions.",
    description:
      "Experiments live in random docs, and decisions get made from memory. Without a system of record, your team forgets why things failed.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white rounded-2xl shadow-2xl overflow-hidden relative">
        <Files className="w-32 h-32 opacity-80" />
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
      </div>
    ),
  },
  {
    title: "Growth is not random tactics.",
    description:
      "Growth becomes a mix of random tactics instead of one clear motion. You need a structured approach to find what actually moves the needle.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--violet-500),var(--fuchsia-500))] flex items-center justify-center text-white rounded-2xl shadow-2xl overflow-hidden relative">
        <TrendingDown className="w-32 h-32 opacity-80" />
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
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
          <span className="text-primary font-semibold font-number uppercase tracking-tighter">
            Building the right thing isn’t.
          </span>
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl">
          Sentraea exists to protect your work by forcing your startup through
          the right stages.
        </p>
      </div>

      <div className="">
        <StickyScroll content={content} />
      </div>
    </div>
  );
};

export default ShippingComponent;
