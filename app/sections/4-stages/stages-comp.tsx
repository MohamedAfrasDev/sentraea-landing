import React from "react";
import StageCardComponent from "./components/stage-card-component";
import Stage1 from "@/public/stages/STAGE-1.png";
import Stage2 from "@/public/stages/STAGE-2.png";
import Stage3 from "@/public/stages/STAGE-3.png";
import Stage4 from "@/public/stages/STAGE-4.png";

import Stage1Dark from "@/public/stages/STAGE-1-DARK.png";
import Stage2Dark from "@/public/stages/STAGE-2-DARK.png";
import Stage3Dark from "@/public/stages/STAGE-3-DARK.png";
import Stage4Dark from "@/public/stages/STAGE-4-DARK.png";
import { useTheme } from "next-themes";

import ProblemValidationImage from "@/public/illustrations/problem-validation.svg";
import PMFDesignImage from "@/public/illustrations/product-market-fit.svg";
import ExperimentsImage from "@/public/illustrations/experiments.svg";
import ScaleImage from "@/public/illustrations/scale.svg";

const FourStagesSection = () => {
  const isDark = useTheme();

  return (
    <div className="flex flex-col items-start text-start gap-10">
      <h2 className="text-7xl tracking-tighter font-semibold capitalize flex-3 mt-10">
        One{" "}
        <span className="text-primary font-semibold font-number uppercase">
          workspace
        </span>
        <br />
        Four disciplined stages
      </h2>

      <div className="grid grid-cols-4 gap-5 flex-3">
        <StageCardComponent
          stage={"1"}
          title={"Problem & Idea Validation"}
          shortLine={
            "Prove the problem and niche are real before you touch an MVP."
          }
          image={ProblemValidationImage}
          mockup={isDark.resolvedTheme == "dark" ? Stage1Dark : Stage1}
        />
        <StageCardComponent
          stage={"2"}
          title={"PMF Design"}
          shortLine={
            "Turn a validated problem into a concrete offer, smallest MVP, and clear PMF plan."
          }
          image={PMFDesignImage}
          mockup={isDark.resolvedTheme == "dark" ? Stage2Dark : Stage2}
        />
        <StageCardComponent
          stage={"3"}
          title={"Experiments & PMF Signal"}
          shortLine={
            "Turn your PMF plan into real experiments and see how strong your signal really is."
          }
          image={ExperimentsImage}
          mockup={isDark.resolvedTheme == "dark" ? Stage3Dark : Stage3}
        />
        <StageCardComponent
          stage={"4"}
          title={"GTM & Scale Readiness"}
          shortLine={
            "Turn early traction into a focused GTM motion and know when you’re ready to scale"
          }
          image={ScaleImage}
          mockup={isDark.resolvedTheme == "dark" ? Stage4Dark : Stage4}
        />
      </div>
      <p className="text-2xl text-muted-foreground ">
        Sentraea stores every version, experiment, and decision so you see how
        v1 → v2 → v3 actually improved.
      </p>
    </div>
  );
};

export default FourStagesSection;
