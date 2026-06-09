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
}

const StageCardComponent = ({
  stage,
  title,
  shortLine,
  image,
  mockup,
  className,
}: StageCardComponentProps) => {
  return (
    <Card
      className={cn(
        "text-start p-0 gap-0 flex flex-row h-fit shadow-2xl   bg-card/40",
        className,
      )}
    >
      <div>
        <Image
          src={image}
          alt="icon"
          width={250}
          className=" min-h-[320px] max-h-[300px] p-6   w-full "
        />
      </div>
      <div className="flex flex-col px-5 py-6 h-full ">
        <p className="text-md uppercase font-number text-muted-foreground tracking-[0.2rem]">
          Stage {stage}
        </p>
        <h2 className="text-3xl font-semibold z-10 font-heading">{title}</h2>
        <p className="text-sm mt-3 z-10 text-muted-foreground">{shortLine}</p>
      </div>
    </Card>
  );
};

export default StageCardComponent;
