import React from "react";
import { Problem } from "./problem";
import { ArrowDown } from "lucide-react";

const ProblemMain = () => {
  return (
    <div className="flex flex-col relative pb-10">
      {" "}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#cacccf_1px,transparent_1px)] bg-size-[15px_15px] dark:bg-[radial-gradient(#4f5052_1px,transparent_1px)] opacity-70 mask-[radial-gradient(ellipse_70%_30%_at_70%_30%,#000_60%,transparent_100%)]" />
      <Problem />
      <div className="mt-10 text-center relative">
        <p className="text-4xl md:text-8xl font-heading font-medium tracking-tighter">
          Did we work on the thing that actually mattered most?
        </p>
        <p className="text-xl md:text-3xl  mt-4">
          You're not short on effort. You're short on clarity.{" "}
        </p>
        <p className="text-xl md:text-3xl mt-10">
          You don't need another dashboard.{" "}
        </p>
        <p className="text-xl md:text-3xl mt-1">
          You need one clear answer every Monday.{" "}
        </p>
        <p className="text-5xl mt-3 text-primary font-heading font-medium tracking-tight">
          {" "}
          Where should we focus this week?
        </p>

        <ArrowDown size={70} className="text- text-center mx-auto mt-4" />
      </div>
    </div>
  );
};

export default ProblemMain;
