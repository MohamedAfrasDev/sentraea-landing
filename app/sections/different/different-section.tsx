import { Card } from "@/components/ui/card";
import { icons } from "lucide-react";
import React from "react";

const DifferentSection = () => {
  const without_system = [
    { title: "Idea", description: "Feels exciting, feels real", icon: "💡" },
    {
      title: "Build immediately",
      description: "3 months of product work",
      icon: "🔨",
    },
    {
      title: "Competitor ships something",
      description: "Panic. Pivot. Rebuild.",
      icon: "😰",
    },
    {
      title: "No users. No revenue.",
      description: "Wrong product. Wrong market.",
      icon: "🧱",
    },
    {
      title: "Quit or restart",
      description: "6 months lost. Runway gone.",
      icon: "🏳",
    },
  ];
  const with_system = [
    {
      title: "Idea enters Stage 1A",
      description: "System assigns next action",
      icon: "💡",
    },
    {
      title: "Validate with real conversations",
      description: "Evidence gate requires proof",
      icon: "🗣",
    },
    {
      title: "Signal confirmed",
      description: "Competitor noise filtered out",
      icon: "📊",
    },
    {
      title: "Build what's been validated",
      description: "Right thing. Right time. Right order.",
      icon: "🏗",
    },
    {
      title: "Progress with evidence",
      description: "Each stage locked until earned",
      icon: "📈",
    },
  ];
  return (
    <div className="bg-white flex flex-col justify-center min-h-screen h-full px-10 py-10">
      <h2 className="font-heading font-semibold text-4xl md:text-6xl md:leading-15 text-center">
        Two founders. <br />
        <span className=" text-primary">
          {" "}
          Same idea. Different <br />
          outcomes.
        </span>
      </h2>

      <div className="flex gap-5 justify-center mt-10">
        <div>
          <h3 className="text-2xl font-medium text-center">Without a system</h3>

          <div className="flex flex-col gap-5 mt-10 ">
            {without_system.map((system, index) => {
              return (
                <Card
                  className="flex flex-row gap-5 shadow-sm bg-card/50 px-4 py-4"
                  key={index}
                >
                  <p className="text-xl">{system.icon}</p>
                  <div>
                    <h4 className="text-xl">{system.title}</h4>
                    <p className="text-muted-foreground">
                      {system.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        <h4 className="text-2xl font-medium self-center text-center">vs</h4>
        <div>
          <h3 className="text-2xl font-medium text-center">With a system</h3>

          <div className="flex flex-col gap-5 mt-10">
            {with_system.map((system, index) => {
              return (
                <Card
                  className="flex flex-row gap-5 shadow-sm bg-primary/5 px-4 py-4"
                  key={index}
                >
                  <p className="text-xl">{system.icon}</p>
                  <div>
                    <h4 className="text-xl">{system.title}</h4>
                    <p className="text-muted-foreground">
                      {system.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DifferentSection;
