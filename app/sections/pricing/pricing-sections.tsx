"use client";

import React from "react";
import { Check, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import PricingCard from "./components/pricing-card";
import AddOnsCard from "./components/add-ons-card";

const features = [
  {
    name: "Startup Workspaces",
    validation: "1 Workspace",
    execution: "1 Workspace",
    portfolio: "Unlimited",
  },
  {
    name: "Core Ideation & Validation",
    validation: true,
    execution: true,
    portfolio: true,
  },
  {
    name: "Full access to all 4 stages",
    validation: false,
    execution: true,
    portfolio: true,
  },
  {
    name: "Basic workspace overview",
    validation: true,
    execution: true,
    portfolio: true,
  },
  {
    name: "Advanced shared overview",
    validation: false,
    execution: true,
    portfolio: true,
  },
  {
    name: "Unlimited execution flows",
    validation: false,
    execution: true,
    portfolio: true,
  },
  {
    name: "Multi-team stage tracking",
    validation: false,
    execution: false,
    portfolio: true,
  },
  {
    name: "Custom execution templates",
    validation: false,
    execution: false,
    portfolio: true,
  },
  {
    name: "Community access",
    validation: true,
    execution: true,
    portfolio: true,
  },
  {
    name: "Priority support",
    validation: false,
    execution: true,
    portfolio: true,
  },
  {
    name: "Dedicated success manager",
    validation: false,
    execution: false,
    portfolio: true,
  },
];

const renderValue = (value: string | boolean, highlight: boolean = false) => {
  if (typeof value === "boolean") {
    if (value) {
      return (
        <Check
          className={`w-5 h-5 ${highlight ? "text-primary" : "text-foreground"}`}
        />
      );
    }
    return <Minus className="w-5 h-5 text-muted-foreground/30" />;
  }
  return (
    <span
      className={`${highlight ? "text-foreground font-medium" : "text-muted-foreground"}`}
    >
      {value}
    </span>
  );
};

const PricingSections = () => {
  return (
    <section
      id="pricing"
      className="relative w-full py-20  bg-primary/5 text-center"
    >
      <div className="mx-auto px-20">
        {/* Header */}
        <div className="max-w-screen text-center w-full mx-auto">
          <h2 className="text-5xl md:text-7xl font-medium tracking-[-3px] text-balance text-foreground">
            Priced for{" "}
            <span className="font-heading text-primary">Execution.</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mt-6 min-w-8xl max-w-8xl leading-relaxed tracking-tight">
            Sentraea is structured around your startup workspace. You don&apos;t
            pay per generic seat—you pay for the execution depth required to
            move through the four disciplined stages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-0 mt-10">
          <PricingCard
            name={"Free"}
            value={"0"}
            yearlyValue={"0"}
            subTitle={"New founders testing the product"}
            featured={false}
            features={[
              "1 workspace",
              "Stage 1 lite",
              "Limited AI runs",
              "Limited knowledge uploads",
              "No advanced background processing",
            ]}
            btnText="Start for Free"
            variant="outline"
            className="pr-8"
          />

          <PricingCard
            name={"Pro"}
            value={"49"}
            yearlyValue={"490"}
            subTitle={"One founder validating and shaping a startup"}
            featured={true}
            features={[
              "1 workspace",
              "Full Stage 1 + Stage 2",
              "Light Stage 3 tracking",
              "Generous monthly AI credits",
              "Knowledge base",
              "Workspace subdomain",
              "Basic exports",
            ]}
            btnText="Upgrade now"
            variant="default"
          />

          <PricingCard
            name={"Growth"}
            value={"149"}
            yearlyValue={"599"}
            subTitle={"Founders actively executing and iterating"}
            featured={false}
            features={[
              "Up to 3 workspaces",
              "Full Stage 1–4 access",
              "Higher AI/search credits",
              "Background workflows",
              "Richer tracking",
              "DM/social signal processing",
              "Priority processing",
            ]}
            btnText="Upgrade now"
            variant="default"
            className="rounded-r-none pl-8"
          />
          <PricingCard
            name={"Team"}
            value={"399"}
            yearlyValue={"999"}
            subTitle={
              "Venture studios, multi-product founders, small startup teams"
            }
            featured={false}
            features={[
              "Up to 10 workspaces",
              "Full Stage 1–4 access",
              "Team seats",
              "Highest AI/workflow limits, advanced analytics",
              "Priority support",
              "Admin controls",
            ]}
            btnText="Upgrade now"
            variant="default"
            className="rounded-l-none"
          />
        </div>
      </div>
    </section>
  );
};

export default PricingSections;
