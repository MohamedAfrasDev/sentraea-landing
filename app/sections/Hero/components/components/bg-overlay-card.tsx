import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import React from "react";

const BgOverlayCard = ({
  image,
  top,
  left,
  scale,
  opacity,
}: {
  image: StaticImageData;
  top: number;
  left: number;
  scale: number;
  opacity: number;
}) => {
  return (
    <div>
      <Image
        src={image}
        alt="bg-overlay"
        width={1000}
        height={1000}
        className={cn(`w-[100px] rounded-md absolute backdrop-blur-2xl`)}
        style={{
          top: `${top}px`,
          opacity: opacity,
          scale: scale,
          left: `${left}px`,
        }}
      />
    </div>
  );
};

export default BgOverlayCard;
