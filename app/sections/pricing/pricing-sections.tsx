"use client";

import React from "react";
import { Check, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
    <section className="relative w-full   ">
      <div className="mx-auto px-20">
        {/* Header */}
        <div className="max-w-3xl mt-10">
          <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter text-balance text-foreground">
            Priced for{" "}
            <span className="font-heading text-primary">execution</span>.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl leading-relaxed">
            Sentraea is structured around your startup workspace. You don&apos;t
            pay per generic seat—you pay for the execution depth required to
            move through the four disciplined stages.
          </p>
        </div>

        {/* Pricing Table */}
        <div className="w-full mt-16 overflow-x-auto md:overflow-visible pb-8">
          <Card className="min-w-[800px] w-full bg-background rounded-3xl p-8 md:p-12 border border-border shadow-sm">
            {/* Header Row */}
            <div className="grid grid-cols-4 gap-6 pb-8 border-b border-border sticky top-[80px] bg-background z-20 pt-8 -mt-8 md:pt-12 md:-mt-12">
              <div className="flex items-end pb-2">
                <h3 className="text-xl font-medium text-foreground">
                  Features
                </h3>
              </div>

              {/* Validation */}
              <div className="flex flex-col pr-4">
                <h3 className="text-xl font-medium text-foreground">
                  Validation
                </h3>
                <div className="mt-4">
                  <span className="text-4xl font-semibold tracking-tight text-foreground">
                    $0
                  </span>
                  <span className="text-muted-foreground text-sm ml-1">
                    /mo
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-3 min-h-[40px] leading-relaxed">
                  For early founders testing the waters.
                </p>
                <Button
                  variant="outline"
                  className="w-full mt-6 rounded-full h-11 text-sm tracking-wide"
                >
                  Start for free
                </Button>
              </div>

              {/* Execution (Featured) */}
              <div className="flex flex-col pr-4 relative">
                <h3 className="text-xl font-medium text-foreground flex items-center gap-2">
                  Execution
                  <span className="bg-primary/10 text-primary text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Featured
                  </span>
                </h3>
                <div className="mt-4">
                  <span className="text-4xl font-semibold tracking-tight text-foreground">
                    $49
                  </span>
                  <span className="text-muted-foreground text-sm ml-1">
                    /mo
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-3 min-h-[40px] leading-relaxed">
                  For startups ready to build with discipline.
                </p>
                <Button className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-11 text-sm tracking-wide">
                  Upgrade
                </Button>
              </div>

              {/* Portfolio */}
              <div className="flex flex-col pr-4">
                <h3 className="text-xl font-medium text-foreground">
                  Portfolio
                </h3>
                <div className="mt-4">
                  <span className="text-4xl font-semibold tracking-tight text-foreground">
                    $149
                  </span>
                  <span className="text-muted-foreground text-sm ml-1">
                    /mo
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-3 min-h-[40px] leading-relaxed">
                  For studios running multiple bets.
                </p>
                <Button
                  variant="outline"
                  className="w-full mt-6 rounded-full h-11 text-sm tracking-wide"
                >
                  Contact Sales
                </Button>
              </div>
            </div>

            {/* Feature Rows */}
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
        </div>

        {/* FAQ Micro Row */}
        <div className="mt-24 pt-12 border-t border-border/50 grid md:grid-cols-2 gap-12 lg:gap-24">
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
        </div>
      </div>
    </section>
  );
};

export default PricingSections;
