/**
 * Sentraea landing page hero mockup component.
 * This component is designed to be displayed on the right side of the landing-page hero section.
 * It functions as a visual explainer of Sentraea's core value proposition:
 * "Know the one highest-leverage move for your SaaS every week."
 *
 * Visual Style:
 * - Clean white card, thin neutral borders, soft shadows, rounded corners.
 * - Warm/yellow bottleneck alert accent, blue move accent line.
 * - Custom inline SVG representations for integration signal chips.
 * - Tiny inline CSS/SVG sparkline decorative trend strip.
 */

"use client";

import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  Check,
  Signal,
  TrendingDown,
  TrendingUp,
  X,
} from "lucide-react";
import React from "react";
import UI from "@/public/illustrations/bg-hero-ui.png";
import Image from "next/image";
import Hubspot from "@/public/connectors/hubspot.svg";
import Intercom from "@/public/connectors/Intercom_idJ9ed9vTR_0.svg";
import { Badge } from "@/components/ui/badge";
import IntercomLogo from "@/public/connectors/Intercom_idJ9ed9vTR_0.svg";
import HubSpot from "@/public/connectors/plausible_logo.svg";
import Stripe from "@/public/connectors/stripe-ar21.svg";
import { Button } from "@/components/ui/button";
export function HeroDashboard() {
  return (
    <div className="relative w-full h-full">
      <Card className="py-4 bg-card/60 z-0 top-[-100px] scale-70  right-[-50px] max-w-[240px] absolute gap-0 backdrop-blur-md w-fit px-5">
        <Image
          src={Hubspot}
          alt="Hubspot"
          className="w-[50px] h-[40px]  mt-2"
          width={100}
          height={100}
        />
        <span>
          {" "}
          <h2 className="font-semibold text-xl">28% → 14%</h2>
          <p className="text-muted-foreground text-[13px]">
            Demo-t-close across 34 oppurtunities. The slide is isolated to SMB
            inbound - enterprise closes are flat.
          </p>
          <div className="flex items-center  mt-1 justify-between">
            <TrendingDown size={14} className="text-red-500 mt-1" />

            <span className="flex text-xs font-medium text-primary items-center gap-1">
              <p>Source Trail</p>
              <ArrowRight size={15} />
            </span>
          </div>{" "}
        </span>
      </Card>

      <Card className="z-2 absolute bottom-[-200px] scale-70 left-[-90px] px-4 bg-card/70 backdrop-blur-lg py-4">
        <div className="flex justify-between">
          <Image
            src={Intercom}
            alt="Intercom"
            className=" px-3"
            width={130}
            height={100}
          />

          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <p className="text-muted-foreground text-xs">Synced 9 min ago</p>
          </span>
        </div>

        <div>
          <p className="uppercase text-muted-foreground font-number">
            Execution boundaries
          </p>
          <Card className="bg-muted-foreground/5 mt-2 flex gap-2 flex-row px-2 py-2 rounded-sm">
            <Check className="text-green-500" />
            <p className="text-muted-foreground">
              Reads conversations for objection themes
            </p>
          </Card>
          <Card className="bg-muted-foreground/5 mt-2 flex gap-2 flex-row px-2 py-2 rounded-sm">
            <X className="text-red-500" />
            <p className="text-muted-foreground">Never replies to a customer</p>
          </Card>
        </div>
        <div>
          <p className="font-number uppercase text-muted-foreground">
            What it reads
          </p>
          <p>Support threads, auto-tags, call notes, CSAT trend</p>
        </div>
      </Card>

      <Card className="gap-0 bg-card/80 backdrop-blur-lg px-5 py-5">
        <p className="font-number text-muted-foreground uppercase text-xs">
          Active Bottleneck ● Detected Mon 07:12
        </p>

        <h2 className="font-heading font-semibold mt-2 text-2xl">
          Conversion bottleneck detected
        </h2>

        <p className="mt-2 text-muted-foreground">
          Traffic is healthy, but qualified conversion is slipping. Demo volume
          is up 11%, yet demo-t-close fell from 28% to 14% in three weeks - and
          the landing page still answers question nobody is asking.
        </p>

        <Card className="mt-3 px-3 py-3 bg-card/20 shadow-md grid grid-cols-1 md:grid-cols-2 gap-1">
          <div>
            <p>Confidence</p>
            <span className="flex items-center gap-1 mt-1">
              <Signal className="text-primary" />
              <p className="font-medium">High | 214 signals | 7 tools</p>
            </span>
          </div>
          <div className="mt-5 md:mt-0">
            <p>Target metric</p>
            <span className="font-medium text-lg">Demo-to-close rate</span>
          </div>

          <div className="col-span-1 md:col-span-2 mt-2">
            <p>Contributing sources</p>
            <div className="flex flex-wrap gap-1 mt-1">
              <Badge className="bg-card/50 px-3 py-3 text-black">
                <Image src={HubSpot} alt="HubSpot" width={55} height={55} />
              </Badge>
              <Badge className="bg-card/50 px-3 py-3 text-black">
                <Image
                  src={IntercomLogo}
                  alt="Intercom"
                  width={55}
                  height={55}
                />
              </Badge>
              <Badge className="bg-card/50 px-3 py-3 text-black">
                <Image src={Stripe} alt="Stripe" width={55} height={55} />
              </Badge>
            </div>
          </div>
        </Card>

        <div className="mt-5 flex gap-2">
          <Button>Open this week's brief</Button>
          <Button variant={"outline_without_border"}>View live signals</Button>
        </div>
      </Card>
    </div>
  );
}

export default HeroDashboard;
