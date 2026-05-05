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
  Database
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import SmoothScroll from "@/components/SmoothScroll";
import { Header } from "../components/Header";
import Hero from "./sections/Hero/Hero";
import WhatIsSentraea from "./sections/whats-sentraea/What-Is-Sentraea";

export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="min-h-full">
      <SmoothScroll>

        <Header />
        <div className="">
          <Hero />
        </div>
        <div className="px-7">
          {/* <WhatIsSentraea /> */}
        </div>

      </SmoothScroll>

    </div>
  );
}
