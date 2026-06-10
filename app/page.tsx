"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BrainCircuit,
  Sparkles,
  Zap,
  Layers,
  ShieldCheck,
  Users,
  CheckCircle2,
  MessageSquare,
  Search,
  Database,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import SmoothScroll from "@/components/SmoothScroll";
import { Header } from "../components/Header";
import Hero from "./sections/Hero/Hero";
import WhatIsSentraea from "./sections/whats-sentraea/What-Is-Sentraea";
import Proofs from "./sections/proofs/proofs";
import HowItWorks from "./sections/how-it-works/how-it-works";
import StagesComp from "./sections/4-stages/stages-comp";
import ShippingComponent from "./sections/shipping/shipping-component";
import CTA from "./sections/cta/cta";
import PricingSections from "./sections/pricing/pricing-sections";
import Footer from "./sections/footer/footer";

export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="min-h-full">
      <SmoothScroll>
        <Header />
        <div className="">
          <Hero />

          <div className="">
            <div className=" flex flex-col mt-20 border-muted-foreground/3">
              <div className="w-full px-20 z-10">
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
