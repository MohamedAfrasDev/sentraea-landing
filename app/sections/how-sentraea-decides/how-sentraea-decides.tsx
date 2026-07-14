import { Brain, Cable, Compass } from "lucide-react";
import { Container, Section, SectionHeading } from "../shared/section";
import { Reveal } from "../shared/reveal";
import CTABG from "@/public/cta-bg.jpg";
import Image from "next/image";
import { Card } from "@/components/ui/card";

const STEPS = [
  {
    icon: Cable,
    step: "01",
    title: "Connect your tools",
    body: "Start with a few basics: MRR band, customers, main channel, demo→close rate, churn / retention. Connect Stripe/HubSpot/analytics if you want — or just paste snapshots in.",
    chips: ["MRR", "Customers", "Demo rate", "Stripe", "HubSpot", "Segment"],
    footnote: "Manual input supported.",
  },
  {
    icon: Brain,
    step: "02",
    title: "Build SaaS Context",
    body: "Sentraea keeps a running model of your business: stage, ICP, key metrics, past experiments, and weekly outcomes. It remembers what you tried and what happened.",
    chips: [
      "Stage",
      "ICP",
      "Channels",
      "Past experiments",
      "History",
      "Memory",
    ],
    footnote: "Context compounds every week.",
  },
  {
    icon: Compass,
    step: "03",
    title: "Bottleneck Engine",
    body: "Using early‑stage SaaS patterns, Sentraea detects your current constraint (demand, conversion, activation, retention, or systems) and picks the one move with the most leverage for this week.",
    chips: [
      "Demand",
      "Conversion",
      "Activation",
      "Retention",
      "Founder bottleneck",
    ],
    footnote: "Prioritize one highest-leverage action.",
  },
] as const;

export function HowSentraeaDecides() {
  return (
    <Section id="how-it-works" className="relative min-h-screen ">
      <Image
        src={CTABG}
        alt="cta"
        width={1000}
        height={1000}
        className="absolute w-full min-h-screen h-full  px-5 py-5  rounded-4xl"
      />
      <div
        className="absolute inset-0 opacity-[0.2] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.2] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      <Container>
        <Reveal>
          <div className="text-center items-center mt-15">
            <p className="uppercase font-number text-black">How it works</p>

            <h2 className=" text-4xl md:text-[3.5rem] md:leading-[80px] font-medium bg-linear-to-r bg-clip-text text-transparent from-white via-blue-50  to-blue-100 font-heading tracking-[-2px] md:tracking-[-3px]">
              How does Sentraea choose the one move?
            </h2>
            <p className="text-white mt-5 md:mt-0">
              It&apos;s not magic. It&apos;s a structured weekly decision
              system.
            </p>
          </div>
        </Reveal>
        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {STEPS.map(
            ({ icon: Icon, step, title, body, chips, footnote }, i) => (
              <Reveal key={title} delay={0.1 * i}>
                <Card className="group flex h-full flex-col bg-card/90 hover:bg-black/80 group cursor-pointer gap-0 backdrop-blur-sm p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_24px_56px_-24px_rgba(30,58,138,0.25)] md:p-7">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex size-11 items-center justify-center rounded-sm bg-primary/6 text-primary">
                      <Icon className="size-5" aria-hidden />
                    </div>
                    <span className="font-number text-3xl font-medium text-black/15 group-hover:text-white">
                      {step}
                    </span>
                  </div>
                  <h3 className="mt-5 group-hover:text-primary font-heading text-2xl font-medium tracking-tight text-foreground">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground group-hover:text-white">
                    {body}
                  </p>
                  {/* <div className="mt-4 flex flex-wrap gap-1.5">
                    {chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-sm  bg-black/2.5 px-2.5 py-1 text-xs text-muted-foreground transition-colors duration-300 group-hover:border-primary/10 group-hover:bg-primary/[0.04] group-hover:text-foreground"
                      >
                        {chip}
                      </span>
                    ))}
                  </div> */}
                  <p className="mt-auto pt-5 text-xs font-medium text-primary">
                    {footnote}
                  </p>
                </Card>
              </Reveal>
            ),
          )}
        </div>

        <Reveal delay={0.2} className="mt-10 w-full">
          <Card className="relative overflow-hidden backdrop-blur-lg p-0 w-full border-none bg-card/5">
            <div
              className="bg-linear-to-r from-primary/30 via-indigo-300/40 to-blue-200/60 backdrop-blur-lg   px-6 py-8 text-center md:px-10
"
            >
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(37,99,235,0.08),transparent_70%)]"
                aria-hidden
              />
              <p className="relative mx-auto max-w-2xl font-heading text-xl font-medium leading-snug tracking-tight text-foreground md:text-2xl">
                You always stay in control.{" "}
                <span className="text-white">Sentraea suggests.</span> You
                decide.
              </p>
            </div>
          </Card>
        </Reveal>
      </Container>
    </Section>
  );
}
