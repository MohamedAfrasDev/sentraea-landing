import React from "react";
import ProblemMain from "../sections/problem/problem-main";
import GrowthConstraint from "../sections/growth/growth-constraint";

const Page = () => {
  return (
    <div className="flex flex-col gap-20">
      <ProblemMain />
      <GrowthConstraint />
    </div>
  );
};

export default Page;
