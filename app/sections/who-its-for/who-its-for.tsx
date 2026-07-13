import { Check, X } from "lucide-react";
import { Container, Section, SectionHeading } from "../shared/section";
import { Reveal } from "../shared/reveal";
import { Card } from "@/components/ui/card";

const GREAT_FIT = [
  "1–200 customers",
  "$1k–50k MRR",
  "Founder-led",
  "Uses Stripe, HubSpot, Notion, Linear, Jira",
  "Wants one priority every week",
];

const NOT_A_FIT = [
  "Pre-idea",
  "No customer conversations",
  "Only collecting ideas",
  "Large executive teams",
  "Established operating cadence",
];

export function WhoItsFor() {
  return (
    <Section
      id="who-its-for"
      className="bg-gradient-to-b from-transparent via-primary/[0.025] to-transparent"
    >
      <Container>
        <div className="items-center text-center">
          <p className="uppercase font-number text-primary">Who it's for</p>

          <h2 className=" text-4xl md:text-[3.5rem] font-medium bg-linear-to-r bg-clip-text text-transparent from-foreground/80 via-orange-900/90  to-orange-200/90 font-heading tracking-[-2px] md:tracking-[-3px]">
            Who Sentraea is built for
          </h2>
          <p>
            Sentraea is designed for founders between first customers and
            repeatable growth.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-4 md:grid-cols-2">
          <Reveal>
            <Card className="h-full border border-emerald-500/15 bg-linear-to-b from-emerald-50/60 to-white/70 p-7 shadow-[0_24px_56px_-32px_rgba(16,185,129,0.35)] backdrop-blur-sm md:p-8">
              <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground">
                Great Fit
              </h3>
              <ul className="mt-5 space-y-3.5">
                {GREAT_FIT.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                      <Check className="size-3" strokeWidth={3} aria-hidden />
                    </span>
                    <span className="text-[15px] leading-snug text-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>

          <Reveal delay={0.1}>
            <Card className="h-full border border-black/[0.06] bg-white/50 p-7 backdrop-blur-sm md:p-8">
              <h3 className="font-heading text-lg font-semibold tracking-tight text-muted-foreground">
                Not a Fit
              </h3>
              <ul className="mt-5 space-y-3.5">
                {NOT_A_FIT.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-black/[0.04] text-black/30">
                      <X className="size-3" strokeWidth={3} aria-hidden />
                    </span>
                    <span className="text-[15px] leading-snug text-muted-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
