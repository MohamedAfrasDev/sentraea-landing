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
  Sparkles,
  TrendingDown,
  TrendingUp,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import UI from "@/public/illustrations/bg-hero-ui.png";
import Image from "next/image";
import Intercom from "@/public/connectors/Intercom_idJ9ed9vTR_0.svg";
import { Badge } from "@/components/ui/badge";
import IntercomLogo from "@/public/connectors/Intercom_idJ9ed9vTR_0.svg";
import HubSpot from "@/public/connectors/plausible_logo.svg";
import Stripe from "@/public/connectors/stripe-ar21.svg";
import { Button } from "@/components/ui/button";
import Plausible from "@/public/connectors/plausible_logo.svg";

function buildPath(container: HTMLElement): string | null {
  const q = (s: string) =>
    container.querySelector<HTMLElement>(`[data-conn='${s}']`);
  const t1 = q("tool1"),
    t2 = q("tool2"),
    t3 = q("tool3"),
    bn = q("bottleneck"),
    bf = q("brief");
  if (!t1 || !t2 || !t3 || !bn || !bf) return null;

  const cr = container.getBoundingClientRect();
  if (cr.width === 0) return null;

  const rel = (el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    return {
      left: r.left - cr.left,
      right: r.right - cr.left,
      bottom: r.bottom - cr.top,
      centerX: (r.left + r.right) / 2 - cr.left,
      centerY: (r.top + r.bottom) / 2 - cr.top,
    };
  };

  const r1 = rel(t1),
    r2 = rel(t2),
    r3 = rel(t3),
    rbn = rel(bn),
    rbf = rel(bf);
  const tx = Math.round(
    (Math.max(r1.right, r2.right, r3.right) + rbn.left) / 2,
  );
  const bnY = rbn.centerY;
  const bx = rbn.centerX + 130;

  return [
    `M${r1.right},${r1.centerY}H${tx}`,
    `M${r2.right},${r2.centerY}H${tx}`,
    `M${r3.right},${r3.centerY}H${tx}`,
    `M${tx},${Math.min(r1.centerY, bnY)}V${Math.max(r3.centerY, bnY)}`,
    `M${tx},${bnY}H${rbn.right}`,
    `M${bx},${rbn.bottom}V${rbf.centerY}`,
    `M${bx},${rbf.centerY}H${rbf.right}`,
  ].join("");
}

export function HeroDashboard() {
  const [pathD, setPathD] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const el = document.querySelector<HTMLElement>("[data-conn='container']");
      if (!el) return;
      const d = buildPath(el);
      if (d) setPathD(d);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      data-conn="container"
      className="relative w-full h-full items-start flex flex-col"
    >
      {pathD && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ overflow: "visible", zIndex: 0 }}
        >
          <path
            d={pathD}
            fill="none"
            stroke="var(--color-black)"
            strokeOpacity={0.4}
            strokeWidth={1.5}
            strokeDasharray="6 6"
            style={{
              animation: "connectorFlow 1s linear infinite",
              willChange: "stroke-dashoffset",
            }}
          />
        </svg>
      )}
      <div className="absolute z-1 top-0 gap-7 -left-22.5 w-fit flex flex-col  px-5 items-center justify-center">
        <div data-conn="tool1">
          <Card className="bg-card/60 px-4 py-4 items-center justify-center flex flex-col">
            <Image
              src={Plausible}
              alt="Plausible"
              width={100}
              height={100}
              className="mt-3"
            />
          </Card>
        </div>
        <div data-conn="tool2">
          <Card className="bg-card/60 px-4 py-4 items-center justify-center flex">
            <Image
              src={Intercom}
              alt="Plausible"
              width={100}
              height={100}
              className="mt-3"
            />
          </Card>
        </div>
        <div data-conn="tool3">
          <Card className="bg-card/60 px-4 py-0 items-center justify-center flex">
            <Image
              src={Stripe}
              alt="Plausible"
              width={100}
              height={100}
              className="mt-0"
            />
          </Card>
        </div>
      </div>
      <div data-conn="bottleneck" className="scale-85 ml-35 -left-10 -mt-7.5">
        <Card className="gap-0 bg-card/50 backdrop-blur-sm px-5 py-5">
          <p className="font-number text-muted-foreground uppercase text-xs">
            Active Bottleneck ● Detected Mon 07:12
          </p>

          <h2 className="font-heading font-semibold mt-2 text-2xl">
            Conversion bottleneck detected
          </h2>

          <p className="mt-2 text-muted-foreground">
            Traffic is healthy, but qualified conversion is slipping. Demo
            volume is up 11%, yet demo-t-close fell from 28% to 14% in three
            weeks - and the landing page still answers question nobody is
            asking.
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
        </Card>
      </div>

      <div data-conn="ai" className="absolute bottom-[-150px] right-10 z-1">
        <Card className="px-5 py-5 bg-card/20 backdrop-blur-sm">
          <Sparkles />
        </Card>
      </div>

      <div data-conn="brief" className="absolute  -bottom-70 right-50.5">
        <Card className="px-4 py-3 bg-card/40 backdrop-blur-sm md:min-w-88.75 md:max-w-fit w-full">
          <div className="flex justify-between items-center">
            <h3 className="tracking-tight">Monday Founder Brief</h3>
            <p className="font-number text-muted-foreground">Week 12</p>
          </div>
          <div>
            <h4 className="font-medium text-md">This week's bottleneck</h4>
            <p className="text-xl font-bold font-heading text-transparent bg-linear-to-r bg-clip-text from-foreground via-blue-300 to-blue-400">
              Conversion
            </p>
          </div>
          <Card className="px-3 ring-0 border-none py-2  gap-0 bg-linear-to-r from-card/70 via-primary/10 to-blue-100 ">
            <h4 className="font-medium text-md">One Highest-Leverage Move</h4>
            <p className="text-lg md:text-xl font-bold font-heading tracking-tight text-transparent bg-linear-to-r bg-clip-text from-primary via-primary/70 to-blue-800">
              Rewrite demo flow for ICP X
            </p>
          </Card>
          <div>
            <h4 className="font-medium text-md">Why This Matters:</h4>
            <p className="font-medium font-heading text-base w-fit text-foreground">
              Demo-to-close rate dropped from <br />
              <span className="text-transparent bg-linear-to-r bg-clip-text from-foreground via-blue-300 to-blue-400">
                {" "}
                28% → 14%
              </span>
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant={"outline_without_border"} className={"bg-card/60"}>
              Open this week's brief
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default HeroDashboard;
