import { Card } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

interface StageCardComponentProps {
  stage: string;
  title: string;
  shortLine: string;
  image: string;
}

const StageCardComponent = ({
  stage,
  title,
  shortLine,
  image,
}: StageCardComponentProps) => {
  return (
    <Card className="text-start gap-0 bg-card/40">
      <div className="flex gap-2 items-center">
        <Image
          src={image}
          alt="icon"
          width={20}
          height={20}
          className="dark:invert"
        />
        <p className="text-lg uppercase font-number text-muted-foreground tracking-[0.2rem]">
          Stage {stage}
        </p>
      </div>
      <div className="flex flex-col justify-between h-full mt-2">
        <h2 className="text-4xl font-medium z-10">{title}</h2>
        <p className="text-sm mt-3 z-10">{shortLine}</p>
      </div>
    </Card>
  );
};

export default StageCardComponent;
