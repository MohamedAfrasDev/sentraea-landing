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

const BGOverlayHero = () => {
  return (
    <div className="absolute  w-full h-full top-0 left-0 ">
      <BgOverlayCard image={PL1} top={10} left={10} scale={0.6} opacity={0.5} />
      <BgOverlayCard
        image={PL2}
        top={10}
        left={120}
        scale={0.5}
        opacity={0.2}
      />
      <BgOverlayCard
        image={PL3}
        top={120}
        left={10}
        scale={0.6}
        opacity={0.1}
      />
      <BgOverlayCard
        image={PL4}
        top={120}
        left={120}
        scale={0.9}
        opacity={0.6}
      />
      <BgOverlayCard
        image={PL5}
        top={240}
        left={10}
        scale={0.99}
        opacity={0.7}
      />
      <BgOverlayCard image={PL6} top={350} left={120} scale={1} opacity={1} />
      <BgOverlayCard
        image={PL7}
        top={460}
        left={10}
        scale={1.1}
        opacity={0.5}
      />
      <BgOverlayCard image={PL8} top={570} left={120} scale={1} opacity={0.7} />

      {/* RIGH */}
      <BgOverlayCard image={PL1} top={10} scale={1.1} left={1300} opacity={1} />
      <BgOverlayCard
        image={PL2}
        top={10}
        scale={0.7}
        left={1190}
        opacity={0.4}
      />

      <BgOverlayCard
        image={PL4}
        top={120}
        scale={0.9}
        left={1300}
        opacity={0.7}
      />
      <BgOverlayCard image={PL5} top={240} scale={1} left={1300} opacity={1} />
      <BgOverlayCard image={PL6} top={350} scale={1} left={1300} opacity={1} />
      <BgOverlayCard image={PL7} top={460} scale={1} left={1300} opacity={1} />
      <BgOverlayCard image={PL8} top={570} scale={1} left={1300} opacity={1} />
    </div>
  );
};

export default BGOverlayHero;
