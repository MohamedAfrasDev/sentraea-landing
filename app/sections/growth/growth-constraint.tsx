import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Check, Info } from "lucide-react";
import React from "react";

const GrowthConstraint = () => {
  return (
    <div className="px-10">
      <div className="text-center">
        <h2 className="text-6xl font-medium tracking-tight">
          Growth is constrained by{" "}
          <span className="text-transparent bg-linear-to-r bg-clip-text from-foreground via-blue-900 to-blue-900">
            one bottleneck
          </span>{" "}
          at a time.
        </h2>
        <p className="text-xl text-muted-foreground mt-2">
          Improving retention won’t help if conversion is broken. Increasing
          traffic won’t matter if activation is weak. The fastest-growing SaaS
          companies find the active constraint and solve that first.
        </p>
      </div>

      <Card className="bg-card/50 px-5 py-7 mt-10 grid grid-cols-4 gap-50 w-fit">
        <div className="text-center items-center flex flex-col w-fit">
          <Card className="p-5 w-fit bg-green-500/10 border-none">
            <Check className="text-green-500" />
          </Card>
          <h3 className="text-2xl mt-2">Traffic</h3>
        </div>
        <div className="text-center items-center flex flex-col w-fit">
          <Card className="p-5 w-fit bg-green-500/10 border-none">
            <Check className="text-green-500" />
          </Card>
          <h3 className="text-2xl mt-2">Activation</h3>
        </div>
        <div className="text-center items-center flex flex-col w-fit">
          <Card className="p-5 w-fit bg-red-500/10 border-none">
            <Info className="text-red-500" />
          </Card>
          <h3 className="text-2xl mt-2">Conversion</h3>
          <Badge variant="destructive">Bottleneck</Badge>
        </div>
        <div className="text-center items-center flex flex-col w-fit">
          <Card className="p-5 w-fit bg-green-500/10 border-none">
            <Check className="text-green-500" />
          </Card>
          <h3 className="text-2xl mt-2">Retention</h3>
        </div>
      </Card>
    </div>
  );
};

export default GrowthConstraint;
