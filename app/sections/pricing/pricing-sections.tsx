"use client";

import React, { useCallback } from "react";
import PricingCard from "./components/pricing-card";

const PricingSections = () => {
  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section
      id="pricing"
      className="relative w-full py-20 md:py-28 bg-primary/5 text-center"
    >
      <div className="mx-auto px-5 md:px-20">
        <div className="max-w-2xl text-center w-full mx-auto">
          <p className="text-sm uppercase font-number tracking-[0.08em] text-primary font-medium">
            Early Access Pricing
          </p>
          <h2 className="text-4xl md:text-6xl font-heading  font-semibold tracking-tight md:tracking-[-3px] text-balance text-foreground mt-3">
            Pricing is still being shaped by
            <span className="text-primary"> early founders.</span>
          </h2>
          <p className="text-lg text-muted-foreground mt-5 leading-relaxed tracking-tight">
            This is the direction we&apos;re testing — not a final price.
            Founding members lock in this rate for as long as they stay.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 mt-14 max-w-3xl mx-auto text-start">
          <PricingCard
            name={"Free"}
            value={"0"}
            yearlyValue={"0"}
            subTitle={"Try the system on a single workspace"}
            featured={false}
            features={[
              "1 startup workspace",
              "Stage 1 validation, lite",
              "Limited evidence-gate runs",
            ]}
            btnText="Start for free"
            variant="outline"
            onBtnClick={() => scrollTo("waitlist")}
          />

          <PricingCard
            name={"Founding Member"}
            value={"19"}
            yearlyValue={"190"}
            subTitle={"For founders serious about building in order"}
            featured={true}
            features={[
              "Full stage-gated playbook",
              "Unlimited evidence-gate runs",
              "Full decision history",
              "Locked-in price for life",
              "Direct line to the founders",
            ]}
            btnText="Reserve founding pricing"
            variant="default"
            onBtnClick={() => scrollTo("waitlist")}
            secValue="Founding pricing ends when we hit 50 members."
          />
        </div>

        <p className="text-sm text-muted-foreground mt-8 tracking-tight">
          No credit card required. This just helps us gauge real interest.
        </p>
      </div>
    </section>
  );
};

export default PricingSections;
