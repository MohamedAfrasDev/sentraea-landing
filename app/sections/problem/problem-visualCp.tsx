import React from "react";
import feat1 from "@/public/features/feat5.jpg";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import Logo from "@/public/logos/LOGO.png";
import Sol from "@/public/illustrations/problem-1.jpg";
import Stripe from "@/public/connectors/stripe-ar21.svg";
import Intercom from "@/public/connectors/Intercom_idJ9ed9vTR_0.svg";
import Plausible from "@/public/connectors/plausible_logo.svg";
const ProblemVisualCp = () => {
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
        className="absolute shadow-2xl opacity-40 backdrop-blur-lg h-full w-full rounded-sm shado"
      />

      <div className="relative flex p-4 flex-col justify-between gap-3 w-full h-full">
        <div className="flex gap-3">
          <div className="flex  flex-4 flex-col gap-3">
            <Card className="bg-card/30 items-start justify-start md:text-xl text-primary font-medium backdrop-blur-sm border-none shadow-lg shadow-primary/30 rounded-sm pt-22 pb-5 px-5">
              {problem[2]}
            </Card>
            <Card className="bg-card/20  items-start justify-end md:text-xl text-primary font-medium backdrop-blur-sm border-none shadow-lg shadow-primary/30 rounded-sm pt-22 pb-5 px-5">
              {problem[3]}
            </Card>
          </div>
          <div className="flex-6 py-4 px-4 justify-center flex flex-col">
            <h2 className="md:text-6xl font-medium leading-5 md:leading-16 text-transparent bg-linear-to-r bg-clip-text from-foreground via-blue-900 to-blue-950 text-center tracking-tight">
              Which one actually moves growth?
            </h2>
            <p className="text-xs md:text-lg text-muted-foreground text-center mt-1">
              Everything feels urgent, but most actions are low leverage
            </p>
          </div>
          <div className="flex  flex-4 flex-col gap-3">
            <Card className="bg-card/30 items-start justify-end md:text-xl text-primary font-medium backdrop-blur-sm border-none shadow-lg shadow-primary/30 rounded-sm pt-22 pb-5 px-5">
              {problem[4]}
            </Card>
            <Card className="bg-card/30 items-start justify-end md:text-xl text-primary font-medium backdrop-blur-sm border-none shadow-lg shadow-primary/30 rounded-sm pt-22 pb-5 px-5">
              {problem[5]}
            </Card>
          </div>
        </div>
        <div className="flex gap-3 w-full">
          <Card className="bg-card/30 w-full justify-end items-start md:text-xl text-primary font-medium backdrop-blur-sm border-none shadow-lg shadow-primary/30 pt-20 rounded-sm px-5">
            {problem[0]}
          </Card>

          <Card className="bg-card/30 w-full  items-start md:text-xl text-primary font-medium backdrop-blur-sm border-none shadow-lg shadow-primary/30 pt-20 justify-center rounded-sm px-5">
            {problem[1]}
          </Card>
        </div>
        {/* <div className="flex gap-3">
          <Card className="bg-card/20 w-full shadow-lg shadow-primary/20 shadow-[0_-15px_19px_-6px_rgba(10,100,200,0.1)] items-center md:text-xl text-primary font-medium backdrop-blur-sm border-none rounded-sm pb-17 pt-5 px-5">
            {problem[6]}
          </Card>

          <Card className="bg-card/25 shadow-lg shadow-primary/20 shadow-[0_-15px_19px_-6px_rgba(10,100,200,0.1)] w-full items-center md:text-xl  text-primary font-medium backdrop-blur-sm border-none rounded-sm pb-17 pt-5 px-5">
            {problem[7]}
          </Card>
        </div> */}
      </div>
    </div>
  );
};

export default ProblemVisualCp;
