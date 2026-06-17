import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import React from "react";

const CTA = () => {
  return (
    <section
      id="waitlist"
      className="relative overflow-hidden bg-black/90 py-24 sm:py-32 flex flex-col justify-center h-screen"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 z-0 h-full w-full bg-[radial-gradient(#363636_1px,transparent_1px)] bg-size-[20px_20px] dark:bg-[radial-gradient(#4f5052_1px,transparent_1px)] opacity-70 mask-[radial-gradient(ellipse_80%_60%_at_50%_60%,#000_80%,transparent_100%)]" />

      <div className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="h-[400px] w-[600px] rounded-full bg-primary/20 blur-[120px] mix-blend-screen" />
      </div>

      <div className="relative z-10 container mx-auto px-5 flex flex-col items-center justify-center text-center">
        {/* Badge */}

        <h2 className="text-5xl md:text-7xl capitalize font-medium text-white tracking-tight mb-6 max-w-3xl">
          Stop building{" "}
          <span className="text-primary tracking-tight font-heading font-semibold capitalize text-7xl">
            products
          </span>{" "}
          nobody wants.
        </h2>

        <p className="text-lg md:text-xl w-full max-w-2xl mx-auto text-white mb-10 leading-relaxed">
          Create your startup workspace, run Stage 1, and see in minutes whether
          your problem and niche are sharp enough to build for.
        </p>

        {/* Waitlist Form */}
        <div className="w-full max-w-md mx-auto flex flex-col items-center gap-4">
          <form className="flex" onSubmit={(e) => e.preventDefault()}>
            <InputGroup className="bg-black/50 backdrop-blur-md shadow-none rounded-r-none">
              <InputGroupInput
                type="email"
                className="text-white"
                placeholder="Enter your email address"
                required
              />
            </InputGroup>
            <Button
              type="submit"
              variant={"outline"}
              className="shadow-none h-10 rounded-l-none text-white bg-black/60"
            >
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
