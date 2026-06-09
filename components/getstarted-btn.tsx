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
      className={`group shadow-2xl shadow-gray-500/50 bg-black dark:bg-white relative px-0.5 py-0.5 text-xl rounded-sm font-medium flex flex-row items-center select-none overflow-hidden cursor-pointer w-fit h-12 transition-all duration-300 ${className}`}
    >
      <p className="pl-2 pr-14 text-white dark:text-black transition-all duration-500 ease-in-out group-hover:-translate-x-5 group-hover:opacity-0 whitespace-nowrap">
        {title}
      </p>
      <div className="absolute right-0.5 top-0.5 bottom-0.5 w-10 bg-white dark:bg-black rounded-xs flex items-center justify-center transition-all duration-500 ease-in-out group-hover:w-[calc(100%-4px)]">
        <ArrowRight className="w-5 h-5 text-black dark:text-white transition-transform duration-500 ease-in-out group-hover:scale-110" />
      </div>
    </Card>
  );
};

export default GetStartedBtn;
