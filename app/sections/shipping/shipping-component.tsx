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
    <div className=" ">
      <h2 className="text-7xl font-semibold tracking-tighter flex-3 text-balance">
        Shipping is easy now.
        <br />{" "}
        <span className="text-primary font-semibold font-number tracking-tighter">
          Building the right thing isn’t.
        </span>
      </h2>
      <Card>
        <h2 className="text-2xl font-medium">
          AI made shipping faster—but also made fake validation easier.
        </h2>
      </Card>

      <p className="text-lg text-start ">
        Sentraea exists to protect your work by forcing your startup through the
        right stages.
      </p>
    </div>
  );
};

export default ShippingComponent;
