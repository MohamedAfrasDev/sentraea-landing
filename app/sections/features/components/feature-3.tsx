import { Card } from "@/components/ui/card";
import { ArrowRight, Sparkles } from "lucide-react";
import React from "react";
import Hubspot from "@/public/connectors/hubspot.svg";
import Plausible from "@/public/connectors/plausible_logo.svg";
import Stripe from "@/public/connectors/stripe-ar21.svg";
import Intercome from "@/public/connectors/Intercom_idJ9ed9vTR_0.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Feat1 from "@/public/features/feat1.jpg";
import Feat2 from "@/public/features/feat5.jpg";
import Feat3 from "@/public/features/feat3.jpg";
import Feat4 from "@/public/features/feat4.jpg";
const Feature3 = () => {
  const feat3 = [
    {
      title: "Demand",
      stage: "Healthy",
      label: "+16% w/w",
    },
    {
      title: "Activation",
      stage: "Stable",
      label: "38% reach first report",
    },
    {
      title: "Conversion",
      stage: "Attention",
      label: "Demo-to-close 14%",
    },
    {
      title: "Retention",
      stage: "Stable",
      label: "Churn 2.1%",
    },
    {
      title: "Expansion",
      stage: "Quit",
      label: " MRR 104% ",
    },
  ];

  const getTextColor = (stage: string) => {
    switch (stage) {
      case "Healthy":
        return "text-green-500";
      case "Stable":
        return "text-blue-500";
      case "Attention":
        return "text-yellow-500";
      case "Quit":
        return "text-red-500";
    }
  };
  return (
    <div className="relative">
      <Image
        src={Feat1}
        alt="F"
        width={1000}
        height={1000}
        className="absolute rounded-md  h-full shadow-xl"
      />
      <div className="relative pr-3 pt-1 pl-1 pb-3">
        <Card className="px-4 py-4 relative w-full md:min-w-92.5  md:max-w-fit bg-card/70">
          <div className="flex justify-between items-center">
            <h3 className="tracking-tight text-xl font-medium">
              Growth Stage Health
            </h3>
          </div>
          <div className="flex flex-col gap-3">
            {feat3.map((data, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-between items-center w-full"
                >
                  <p className="w-full font-medium">{data.title}</p>
                  <p
                    className={`w-full text-start font-number uppercase ${getTextColor(data.stage)}`}
                  >
                    {data.stage}
                  </p>
                  <p className="w-full text-end text-muted-foreground">
                    {data.label}
                  </p>
                </div>
              );
            })}
            <Card className="px-2 py-2 gap-0 bg-card/30 mt-4">
              <p className="text-transparent text-lg font-medium bg-linear-to-r bg-clip-text from-foreground via-blue-500 to-blue-800">
                Active Bottleneck: Conversion
              </p>
              <span className="flex items-center gap-1 text-primary">
                View full diagnosis
                <ArrowRight size={15} />
              </span>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Feature3;
