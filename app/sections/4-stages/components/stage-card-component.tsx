import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import React from "react";

interface StageCardComponentProps {
  stage: string;
  title: string;
  shortLine: string;
  image: StaticImageData;
  mockup: StaticImageData;
  className?: string;
  evidence: string;
  source: string;
  scale?: number;
}

const StageCardComponent = ({
  stage,
  title,
  shortLine,
  image,
  mockup,
  className,
  evidence,
  source,
  scale,
}: StageCardComponentProps) => {
  return (
    <Card
      className={cn(
        "text-start px-10 w-full  py-3 gap-0 flex flex-col md:flex-row shadow-2xl items-start  bg-card/60",
        className,
      )}
    >
      <div>
        <Image
          src={image}
          alt="icon"
          width={1000}
          className="  max-h-[300px]  min-h-[300px] p-6 "
          style={{
            scale: scale ? scale : 1,
          }}
        />
      </div>
      <div className="flex flex-col justify-between px-5 py-6 min-h-fit gap-5">
        <div>
          <p className="text-md uppercase font-number text-muted-foreground tracking-[0.2rem]">
            Stage {stage}
          </p>
          <h2 className="text-3xl font-heading font-bold z-10 ">{title}</h2>
          <p className="text-lg mt-3 tracking-tight z-10 ">{shortLine}</p>
        </div>
        <div className="h-full bg-gray-100/50 px-5 py-3 rounded-sm">
          <p className="text-muted-foreground italic">{evidence}</p>
          <span className="text-primary/70 italic text-xs">{source}</span>
        </div>
      </div>
    </Card>
  );
};

export default StageCardComponent;
