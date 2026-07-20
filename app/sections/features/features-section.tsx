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
const FeautureSection = () => {
  const feat2 = [
    {
      title: "Demo-to-close rate",
      value: "-14 pts",
      icon: Hubspot,
    },
    {
      title: "Organic sessions",
      value: "+18%",
      icon: Plausible,
    },
    {
      title: "New MRR",
      value: "+$1,620",
      icon: Stripe,
    },
    {
      title: "Objection theme detected",
      value: "+1",
      icon: Intercome,
    },
  ];
  const feat3 = [
    {
      title: "Demand",
      stage: "Healthy",
      label: "+16% w/w",
    },
    {
      title: "Activation",
      stage: "Stable",
      label: "38% reach first report",
    },
    {
      title: "Conversion",
      stage: "Attention",
      label: "Demo-to-close 14%",
    },
    {
      title: "Retention",
      stage: "Stable",
      label: "Churn 2.1%",
    },
    {
      title: "Expansion",
      stage: "Quit",
      label: " MRR 104% ",
    },
  ];

  const feat4 = [
    {
      title: "Evidence 1",
      icon: Hubspot,
      value: "Demo-to-close dropped 28% → 14%",
    },
    {
      title: "Evidence 2",
      icon: Intercome,
      value: "34% of lost deals mentioned pricing objections",
    },
    {
      title: "Evidence 3",
      icon: Plausible,
      value: "Organic traffic up 18% but conversion flat",
    },
  ];
  const features = [
    {
      label: "Weekly Leverage Brief",
      title: "Know the one move that matters this week.",
      desc: "Sentraea cuts through scattered signals and gives you one clear priority backed by real business context.",
      img: Feat1,
      widget: (
        <div className="relative pl-5 pt-5">
          <Card className="px-4 py-3 relative min-w-[350px] bg-card/70 w-full">
            <div className="flex justify-between items-center">
              <h3 className="tracking-tight">Monday Founder Brief</h3>
              <p className="font-number text-muted-foreground">Week 12</p>
            </div>
            <div>
              <h4 className="font-medium text-md">This week's bottleneck</h4>
              <p className="text-xl font-bold font-heading text-transparent bg-linear-to-r bg-clip-text from-foreground via-blue-300 to-blue-400">
                Conversion
              </p>
            </div>
            <Card className="px-3 py-2 bg-card/10 gap-0">
              <h4 className="font-medium text-md">One Highest-Leverage Move</h4>
              <p className="text-xl font-bold font-heading tracking-tight text-transparent bg-linear-to-r bg-clip-text from-primary via-primary/70 to-blue-800">
                Rewrite demo flow for ICP X
              </p>
            </Card>
            <div>
              <h4 className="font-medium text-md">Why This Matters:</h4>
              <p className="font-medium font-heading text-base w-fit text-foreground">
                Demo-to-close rate dropped from <br />
                <span className="text-transparent bg-linear-to-r bg-clip-text from-foreground via-blue-300 to-blue-400">
                  {" "}
                  28% → 14%
                </span>
              </p>
            </div>
            <div className="flex gap-5">
              <Button>Open this week's brief</Button>
              <Button variant={"outline_without_border"}>
                View live signal
              </Button>
            </div>
          </Card>
        </div>
      ),
    },
    {
      label: "Cross-Tool Signals",
      title: "Read your whole stack in one place.",
      desc: "Sentraea watches the tools you already use and pulls the signals that actually affect growth.",
      img: Feat3,
      widget: (
        <div className="relative pr-5 pt-0">
          <Card className="px-4 py-4 relative min-w-[370px] bg-card/70 w-full">
            <div className="flex justify-between items-center">
              <h3 className="tracking-tight text-xl font-medium">
                Live Signal
              </h3>
              <span className="flex gap-2 items-center">
                <div className="h-2 animate-pulse bg-emerald-500 rounded-full w-2" />
                <p className="font-number text-muted-foreground text-xs">
                  Synced 9 min ago
                </p>
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {feat2.map((data, index) => {
                return (
                  <div
                    key={index}
                    className="flex justify-between items-center w-full"
                  >
                    <span className="flex gap-1 items-start w-full">
                      <ArrowRight className="mt-1" size={15} />
                      <div className="text-start">
                        <p className="font- text-lg">{data.title}</p>
                        <Image
                          src={data.icon}
                          alt={data.title}
                          width={60}
                          height={20}
                        />
                      </div>
                    </span>

                    <span
                      className={cn(
                        "text-end text-lg font-medium",
                        data.value.includes("-")
                          ? "text-red-500"
                          : "text-emerald-500",
                      )}
                    >
                      {data.value}
                    </span>
                  </div>
                );
              })}

              <Button
                variant={"outline_without_border"}
                className={"w-fit mt-3"}
              >
                View All Signals
              </Button>
            </div>
          </Card>
        </div>
      ),
    },
    {
      label: "Bottleneck Diagnosis",
      title: "See where growth is stuck right now.",
      desc: "It identifies the active constraint across your funnel so you stop working on the wrong problem.",
      img: Feat2,
      widget: (
        <div className="relative pr-5 pt-0">
          <Card className="px-4 py-4 relative min-w-[370px] bg-card/70 w-full">
            <div className="flex justify-between items-center">
              <h3 className="tracking-tight text-xl font-medium">
                Growth Stage Health
              </h3>
            </div>
            <div className="flex flex-col gap-3">
              {feat3.map((data, index) => {
                return (
                  <div
                    key={index}
                    className="flex justify-between items-center w-full"
                  >
                    <p className="w-full">{data.title}</p>
                    <p className="w-full text-start">{data.stage}</p>
                    <p className="w-full text-end">{data.label}</p>
                  </div>
                );
              })}
              <Card className="px-2 py-2 gap-0 bg-card/30">
                <p className="text-transparent text-lg font-medium bg-linear-to-r bg-clip-text from-foreground via-blue-500 to-blue-800">
                  Active Bottleneck: Conversion
                </p>
                <span className="flex items-center gap-1 text-primary">
                  View full diagnosis
                  <ArrowRight size={15} />
                </span>
              </Card>
            </div>
          </Card>
        </div>
      ),
    },
    {
      label: "Reasoning + Source Trail",
      title: "See exactly why it made the call.",
      desc: "Every weekly move includes the reasoning behind it and the data sources that support it.",
      img: Feat4,
      widget: (
        <div className="relative pl-0 pt-2">
          <Card className="px-4 py-3 relative min-w-[350px] bg-card/70 w-full">
            <div className="flex justify-between items-center">
              <h3 className="tracking-tight font-medium text-xl">
                Why This Move?
              </h3>
            </div>
            <div className="flex flex-col gap-3">
              {feat4.map((fd, index) => {
                return (
                  <div key={index}>
                    <div>
                      <p>{fd.title}</p>
                      <div className="flex items-center gap-5">
                        <Image src={fd.icon} alt={fd.title} width={50} />
                        <p>{fd.value}</p>
                        {index == 0 && <Sparkles size={15} />}
                      </div>
                    </div>
                  </div>
                );
              })}

              <Button>View full source trail</Button>
            </div>
          </Card>
        </div>
      ),
    },
  ];
  return (
    <section className="px-10 py-10 relative">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#cacccf_1px,transparent_1px)] bg-size-[20px_20px] dark:bg-[radial-gradient(#4f5052_1px,transparent_1px)] opacity-70 mask-[radial-gradient(ellipse_60%_30%_at_50%_50%,#000_60%,transparent_100%)]" />

      <div className="flex flex-col gap-70 px-20 relative">
        {features.map((feat, index) => {
          return (
            <div key={index} className="flex w-full gap-20 justify-between">
              <div
                className={cn(
                  "min-w-[320px] relative",
                  index % 2 != 0 ? "block" : "hidden",
                )}
              >
                <Image
                  src={feat.img}
                  alt={feat.title}
                  width={1000}
                  height={1000}
                  className="min-w-[380px]  rounded-md absolute "
                />
                {feat.widget}
              </div>
              <div className="flex-3">
                <p className="text-primary font-number text-lg uppercase">
                  {feat.label}
                </p>
                <h3 className="text-5xl font-medium text-transparent bg-linear-to-br bg-clip-text from-foreground/70 tracking-tight via-blue-950/80 to-blue-800/90">
                  {feat.title}
                </h3>
                <h4 className="text-xl mt-2 text-muted-foreground">
                  {feat.desc}
                </h4>
              </div>
              <div
                className={cn(
                  "min-w-[320px] relative",
                  index % 2 == 0 ? "block" : "hidden",
                )}
              >
                <Image
                  src={feat.img}
                  alt={feat.title}
                  width={1000}
                  height={1000}
                  className="min-w-[360px] rounded-md absolute"
                />
                {feat.widget}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeautureSection;
