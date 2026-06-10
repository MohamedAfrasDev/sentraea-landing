import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

const AddOnsCard = () => {
  const addOns = [
    {
      id: 1,
      title: "Extra workspace",
      value: "29",
    },
    {
      id: 2,
      title: "Extra seat on Growth & above",
      value: "129",
    },
    {
      id: 3,
      title: "AI Research Pack for a fixed bundle of extra deep runs",
      value: "20",
    },
  ];
  return (
    <Card className="mt-15 flex flex-row text-start px-5 py-5 gap-0">
      <div className="flex-1">
        <h2 className="text-3xl font-semibold tracking-tight  font-heading">
          Add-ons
        </h2>
        <p
          className={cn(
            "text-lg leading-[20px] tracking-tighter text-muted-foreground mt-3",
          )}
        >
          {"Usage based"}
        </p>
      </div>

      <div className="flex-2 grid grid-cols-3">
        {addOns.map((item) => (
          <div className="flex flex-col gap-5 justify-between">
            <h3 className="text-xl tracking-tighter font-medium">
              {item.title}
            </h3>
            <p className="text-2xl font-bold font-number">${item.value}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AddOnsCard;
