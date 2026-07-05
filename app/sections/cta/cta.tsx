import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

const CTA = () => {
  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const [isShrunk, setIsShrunk] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsShrunk(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      className="bg-primary/30 relative min-h-screen h-full px-10 py-10 flex flex-col  text-center items-center justify-center
    "
    >
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#cacccf_1px,transparent_1px)] bg-size-[20px_20px] dark:bg-[radial-gradient(#4f5052_1px,transparent_1px)] opacity-70 mask-[radial-gradient(ellipse_80%_60%_at_50%_40%,#000_60%,transparent_100%)]" />

      <h2 className="font-heading text-4xl  md:text-7xl text-center font-bold">
        Build <span className="text-primary">something real.</span>
        <br /> Not just something fast.
      </h2>
      <p className="text-muted-foreground mt-5 text-lg md:text-xl">
        Sentraea gives you the system, the gates, and the discipline to build in
        the right direction — from the very first day.
      </p>

      <div className="flex gap-5 mt-10 z-2">
        <Button
          className={"text-lg px-4 py-5"}
          onClick={(e) => scrollTo("waitlist")}
        >
          Get early access <ArrowRight />
        </Button>

        <Button
          className={"text-lg px-4 py-5"}
          onClick={(e) => scrollTo("howitworks")}
          variant={"outline"}
        >
          How it works
        </Button>
      </div>
    </div>
  );
};

export default CTA;
