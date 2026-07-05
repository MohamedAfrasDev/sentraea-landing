"use client";

import SmoothScroll from "@/components/SmoothScroll";
import { Header } from "../components/Header";
import Hero from "./sections/Hero/Hero";
import StagesComp from "./sections/4-stages/stages-comp";
import ShippingComponent from "./sections/shipping/shipping-component";
import WhatIsSentraea from "./sections/whats-sentraea/What-Is-Sentraea";
import Differentiators from "./sections/differentiators/differentiators";
import Proofs from "./sections/proofs/proofs";
import CTA from "./sections/cta/cta";
import PricingSections from "./sections/pricing/pricing-sections";
import Footer from "./sections/footer/footer";
import ProblemSection from "./sections/problem-section/problem-section";
import DifferentSection from "./sections/different/different-section";
import ExecutionSystem from "./sections/exectuion-system-section/execution-system";
import HowItWorks from "./sections/how-it-works/how-it-works";
import ComparisonSection from "./sections/comparison/comparison-section";
import JoinWaitlistSection from "./sections/join-waitlist/join-waitlist-section";

export default function Home() {
  return (
    <div className="min-h-full">
      <SmoothScroll>
        <Header />
        <div className="">
          <Hero />

          <div className="">
            <div className=" flex flex-col mt-10 border-muted-foreground/3">
              <ProblemSection />

              <DifferentSection />
              <ExecutionSystem />

              <HowItWorks />

              <ComparisonSection />

              <PricingSections />
              <JoinWaitlistSection />
              <CTA />
              <Footer />
            </div>
          </div>
        </div>
      </SmoothScroll>
    </div>
  );
}
