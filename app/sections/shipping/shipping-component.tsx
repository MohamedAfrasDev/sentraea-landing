import { Card } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, ChevronRight } from "lucide-react";
import React from "react";

const ShippingComponent = () => {
  const bullet = [
    "AI made shipping faster—but also made fake validation easier.",
    "Most founders jump from idea to code and only later discover nobody cares.",
    "Experiments live in random docs, and decisions get made from memory.",
    "Growth becomes a mix of random tactics instead of one clear motion.",
  ];
  return (
    <div className="flex ">
      <h2 className="text-7xl font-medium tracking-tighter flex-3 text-balance">
        Shipping is easy now.
        <br />{" "}
        <span className="text-primary">Building the right thing isn’t.</span>
      </h2>

      <Card className="flex-1">
        {bullet.map((item, index) => (
          <div key={index} className="flex gap-5 items-start">
            <AlertCircle className="w-10 h-10 text-destructive" />
            <p className="text-lg text-start  text-muted-foreground">{item}</p>
          </div>
        ))}
        <p className="text-lg text-start ">
          Sentraea exists to protect your work by forcing your startup through
          the right stages.
        </p>
      </Card>
    </div>
  );
};

export default ShippingComponent;
