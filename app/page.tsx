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

              <div className="w-full z-20">
                <ShippingComponent />
              </div>

              <div className="relative z-30 bg-background flex flex-col w-full">
                <div className="w-full px-5 md:px-20">
                  <WhatIsSentraea />
                </div>

                <div className="w-full px-5 md:px-20">
                  <Differentiators />
                </div>

                <div className="w-full px-5 md:px-20">
                  <Proofs />
                </div>

                <PricingSections />
                <CTA />

                <Footer />
              </div>
            </div>
          </div>
        </div>
      </SmoothScroll>
    </div>
  );
}
