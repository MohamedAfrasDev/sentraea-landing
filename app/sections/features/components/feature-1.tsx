import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from "react";
import Feat1 from "@/public/features/feat1.jpg";
import Feat2 from "@/public/features/feat5.jpg";
import Feat3 from "@/public/features/feat3.jpg";
import Feat4 from "@/public/features/feat4.jpg";
import Image from "next/image";

const Feature1 = () => {
  return (
    <div className="relative">
      <Image
        src={Feat4}
        alt="F"
        width={1000}
        height={1000}
        className="absolute rounded-md h-full shadow-xl"
      />
      <div className="pl-2 pr-1 pt-2 pb-1">
        <Card className="px-4 py-3  relative md:min-w-88.75  md:max-w-fit bg-card/70 w-full">
          <div className="flex justify-between items-center">
            <h3 className="tracking-tight">Monday Founder Brief</h3>
            <p className="font-number text-muted-foreground">Week 12</p>
          </div>
          <div>
            <h4 className="font-medium text-md">This week's bottleneck</h4>
            <p className="text-xl font-bold font-heading text-transparent bg-linear-to-r bg-clip-text from-foreground via-blue-300 to-blue-400">
              Conversion
            </p>
          </div>
          <Card className="px-3 py-2 bg-card/10 gap-0">
            <h4 className="font-medium text-md">One Highest-Leverage Move</h4>
            <p className="text-lg md:text-xl font-bold font-heading tracking-tight text-transparent bg-linear-to-r bg-clip-text from-primary via-primary/70 to-blue-800">
              Rewrite demo flow for ICP X
            </p>
          </Card>
          <div>
            <h4 className="font-medium text-md">Why This Matters:</h4>
            <p className="font-medium font-heading text-base w-fit text-foreground">
              Demo-to-close rate dropped from <br />
              <span className="text-transparent bg-linear-to-r bg-clip-text from-foreground via-blue-300 to-blue-400">
                {" "}
                28% → 14%
              </span>
            </p>
          </div>
          <div className="flex gap-3">
            <Button>Open this week's brief</Button>
            <Button variant={"outline_without_border"}>View live signal</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Feature1;
