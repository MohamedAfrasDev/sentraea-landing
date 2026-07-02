"use client";

import React from "react";
import GridCard from "./components/grid-card";
import WorkspaceUi from "@/public/icons/WORKSPACE-UI.svg";
import WorkspaceUIDARK from "@/public/icons/WORKSPACE-UI-DARK.svg";
import Image from "next/image";
import { useTheme } from "next-themes";

const WhatIsSentraea = () => {
  const { theme } = useTheme();
  return (
    <section className="flex flex-col gap-1 py-24 md:py-32">
      <p className="text-sm uppercase tracking-[0.2em] text-primary font-medium">
        The System
      </p>
      <h2 className="text-4xl md:text-6xl font-medium tracking-tight md:tracking-[-3px] mt-3 max-w-4xl text-balance">
        Sentraea doesn&apos;t build for you. It makes sure you build the right
        thing, in the right order.
      </h2>
      <h3 className="text-lg md:text-xl text-muted-foreground mt-4 tracking-tight max-w-2xl">
        This isn&apos;t an AI cofounder, and it won&apos;t write your code or
        your copy. It sits above your work — assigns your stage, tells you
        what&apos;s next, and won&apos;t let you skip ahead without proof.
      </h3>

      <div className="flex flex-col md:flex-row gap-5 items-start mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 h-full gap-4 flex-2 w-full">
          <GridCard
            title={"Assigns Your Stage"}
            desc={
              "One playbook, matched to exactly where your startup is — not a generic checklist."
            }
            isFocal={true}
          />
          <GridCard
            title={"Requires Evidence"}
            desc={
              "No stage clears on vibes. You bring proof, or you don't move forward."
            }
            isFocal={false}
          />
          <GridCard
            title={"Blocks Premature Building"}
            desc={
              "Can't jump to build mode until validation actually clears the gate."
            }
            isFocal={false}
          />
          <GridCard
            title={"Tracks Every Decision"}
            desc={"See what you tried, what happened, and why you moved on."}
            isFocal={false}
          />
        </div>
        <div className="text-start -mt-5 flex-1 w-full">
          <p className="text-md tracking-tighter text-muted-foreground text-left">
            INSIDE WORKSPACE
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatIsSentraea;
