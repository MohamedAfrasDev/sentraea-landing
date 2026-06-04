import React from "react";
import StageCardComponent from "./components/stage-card-component";

const FourStagesSection = () => {
  return (
    <div className="flex flex-col items-start text-start gap-10">
      <h2 className="text-7xl tracking-tighter font-medium capitalize flex-3 mt-10">
        One <span className="text-primary">workspace</span>. <br />
        Four disciplined stages
      </h2>

      <div className="grid grid-cols-4 gap-5 flex-3">
        <StageCardComponent
          stage={"1"}
          title={"Problem & Idea Validation"}
          shortLine={
            "Prove the problem and niche are real before you touch an MVP."
          }
          image="https://img.icons8.com/ios/500/idea--v1.png"
        />
        <StageCardComponent
          stage={"2"}
          title={"PMF Design"}
          shortLine={
            "Turn a validated problem into a concrete offer, smallest MVP, and clear PMF plan."
          }
          image="https://img.icons8.com/ios/500/stall.png"
        />
        <StageCardComponent
          stage={"3"}
          title={"Experiments & PMF Signal"}
          shortLine={
            "Turn your PMF plan into real experiments and see how strong your signal really is."
          }
          image="https://img.icons8.com/ios/500/share-2--v1.png"
        />
        <StageCardComponent
          stage={"4"}
          title={"GTM & Scale Readiness"}
          shortLine={
            "Turn early traction into a focused GTM motion and know when you’re ready to scale"
          }
          image="https://img.icons8.com/ios/500/positive-dynamic--v1.png"
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
