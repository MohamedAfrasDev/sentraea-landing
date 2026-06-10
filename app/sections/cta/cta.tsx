import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import React from "react";

const CTA = () => {
  return (
    <section className="relative overflow-hidden bg-gray-950 py-24 sm:py-32 flex flex-col justify-center min-h-[calc(100vh-20rem)]">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="h-[400px] w-[600px] rounded-full bg-primary/20 blur-[120px] mix-blend-screen" />
      </div>

      <div className="relative z-10 container mx-auto px-5 flex flex-col items-center justify-center text-center">
        {/* Badge */}

        <h2 className="text-5xl md:text-7xl capitalize font-semibold text-white tracking-tighter mb-6 max-w-3xl">
          Stop guessing what to{" "}
          <span className="font-heading text-primary tracking-tight relative whitespace-nowrap">
            build
          </span>
        </h2>

        <p className="text-lg md:text-xl w-full max-w-2xl mx-auto text-muted-foreground mb-10 leading-relaxed">
          Create your startup workspace, run Stage 1, and see in minutes whether
          your problem and niche are sharp enough to build for.
        </p>

        {/* Waitlist Form */}
        <div className="w-full max-w-md mx-auto flex flex-col items-center gap-4">
          <form className="flex" onSubmit={(e) => e.preventDefault()}>
            <InputGroup className="bg-gray-700/20 shadow-none">
              <InputGroupInput
                type="email"
                className="text-white"
                placeholder="Enter your email address"
                required
              />
            </InputGroup>
            <Button type="submit" className="shadow-none h-10">
              Join Waitlist
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          {/* Microcopy / Social Proof */}
          <div className="flex items-center justify-center gap-4 text-sm text-gray-400 mt-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>Unsubscribe anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
