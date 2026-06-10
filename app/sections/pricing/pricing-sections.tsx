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
          <h2 className="text-5xl md:text-7xl font-semibold tracking-[-5px] text-balance text-foreground">
            Priced for{" "}
            <span className="font-heading text-primary">Execution.</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mt-6 min-w-8xl max-w-8xl leading-relaxed tracking-tighter">
            Sentraea is structured around your startup workspace. You don&apos;t
            pay per generic seat—you pay for the execution depth required to
            move through the four disciplined stages.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-0 mt-10">
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

        {/* <div className="w-full mt-16 overflow-x-auto md:overflow-visible pb-8">
          <Card className="min-w-[800px] w-full bg-card/60  p-8 md:p-12 border border-border shadow-2xl overflow-visible">
            <div className="grid grid-cols-5 gap-6 pb-8 sticky top-[80px] bg-transparent backdrop-blur-2xl z-20 pt-8 -mt-8 md:pt-12 md:-mt-12">
              <div className="flex items-end pb-2">
                <h3 className="text-4xl tracking-tighter font-medium text-foreground">
                  Pricing
                </h3>
              </div>

              <div className="flex flex-col pr-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-3xl font-semibold font-heading text-foreground">
                    Free
                  </h3>
                </div>

                <Button variant="outline_without_border" className="mt-4">
                  Start for free
                </Button>
              </div>

              <div className="flex flex-col pr-4 relative">
                <div className="flex justify-between">
                  <h3 className="text-3xl font-semibold font-heading text-foreground">
                    Pro
                  </h3>
                  <div className="font-number">
                    <span className="text-3xl font-semibold tracking-tight text-foreground">
                      $49
                    </span>
                    <span className="text-muted-foreground text-sm ml-1">
                      /mo
                    </span>
                  </div>
                </div>

                <Button className={"mt-4"}>Upgrade Now</Button>
              </div>

              <div className="flex flex-col pr-4 relative">
                <div className="flex justify-between">
                  <h3 className="text-3xl font-semibold font-heading text-foreground">
                    Growth
                  </h3>
                  <div className="font-number">
                    <span className="text-3xl font-semibold tracking-tight text-foreground">
                      $149
                    </span>
                    <span className="text-muted-foreground text-sm ml-1">
                      /mo
                    </span>
                  </div>
                </div>

                <Button className={"mt-4"}>Upgrade Now</Button>
              </div>
              <div className="flex flex-col pr-4 relative">
                <div className="flex justify-between">
                  <h3 className="text-3xl font-semibold font-heading text-foreground">
                    Team
                  </h3>
                  <div className="font-number">
                    <span className="text-3xl font-semibold tracking-tight text-foreground">
                      $399
                    </span>
                    <span className="text-muted-foreground text-sm ml-1">
                      /mo
                    </span>
                  </div>
                </div>

                <Button className={"mt-4"}>Upgrade Now</Button>
              </div>
            </div>

            <div className="flex flex-col">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-4 gap-6 py-5 border-b border-border/40 items-center hover:bg-muted/20 transition-colors rounded-lg px-2 -mx-2"
                >
                  <div className="text-sm font-medium text-foreground pr-4">
                    {feature.name}
                  </div>
                  <div className="flex justify-start text-sm">
                    {renderValue(feature.validation)}
                  </div>
                  <div className="flex justify-start text-sm">
                    {renderValue(feature.execution, true)}
                  </div>
                  <div className="flex justify-start text-sm">
                    {renderValue(feature.portfolio)}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div> */}

        {/* <div className="mt-24 pt-12 border-t border-border/50 grid md:grid-cols-2 gap-12 lg:gap-24">
          <div>
            <h4 className="text-lg font-medium text-foreground">
              Do you charge per seat?
            </h4>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              No. Execution requires alignment across your entire team. We
              charge based on the depth of the tools you need, and every plan
              includes unlimited seats for your workspace.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-medium text-foreground">
              Can I switch plans later?
            </h4>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Yes, you can upgrade or downgrade your workspace execution depth
              at any time. Changes take effect immediately and are prorated.
            </p>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default PricingSections;
