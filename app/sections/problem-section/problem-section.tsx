import { Card } from "@/components/ui/card";
import React from "react";

const ProblemSection = () => {
  const problem_list = [
    "You have an idea but don't know if it's real or just exciting",
    "You don't know what to do first, second, or third",
    "You see a competitor ship something and panic-pivot",
    "You build for months based on assumptions, not evidence",
    "You don't know whether to validate, wait, pivot, or build",
    "You're solo — there's no one to pressure-test your thinking",
  ];
  return (
    <div className="px-10 flex gap-10 h-screen justify-start items-center">
      <div className="flex-1 w-full">
        <h2 className="text-4xl font-semibold md:text-6xl text-start font-heading text-foreground/85 tracking-tight leading-14 md:leading-17">
          Most solo founders
          <br /> fail <span className=" text-primary">before</span> they build.
        </h2>

        <div className="flex flex-col gap-4 mt-10">
          {problem_list.map((problem, index) => {
            return (
              <div key={index} className="flex gap-2 ">
                <div className="h-px w-[20px] bg-black mt-3" />
                <p className="text-xl text-muted-foreground">{problem}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <Card className="px-4 py-4 border-l-4 border-l-primary rounded-l-none">
          <p className="font-heading font-semibold text-lg">
            "I spent 6 months building something nobody wanted. I had no system.
            I just had conviction — and a lot of wasted runway."
          </p>
          <span className="text-muted-foreground">
            — Early founder feedback (paraphrased, unverified)
          </span>
        </Card>

        <div className="grid grid-cols-2 gap-x-4 gap-y-5 mt-10">
          <Card className="gap-3 px-4 py-4">
            <h3 className="font-number font-medium text-5xl text-primary">
              42%
            </h3>
            <p className="text-muted-foreground">
              of startups fail because they build something the market doesn't
              need
            </p>
          </Card>

          <Card className="gap-3 px-4 py-4">
            <h3 className="font-number font-medium text-5xl text-primary">
              90%
            </h3>
            <p className="text-muted-foreground">
              of solo bootstrapped startups never reach $1K MRR
            </p>
          </Card>
          <Card className="gap-3 px-4 py-4">
            <h3 className="font-number font-medium text-5xl text-primary">0</h3>
            <p className="text-muted-foreground">
              systems exist specifically for solo pre-revenue founders
            </p>
          </Card>
          <Card className="gap-3 px-4 py-4">
            <h3 className="font-number font-medium text-5xl text-primary">1</h3>
            <p className="text-muted-foreground">
              founder with a proven execution system beats 10 without one
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProblemSection;
