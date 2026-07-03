import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  InputGroup,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import React from "react";

const EarlyAccessCard = () => {
  const stage = [
    "Just an idea",
    "Build something",
    "Launched, no user yet",
    "Have early users",
  ];
  return (
    <div className="z-10">
      <Card className="gap-0 w-full text-center  backdrop-blur-md px-5 py-4   ">
        <h2 className="text-3xl font-medium ">Get Early Access</h2>
        <InputGroup className="mt-5">
          <InputGroupInput
            id="email"
            name="email"
            type="email"
            placeholder="Enter Your Email"
          />
        </InputGroup>

        <div className="text-start mt-4">
          <span className="text-muted-foreground">Where are you now?</span>
          <div className="flex flex-wrap gap-x-5 mt-2 gap-y-2">
            {stage.map((stages, index) => {
              return (
                <div key={index}>
                  <Button
                    variant={"outline_without_border"}
                    className={"px-2 py-1 bg-card/80 shadow-sm "}
                  >
                    {stages}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="text-start mt-4">
          <span className="text-muted-foreground">
            What's the one thing you wish you knew before you started building?
            (optional)
          </span>

          <InputGroup className=" mt-2">
            <InputGroupTextarea placeholder="e.g. I wish I'd talked to 10 people before writing a line of code" />
          </InputGroup>
        </div>

        <Button className={"mt-4"}>Get Early Access</Button>
      </Card>
    </div>
  );
};

export default EarlyAccessCard;
