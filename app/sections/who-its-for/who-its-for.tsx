import { Check, X } from "lucide-react";
import { Container, Section, SectionHeading } from "../shared/section";
import { Reveal } from "../shared/reveal";
import { Card } from "@/components/ui/card";
import { FounderFitProfiles } from "@/app/components/mockups/founder-fit-profiles";

const GREAT_FIT = [
  "You’re between 1–200 customers or roughly $1k–$50k MRR.",
  "You still make most decisions yourself as founder.",
  "You use tools like Stripe, HubSpot, Notion, Linear, Jira, but your weekly focus still feels fuzzy.",
  "You want one clear, honest priority per week — not more tasks.",
];

const NOT_A_FIT = [
  "You’re pre‑product and haven’t talked to customers yet.",
  "You’re at a large team with established ops and planning cycles.",
  "You want a generic “AI cofounder” instead of a focused decision tool.",
];

export function WhoItsFor() {
  return (
    <Section
      id="who-its-for"
      className="bg-linear-to-b min-h-screen items-center justify-center flex flex-col from-transparent via-primary/2.5 to-transparent"
    >
      <Container>
        <div className="items-center text-center">
          <p className="uppercase font-number text-primary">Who it’s for</p>

          <h2 className=" text-4xl md:text-[3.5rem] font-medium bg-linear-to-r bg-clip-text text-transparent from-foreground/80 via-orange-700/90  to-orange-400/90 font-heading tracking-[-2px] md:tracking-[-3px]">
            Who Sentraea is built for
          </h2>
          <p className="text-xl">
            Sentraea is designed for founder‑led B2B SaaS teams who already have
            customers but don’t yet have repeatable growth.
          </p>
        </div>

        <Reveal className="mx-auto mt-14 max-w-4xl">
          <FounderFitProfiles />
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-2">
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
            <Card className="h-full border border-black/6 bg-white/50 p-7 backdrop-blur-sm md:p-8">
              <h3 className="font-heading text-lg font-semibold tracking-tight text-muted-foreground">
                Not a Fit
              </h3>
              <ul className="mt-5 space-y-3.5">
                {NOT_A_FIT.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-black/4 text-black/30">
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
