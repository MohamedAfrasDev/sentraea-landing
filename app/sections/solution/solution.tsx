import {
  CalendarCheck,
  Minus,
  ScanSearch,
  Sparkles,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { Container, Section, SectionHeading } from "../shared/section";
import { Reveal } from "../shared/reveal";
import { Card } from "@/components/ui/card";
import {
  MiniScreen,
  SolutionMiniScreens,
} from "@/app/components/mockups/solution-mini-screens";
import BGUI from "@/public/sol-cta.svg";
import DARKBG from "@/public/dark-blue-bg.jpg";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const SUMMARY_ROWS = [
  { label: "Trials", value: "+12%", trend: "up" },
  { label: "Demo→Close", value: "−18%", trend: "down" },
  { label: "Churn", value: "Stable", trend: "flat" },
] as const;

const FUNNEL_CHECKS = [
  { label: "Demand", healthy: true },
  { label: "Activation", healthy: true },
  { label: "Conversion", healthy: false },
] as const;

const DEPRIORITIZED = [
  "New blog series",
  "Side integration",
  "Homepage redesign",
] as const;
function TrendIcon({ trend }: { trend: "up" | "down" | "flat" }) {
  if (trend === "flat") {
    return (
      <span className="size-1.5 rounded-full bg-neutral-400" aria-hidden />
    );
  }
  const isUp = trend === "up";
  return (
    <svg
      className={`size-3 ${isUp ? "text-emerald-500" : "text-rose-500"}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points={isUp ? "18 15 12 9 6 15" : "6 9 12 15 18 9"} />
    </svg>
  );
}
const FEATURES = [
  {
    icon: CalendarCheck,
    title: "Weekly Leverage Brief",
    body: "Get one clear move for the week — based on what changed across your business, not generic advice.",
    widget: (
      <Card className="px-5 py-5 text-start w-full">
        <div className="flex justify-between">
          <p>Monday Founder Brief</p>
          <p className="font-number">Week 12</p>
        </div>

        <div>
          <p className="font-medium">This week's bottleneck</p>
          <div className="flex justify-between items-center">
            <p className="font-medium text-xl">Conversion</p>
            <Badge className="rounded-sm">Attention</Badge>
          </div>
        </div>
        <div>
          <p className="font-medium">One Highest-Leverage Move</p>
          <span className="font-medium text-xl flex gap-1 items-center">
            <ArrowRight /> <p>Rewrite demo flow for ICP X</p>
          </span>
        </div>
        <div>
          <p className="font-medium"> Why This Matters:</p>
          <div className="flex justify-between items-center">
            <p className=" text-lg">
              Demo-to-close rate dropped from 28% → 14%{" "}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button>Open this week's brief</Button>
          <Button variant={"outline"}>View signals</Button>
        </div>
      </Card>
    ),
  },
  {
    icon: ScanSearch,
    title: " Cross-Tool Signals",
    body: "Connect your stack and let Sentraea track what changed across analytics, CRM, billing, support, and your landing page",
    widget: (
      <Card className="px-5 py-5 text-start w-full">
        <div className="flex justify-between">
          <p>Live Signals</p>
          <p className="font-number">Last sync: 4m ago</p>
        </div>

        <div></div>
        <div className="flex gap-2">
          <Button>Open this week's brief</Button>
          <Button variant={"outline"}>View signals</Button>
        </div>
      </Card>
    ),
  },
  {
    icon: Sparkles,
    title: "One Recommended Move",
    body: "One clear, high-leverage action based on your data.",
    widget: (
      <MiniScreen label="This week's move">
        <div className="space-y-1 border-l-2 border-blue-500 py-0.5 pl-3">
          <p className="text-xs font-semibold leading-snug text-neutral-900">
            Rewrite demo flow for ICP X
          </p>
          <p className="text-[11px] leading-snug text-neutral-500">
            Close rate fell 3 weeks straight
          </p>
        </div>
      </MiniScreen>
    ),
  },
  {
    icon: ShieldCheck,
    title: "What to Ignore for Now",
    body: "Helps you cut low-impact distractions.",
    widget: (
      <MiniScreen label="Deprioritized">
        <ul className="space-y-1.5">
          {DEPRIORITIZED.map((item) => (
            <li
              key={item}
              className="rounded-md border border-neutral-200/40 bg-neutral-50 px-2 py-1 text-[11px] font-medium text-neutral-400 line-through decoration-neutral-300"
            >
              {item}
            </li>
          ))}
        </ul>
      </MiniScreen>
    ),
  },
] as const;

export function Solution() {
  return (
    <Section id="solution" className="min-h-screen max-w-fit relative  ">
      {/* <Image
        src={DARKBG}
        alt="BG"
        width={10000}
        height={1000}
        className="absolute z-0 h-full px-5 rounded-4xl py-4"
      /> */}
      <div
        className="absolute inset-0 opacity-[0.2] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />{" "}
      <div
        className="absolute inset-0 opacity-[0.2] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      <Container className="relative flex px-5 h-full justify-center flex-col items-center">
        <div className="text-center items-center px-5 flex-2">
          <p className="uppercase font-number text-primary">The Solution</p>

          <h2 className=" text-4xl md:text-[4rem] tracking-[-2px]  md:tracking-[-4px] md:leading-[70px] font-medium bg-linear-to-r bg-clip-text text-transparent from-foreground via-blue-800/70  to-blue-800 font-heading">
            Sentraea helps you decide what matters most this week.{" "}
          </h2>
          <p className="mt-5 md:mt-5 text-xl">
            {" "}
            Once a week, Sentraea reviews your growth signals and gives you a
            focused recommendation based on what is happening in your business
            right now.
          </p>
        </div>
        <div className="grid rounded-none w-full px-15 mt-10  grid-cols-1 md:grid-cols-1      gap-0">
          {FEATURES.map((feature, index) => {
            return (
              <div
                key={index}
                className={cn(
                  "p-10 text-center items-center flex h-[calc(100vh-15rem)] flex-col md:flex-row gap-30",
                )}
              >
                <div
                  className={cn("w-full flex-1", index % 2 == 0 && "hidden")}
                >
                  {feature.widget}
                </div>
                <div className="w-fit flex-1">
                  {/* <div className="bg-primary/10 p-2 mb-4 rounded-xl w-fit">
                    <feature.icon className="text-primary text-xl " />
                  </div> */}
                  <h3 className="text-4xl text-start font-heading font-medium tracking-[-1px]">
                    {feature.title}
                  </h3>
                  <p className="text-lg mt-2 text-start text-muted-foreground">
                    {feature.body}
                  </p>
                </div>
                <div
                  className={cn("w-full flex-1", index % 2 != 0 && "hidden")}
                >
                  {feature.widget}
                </div>
              </div>
            );
          })}
        </div>
        <Reveal delay={0.15} className="mt-4 w-full">
          <SolutionMiniScreens />
        </Reveal>
      </Container>
    </Section>
  );
}
