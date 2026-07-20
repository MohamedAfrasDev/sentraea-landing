import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
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
const Feature4 = () => {
  const feat4 = [
    {
      title: "Evidence 1",
      icon: Hubspot,
      value: "Demo-to-close dropped 28% → 14%",
    },
    {
      title: "Evidence 2",
      icon: Intercome,
      value: "34% of lost deals mentioned pricing objections",
    },
    {
      title: "Evidence 3",
      icon: Plausible,
      value: "Organic traffic up 18% but conversion flat",
    },
  ];
  return (
    <div className="relative">
      <Image
        src={Feat4}
        alt="F"
        width={1000}
        height={1000}
        className="absolute rounded-md h-85 md:h-70  shadow-xl"
      />
      <div className="relative pt-4 pr-1 pl-3">
        <Card className="px-4 py-3 relative max-w-77.5 md:max-w-fit md:min-w-87.5 bg-card/70 w-full">
          <div className="flex justify-between items-center">
            <h3 className="tracking-tight font-medium text-xl">
              Why This Move?
            </h3>
          </div>
          <div className="flex flex-col gap-3">
            {feat4.map((fd, index) => {
              return (
                <div key={index}>
                  <div>
                    <p>{fd.title}</p>
                    <div className="flex items-center gap-5">
                      <Image src={fd.icon} alt={fd.title} width={50} />
                      <p className="text-xs md:text-sm">{fd.value}</p>
                      {index == 0 && <Sparkles size={15} />}
                    </div>
                  </div>
                </div>
              );
            })}

            <Button>View full source trail</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Feature4;
