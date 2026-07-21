import React from "react";
import feat1 from "@/public/features/feat1.jpg";
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
  ];
  return (
    <div className="relative w-fit mx-auto justify-center items-center">
      <div className="relative">
        <Image
          src={feat1}
          alt="Problem"
          width={1000}
          height={1000}
          className="absolute opacity-40 h-full w-full rounded-sm"
        />

        <div className="pt-2 pl-2 pb-1 pr-1  relative">
          <Card className="bg-card/30 border-none min-w-xl px-3 w-full py-3">
            <h2 className="text-2xl font-medium text-start">
              A typical week for most founders{" "}
            </h2>

            <div className="text-start grid grid-cols-2 gap-4">
              {problem.map((data, index) => {
                return (
                  <div key={index} className="flex gap-2 items-center">
                    <div className="w-2 h-2 bg-emerald-500" />
                    <p className="text-xl text-muted-foreground"> {data}</p>
                  </div>
                );
              })}
            </div>

            <div className="text-start">
              <h4 className="text-lg">
                Everything feels important.
                <br />
                Nothing feels clearly more important than the rest.
              </h4>
            </div>

            <Card className="px-2 py-2 bg-card/30  text-center">
              <p className="text-xl font-medium text-transparent bg-linear-to-r bg-clip-text from-foreground via-emerald-700 to-emerald-500">
                You stay busy… but growth stays unpredictable.{" "}
              </p>
            </Card>
          </Card>
        </div>
      </div>
      {/* <div className="relative">
        <Image
          src={Sol}
          alt="Problem"
          width={1000}
          height={1000}
          className="absolute h-full w-full rounded-sm"
        />

        <div className="pt-1 pl-1 pb-2 pr-2 h-full relative">
          <Card className="bg-card/30 px-3 py-3 h-full text-start">
            <h2 className="text-lg font-medium text-start">
              What Sentraea shows you
            </h2>
            <div>
              <div>
                <h3 className="text-lg">This Week's Bottleneck:</h3>
                <h4 className="font-semibold text-xl">Conversion</h4>
              </div>

              <Card className="px-3 py-3 gap-0 bg-card/30 mt-3">
                <h3 className="text-lg">One Highest-Leverage Move:</h3>
                <h4 className="font-semibold text-2xl text-transparent bg-clip-text bg-linear-to-r from-foreground via-blue-800 to-blue-900">
                  Rewrite demo flow for ICP X
                </h4>
              </Card>
            </div>
          </Card>
        </div>
      </div> */}
    </div>
  );
};

export default ProblemVisual;
