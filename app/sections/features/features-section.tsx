import { cn } from "@/lib/utils";
import React from "react";
import Feat1 from "@/public/features/feat1.jpg";
import Feat2 from "@/public/features/feat5.jpg";
import Feat3 from "@/public/features/feat3.jpg";
import Feat4 from "@/public/features/feat4.jpg";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Hubspot from "@/public/connectors/hubspot.svg";
import Plausible from "@/public/connectors/plausible_logo.svg";
import Stripe from "@/public/connectors/stripe-ar21.svg";
import Intercome from "@/public/connectors/Intercom_idJ9ed9vTR_0.svg";
import { ArrowRight, Sparkle, Sparkles } from "lucide-react";
import Feature1 from "./components/feature-1";
import Feature2 from "./components/feature-2";
import Feature3 from "./components/feature-3";
import Feature4 from "./components/feature-4";
const FeautureSection = () => {
  const features = [
    {
      label: "Weekly Leverage Brief",
      title: "Know the one move that matters this week.",
      desc: "Sentraea cuts through scattered signals and gives you one clear priority backed by real business context.",
      img: Feat1,
      widget: <Feature1 />,
    },
    {
      label: "Cross-Tool Signals",
      title: "Read your whole stack in one place.",
      desc: "Sentraea watches the tools you already use and pulls the signals that actually affect growth.",
      img: Feat3,
      widget: <Feature2 />,
    },
    {
      label: "Bottleneck Diagnosis",
      title: "See where growth is stuck right now.",
      desc: "It identifies the active constraint across your funnel so you stop working on the wrong problem.",
      img: Feat2,
      widget: <Feature3 />,
    },
    {
      label: "Reasoning + Source Trail",
      title: "See exactly why it made the call.",
      desc: "Every weekly move includes the reasoning behind it and the data sources that support it.",
      img: Feat4,
      widget: <Feature4 />,
    },
  ];
  return (
    <section className="px-10 py-10 relative">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#cacccf_1px,transparent_1px)] bg-size-[20px_20px] dark:bg-[radial-gradient(#4f5052_1px,transparent_1px)] opacity-70 mask-[radial-gradient(ellipse_60%_30%_at_50%_50%,#000_60%,transparent_100%)]" />

      <div className="hidden md:flex flex-col gap-40 px-20 relative">
        {features.map((feat, index) => {
          return (
            <div
              key={index}
              className="flex flex-col md:flex-row w-full gap-20 justify-between"
            >
              <div className={cn("", index % 2 != 0 ? "block " : "hidden")}>
                {feat.widget}
              </div>
              <div className="flex-3">
                <p className="text-primary font-number text-lg uppercase">
                  {feat.label}
                </p>
                <h3 className="text-6xl font-medium text-transparent bg-linear-to-br bg-clip-text from-foreground/70 tracking-tight via-blue-950/80 to-blue-800/90">
                  {feat.title}
                </h3>
                <h4 className="text-xl mt-2 text-muted-foreground">
                  {feat.desc}
                </h4>
              </div>
              <div className="hidden md:block">
                <div className={cn("", index % 2 == 0 ? "block" : "hidden")}>
                  {feat.widget}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex-col gap-40 px- relative flex md:hidden">
        {features.map((feat, index) => {
          return (
            <div
              key={index}
              className="flex flex-col md:flex-row w-full gap-5 justify-between"
            >
              <div className="flex-3">
                <p className="text-primary font-number text-sm uppercase">
                  {feat.label}
                </p>
                <h3 className="text-3xl font-medium text-transparent bg-linear-to-br bg-clip-text from-foreground/70 tracking-tight via-blue-950/80 to-blue-800/90">
                  {feat.title}
                </h3>
                <h4 className="text-md mt-2 text-muted-foreground">
                  {feat.desc}
                </h4>
              </div>
              {feat.widget}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeautureSection;
