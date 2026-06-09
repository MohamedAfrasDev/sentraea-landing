import React from "react";
import PL1 from "@/public/pl/pl1.jpg";
import PL2 from "@/public/pl/pl2.jpg";
import PL3 from "@/public/pl/pl3.jpg";
import PL4 from "@/public/pl/pl4.jpg";
import PL5 from "@/public/pl/pl5.jpg";
import PL6 from "@/public/pl/pl6.jpg";
import PL7 from "@/public/pl/pl7.jpg";
import PL8 from "@/public/pl/pl8.jpg";

import BgOverlayCard from "./bg-overlay-card";
import BGCardText from "./bg-card-text";

const BGOverlayHero = () => {
  return (
    <div className="absolute  w-full h-full top-0 left-0 ">
      <BGCardText
        text="Roughly 90% of startups fail, with about 20% closing in their first year and 50% failing within five years"
        source="joinangora.com"
        style={{
          left: 10,
          top: 10,
          opacity: 0.5,
        }}
      />
      <BGCardText
        text=". The top causes of failure include building a product with no market need (42%), running out of cash (29%), and having the wrong team (23%)."
        source="joinangora.com"
        style={{
          left: 1100,
          top: 420,
          opacity: 0.5,
        }}
      />
    </div>
  );
};

export default BGOverlayHero;
