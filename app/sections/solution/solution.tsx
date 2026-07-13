import {
  CalendarCheck,
  Minus,
  ScanSearch,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { Container, Section, SectionHeading } from "../shared/section";
import { Reveal } from "../shared/reveal";
import { Card } from "@/components/ui/card";

const FEATURES = [
  {
    icon: CalendarCheck,
    title: "Weekly Founder Brief",
    body: "One compact summary of where your business actually stands.",
  },
  {
    icon: ScanSearch,
    title: "Bottleneck Diagnosis",
    body: "Demand, conversion, activation, retention, or systems — pinpointed.",
  },
  {
    icon: Sparkles,
    title: "One Recommended Move",
    body: "One focus for the week, backed by your own numbers.",
  },
  {
    icon: ShieldCheck,
    title: "What NOT To Do",
    body: "Ignore distractions with confidence, not guilt.",
  },
] as const;

/** Larger analytics-style brief card shown beside the feature list. */
function SolutionDashboard() {
  return (
    <div className="relative">
      <div
        className="absolute -inset-6 rounded-[2rem] bg-linear-to-br from-primary/10 via-cyan-400/5 to-indigo-500/10 blur-2xl"
        aria-hidden
      />
      <Card className="relative bg-card/80 backdrop-blur-sm p-6 gap-0 shadow-[0_32px_80px_-28px_rgba(30,58,138,0.28)] md:p-8">
        <div className="flex items-center justify-between pb-4">
          <p className="font-heading text-sm font-medium tracking-tight text-foreground">
            This week&apos;s brief
          </p>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Sentraea
          </span>
        </div>

        <div className="mt-5 space-y-5">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              This week&apos;s bottleneck
            </p>
            <p className="mt-1.5 inline-flex items-center gap-2 rounded-sm border border-amber-200/40 shadow-sm bg-amber-50/80 px-3 py-1.5 font-heading text-base font-semibold tracking-tight text-amber-900">
              Conversion
            </p>
          </div>

          <Card className=" gap-2 bg-linear-to-br from-primary/6 to-indigo-500/4 p-4">
            <p className="text-[11px] font-medium uppercase tracking-wider text-primary">
              Recommended move
            </p>
            <p className="mt-1.5 font-heading text-lg font-semibold leading-snug tracking-tight text-foreground">
              Rewrite demo flow for ICP X
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Test on 5 calls
            </p>
          </Card>

          <Card className="bg-card/30 p-4">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Reason
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground">
              Demo-to-close dropped from{" "}
              <span className="font-number font-medium">28%</span> to{" "}
              <span className="font-number font-medium text-rose-600">14%</span>
            </p>
          </Card>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Ignore
            </p>
            <ul className="mt-2 space-y-1.5">
              {["Blog series", "Side integration", "Untested outbound"].map(
                (item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Minus className="size-3.5 text-black/25" aria-hidden />
                    <span className="line-through decoration-black/20">
                      {item}
                    </span>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}

export function Solution() {
  return (
    <Section
      id="solution"
      className="bg-linear-to-b from-transparent via-primary/2.5 to-transparent"
    >
      <Container>
        <div className="text-center items-center">
          <p className="uppercase font-number text-primary">The Solution</p>

          <h2 className=" text-4xl md:text-[3.5rem] md:leading-[80px] font-medium bg-linear-to-r bg-clip-text text-transparent from-foreground via-blue-800/70  to-blue-500 font-heading tracking-[-2px] md:tracking-[-3px]">
            Sentraea is your weekly decision layer.
          </h2>
          <p className="mt-5 md:mt-0">
            {" "}
            Sentraea doesn&apos;t replace your tools. It sits on top of them.
            Every week it analyzes your context, finds your bottleneck, and
            recommends the one highest-leverage move.
          </p>
        </div>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-3">
            {FEATURES.map(({ icon: Icon, title, body }, i) => (
              <Reveal key={title} delay={0.08 * i}>
                <div className="group flex gap-4 rounded-md border border-transparent p-4 transition-all duration-300 hover:border-black/6 hover:bg-white/70 hover:shadow-[0_16px_40px_-24px_rgba(30,58,138,0.25)]">
                  <div className="inline-flex size-11 shrink-0 items-center justify-center rounded-md bg-primary/6 text-primary">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <div>
                    <h3 className="font-heading font-medium text-xl tracking-tight text-foreground">
                      {title}
                    </h3>
                    <p className="mt-0 text-sm leading-relaxed text-muted-foreground">
                      {body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15} y={32}>
            <SolutionDashboard />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
