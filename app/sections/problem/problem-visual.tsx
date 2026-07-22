import React from "react";
import feat1 from "@/public/features/feat5.jpg";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import Logo from "@/public/logos/LOGO.png";
import Sol from "@/public/illustrations/problem-1.jpg";
import Stripe from "@/public/connectors/stripe-ar21.svg";
import Intercom from "@/public/connectors/Intercom_idJ9ed9vTR_0.svg";
import Plausible from "@/public/connectors/plausible_logo.svg";
const ProblemVisual = () => {
  const problem = [
    "Fix onboarding",
    "Run ads",
    "Improve retention",
    "Fix bugs",
    "Analyze churn",
    "Launch new feature",
    "Update pricing page",
    "Reply to support tickets",
  ];
  return (
    <div className="relative">
      <Image
        src={feat1}
        alt="Problem"
        width={1000}
        height={1000}
        className="absolute opacity-40 backdrop-blur-lg h-full w-full rounded-sm shado"
      />

      <div className="relative flex flex-col justify-between gap-1 w-full h-full">
        <div className="flex gap-1 w-full">
          <Card className="bg-card/30 w-full items-center md:text-xl backdrop-blur-sm border-none shadow-primary/10 pt-20 pb-4 justify-end rounded-sm px-5">
            {problem[0]}
          </Card>

          <Card className="bg-card/10 w-full items-center md:text-xl backdrop-blur-sm border-none shadow-primary/10 pt-20 pb-4 justify-end rounded-sm px-5">
            {problem[2]}
          </Card>
        </div>
        <div className="flex gap-1">
          <div className="flex flex-7 flex-col gap-1">
            <Card className="bg-card/30 md:text-xl items-end backdrop-blur-sm border-none shadow-primary/10 rounded-sm py-7 px-5">
              {problem[6]}
            </Card>
            <Card className="bg-card/20 md:text-xl items-end backdrop-blur-sm border-none shadow-primary/10 rounded-sm py-7 px-5">
              {problem[7]}
            </Card>
          </div>
          <div className="flex-6 py-4 px-10 justify-center flex flex-col">
            <h2 className="md:text-2xl leading-5 md:leading-7.5 text-transparent bg-linear-to-r bg-clip-text from-foreground via-blue-800 to-blue-950 text-center font-medium tracking-tight">
              Which one actually moves growth?
            </h2>
            <p className="text-xs md:text-sm text-center mt-1">
              Everything feels urgent, but most actions are low leverage
            </p>
          </div>
        </div>
        <div className="flex gap-1">
          <Card className="bg-card/20 w-full items-center md:text-xl backdrop-blur-sm border-none shadow-primary/0 rounded-sm pb-20 pt-5 px-5">
            {problem[1]}
          </Card>

          <Card className="bg-card/25 w-full items-center md:text-xl backdrop-blur-sm border-none shadow-primary/0 rounded-sm pb-20 pt-5 px-5">
            {problem[4]}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProblemVisual;
