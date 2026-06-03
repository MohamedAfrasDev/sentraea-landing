import { Card } from "@/components/ui/card";
import React from "react";

interface StageCardComponentProps {
  stage: string;
  title: string;
  shortLine: string;
  subLine: string;
}

const StageCardComponent = ({
  stage,
  title,
  shortLine,
  subLine,
}: StageCardComponentProps) => {
  return (
    <Card className="text-start">
      <p className="text-xl">Stage {stage}</p>
      <h2 className="text-4xl font-medium z-10">{title}</h2>
      <p className="text-sm mt-3 z-10">{shortLine}</p>
    </Card>
  );
};

export default StageCardComponent;
