import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from "react";

const CTA = () => {
  return (
    <section className=" text-center">
      <Card className="text-center px-5 py-8 h-[calc(100vh-20rem)] flex flex-col justify-center">
        <h2 className="text-6xl font-semibold capitalize tracking-tighter">
          Stop guessing what to{" "}
          <span className="font-number text-primary uppercase">build</span>
        </h2>
        <p className="text-xl w-[70%] text-center mx-auto text-muted-foreground">
          Create your startup workspace, run Stage 1, and see in minutes whether
          your problem and niche are sharp enough to build for.
        </p>

        <Button className="w-fit mx-auto text-xl px-5 py-6 capitalize">
          Create your 4 Stage Plan Now
        </Button>
      </Card>
    </section>
  );
};

export default CTA;
