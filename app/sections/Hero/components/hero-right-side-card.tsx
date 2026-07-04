import { Card } from "@/components/ui/card";
import React from "react";

const HeroRightSideCard = () => {
  return (
    <div className="flex gap-1">
      <div>
        <Card>
          <h2>1A</h2>
        </Card>
      </div>

      <div>
        <Card>
          <h2>1B</h2>
        </Card>
      </div>
      <div>
        <Card>
          <h2>2</h2>
        </Card>
      </div>
      <div>
        <Card>
          <h2>3</h2>
        </Card>
      </div>
      <div>
        <Card>
          <h2>4</h2>
        </Card>
      </div>
    </div>
  );
};

export default HeroRightSideCard;
