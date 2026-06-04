import React from "react";
import { Card } from "./ui/card";
import { ArrowRight } from "lucide-react";

const GetStartedBtn = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <Card
      className={`group relative px-1 py-1 text-xl font-medium flex flex-row items-center select-none overflow-hidden cursor-pointer w-fit h-12 transition-all duration-300 ${className}`}
    >
      <p className="pl-2 pr-14 transition-all duration-500 ease-in-out group-hover:-translate-x-5 group-hover:opacity-0 whitespace-nowrap">
        {title}
      </p>
      <div className="absolute right-1 top-1 bottom-1 w-10 bg-primary/80 rounded-xs flex items-center justify-center transition-all duration-500 ease-in-out group-hover:w-[calc(100%-8px)]">
        <ArrowRight className="w-5 h-5 text-white transition-transform duration-500 ease-in-out group-hover:scale-110" />
      </div>
    </Card>
  );
};

export default GetStartedBtn;
