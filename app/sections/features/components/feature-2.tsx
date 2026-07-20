import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
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
const Feature2 = () => {
  const feat2 = [
    {
      title: "Demo-to-close rate",
      value: "-14 pts",
      icon: Hubspot,
    },
    {
      title: "Organic sessions",
      value: "+18%",
      icon: Plausible,
    },
    {
      title: "New MRR",
      value: "+$1,620",
      icon: Stripe,
    },
    {
      title: "Objection theme detected",
      value: "+1",
      icon: Intercome,
    },
  ];
  return (
    <div className="relative">
      <Image
        src={Feat3}
        alt="F"
        width={1000}
        height={1000}
        className="absolute rounded-md h-96.5 shadow-xl"
      />
      <div className="relative pr-3 pl-1 pt-1">
        <Card className="px-4 py-4 relative max-w-77.5 md:max-w-fit md:min-w-92.5 bg-card/70 w-full">
          <div className="flex justify-between items-center">
            <h3 className="tracking-tight text-xl font-medium">Live Signal</h3>
            <span className="flex gap-2 items-center">
              <div className="h-2 animate-pulse bg-emerald-500 rounded-full w-2" />
              <p className="font-number text-muted-foreground text-xs">
                Synced 9 min ago
              </p>
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {feat2.map((data, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-between items-center w-full"
                >
                  <span className="flex gap-1 items-start w-full">
                    <ArrowRight className="mt-1" size={15} />
                    <div className="text-start">
                      <p className="font- text-lg">{data.title}</p>
                      <Image
                        src={data.icon}
                        alt={data.title}
                        width={60}
                        height={20}
                      />
                    </div>
                  </span>

                  <span
                    className={cn(
                      "text-end text-lg font-medium",
                      data.value.includes("-")
                        ? "text-red-500"
                        : "text-emerald-500",
                    )}
                  >
                    {data.value}
                  </span>
                </div>
              );
            })}

            <Button variant={"outline_without_border"} className={"w-fit mt-3"}>
              View All Signals
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Feature2;
