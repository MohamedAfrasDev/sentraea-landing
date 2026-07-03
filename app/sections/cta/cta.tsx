"use client";

import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const STAGES = [
  "Just an idea",
  "Building something",
  "Launched, no users yet",
  "Have early users",
];

const CTA = () => {
  const [email, setEmail] = useState("");
  const [stage, setStage] = useState<string | null>(null);
  const [painPoint, setPainPoint] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !stage) {
      toast.error("Add your email and pick a stage to continue.");
      return;
    }

    // TODO: wire to real capture endpoint (e.g. Supabase / form backend)
    console.log("waitlist submission", { email, stage, painPoint });

    setSubmitted(true);
    toast.success("You're on the list.");
  };

  return (
    <section
      id="waitlist"
      className="relative overflow-hidden bg-black/90 py-24 sm:py-32 flex flex-col justify-center min-h-screen"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 z-0 h-full w-full bg-[radial-gradient(#363636_1px,transparent_1px)] bg-size-[20px_20px] dark:bg-[radial-gradient(#4f5052_1px,transparent_1px)] opacity-70 mask-[radial-gradient(ellipse_80%_60%_at_50%_60%,#000_80%,transparent_100%)]" />

      <div className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="h-[400px] w-[600px] rounded-full bg-primary/20 blur-[120px] mix-blend-screen" />
      </div>

      <div className="relative z-10 container mx-auto px-5 flex flex-col items-center justify-center text-center">
        <h2 className="text-5xl md:text-7xl capitalize  text-white tracking-tight mb-6 max-w-3xl">
          Stop building{" "}
          <span className="text-primary tracking-tight font-serif font-medium capitalize text-7xl">
            products
          </span>{" "}
          nobody wants.
        </h2>

        <p className="text-lg md:text-xl w-full max-w-2xl mx-auto text-white/80 mb-10 leading-relaxed">
          Get early access and tell us where you are — we&apos;ll show you
          exactly what stage you&apos;re in before you build another feature.
        </p>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md mx-auto flex flex-col items-stretch gap-4"
          >
            <InputGroup className="bg-black/50 backdrop-blur-md shadow-none">
              <InputGroupInput
                type="email"
                className="text-white"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </InputGroup>

            <div className="text-left">
              <p className="text-sm text-white/60 mb-2">
                Where are you right now?
              </p>
              <div className="flex flex-wrap gap-2">
                {STAGES.map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setStage(s)}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm border transition-colors cursor-pointer",
                      stage === s
                        ? "bg-primary border-primary text-white"
                        : "bg-black/40 border-white/10 text-white/70 hover:border-white/30",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-left">
              <p className="text-sm text-white/60 mb-2">
                What&apos;s the one thing you wish you knew before you started
                building? <span className="text-white/40">(optional)</span>
              </p>
              <InputGroup className="bg-black/50 backdrop-blur-md shadow-none">
                <InputGroupTextarea
                  className="text-white min-h-20"
                  placeholder="e.g. I wish I'd talked to 10 people before writing a line of code"
                  value={painPoint}
                  onChange={(e) => setPainPoint(e.target.value)}
                />
              </InputGroup>
            </div>

            <Button
              type="submit"
              variant={"outline"}
              className="shadow-none h-11 text-white bg-black/60 mt-2"
            >
              Get early access
              <ArrowRight className="h-4 w-4" />
            </Button>

            {/* Microcopy / Trust */}
            <div className="flex items-center justify-center gap-4 text-sm text-gray-400 mt-2 flex-wrap">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>We read every response personally</span>
              </div>
            </div>
          </form>
        ) : (
          <div className="w-full max-w-md mx-auto flex flex-col items-center gap-3 border border-white/10 rounded-lg bg-black/40 px-6 py-8">
            <CheckCircle2 className="h-8 w-8 text-primary" />
            <h3 className="text-xl font-medium text-white">You&apos;re in.</h3>
            <p className="text-white/70 text-sm">
              We&apos;ll reach out as we open up early access — no spam, no drip
              campaign.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CTA;
