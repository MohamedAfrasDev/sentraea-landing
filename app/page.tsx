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
import ProofSection from "./sections/proof/proof-section";
import TrustSection from "./sections/trust/trust-section";
import ExecutionGrid from "./sections/execution-grid/execution-grid";
import FitSection from "./sections/fit/fit-section";
import FaqSection from "./sections/faq/faq-section";
import FinalCta from "./sections/final-cta/final-cta";
import FooterAnchor from "./sections/footer-anchor/footer-anchor";
import Hero2 from "./sections/Hero/Hero-2";

export default function Home() {
  return (
    <div className="min-h-full bg-white">
      <SmoothScroll>
        <Header />
        <div className="">
          <Hero />
          {/* <Hero2 /> */}

          <div className="">
            <div className=" flex flex-col mt-10 border-muted-foreground/3">
              <ProofSection />
              <HowItWorks />
              <TrustSection />
              <ExecutionGrid />
              <FitSection />
              <FaqSection />
              {/* <FinalCta /> */}
              <JoinWaitlistSection />

              <FooterAnchor />
              {/* <ProblemSection />

              <DifferentSection />
              <ExecutionSystem />

              <ComparisonSection />

              <PricingSections />
              <CTA />
              <Footer /> */}
            </div>
          </div>
        </div>
      </SmoothScroll>
    </div>
  );
}
