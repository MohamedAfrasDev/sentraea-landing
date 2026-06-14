"use client";

import SmoothScroll from "@/components/SmoothScroll";
import { Header } from "../components/Header";
import Hero from "./sections/Hero/Hero";
import StagesComp from "./sections/4-stages/stages-comp";
import ShippingComponent from "./sections/shipping/shipping-component";
import CTA from "./sections/cta/cta";
import PricingSections from "./sections/pricing/pricing-sections";
import Footer from "./sections/footer/footer";

export default function Home() {
  return (
    <div className="min-h-full">
      <SmoothScroll>
        <Header />
        <div className="">
          <Hero />

          <div className="">
            <div className=" flex flex-col mt-20 border-muted-foreground/3">
              <div className="w-full px-5 md:px-20 z-10">
                <StagesComp />
              </div>

              <div className="w-full z-20">
                <ShippingComponent />
              </div>

              <div className="relative z-30 bg-background flex flex-col w-full">
                <PricingSections />
                {/* <HowItWorks /> */}
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
