import { ArrowRight, Cable, FileText, Send } from "lucide-react";
import { Fragment } from "react";
import { Container, Section, SectionHeading } from "../shared/section";
import { Reveal } from "../shared/reveal";
import BGOrange from "@/public/bg-cta-orange.jpg";
import Image from "next/image";
import { Card } from "@/components/ui/card";
const STEPS = [
  {
    icon: Send,
    step: "Step 1",
    title: "Apply",
    body: "Tell us about your SaaS.",
  },
  {
    icon: Cable,
    step: "Step 2",
    title: "Connect",
    body: "Connect tools or upload a simple weekly snapshot.",
  },
  {
    icon: FileText,
    step: "Step 3",
    title: "Receive",
    body: "Receive your weekly founder brief.",
  },
] as const;

export function HowEarlyAccessWorks() {
  return (
    <Section id="early-access">
      <Container>
        <Reveal>
          <div className="text-center items-center mt-20">
            <p className="uppercase font-number text-black">Early Access</p>

            <h2 className=" text-4xl md:text-[3.5rem] leading-[80px] font-medium bg-linear-to-r bg-clip-text text-transparent from-black via-black/60  to-white font-heading tracking-[-2px] md:tracking-[-3px]">
              How Early Access Works
            </h2>
            <p className="text-white">
              It&apos;s not magic. It&apos;s a structured weekly decision
              system.
            </p>
          </div>
        </Reveal>
        <div className="mt-16 grid gap-10 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch md:gap-4">
          {STEPS.map(({ icon: Icon, step, title, body }, i) => (
            <Fragment key={title}>
              {i > 0 && (
                <div
                  className="hidden items-center justify-center md:flex"
                  aria-hidden
                >
                  <ArrowRight className="size-5 text-primary/30" />
                </div>
              )}
              <Reveal delay={0.1 * i}>
                <Card className="group relative h-full bg-card gap-0 p-7 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_24px_56px_-24px_rgba(30,58,138,0.25)]">
                  <div className="mx-auto inline-flex size-12 items-center justify-center rounded-sm bg-linear-to-br from-primary/8 to-indigo-500/5 text-primary">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <p className="mt-5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
                    {step}
                  </p>
                  <h3 className="mt-2 font-heading text-lg font-semibold tracking-tight text-foreground">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {body}
                  </p>
                </Card>
              </Reveal>
            </Fragment>
          ))}
        </div>

        <Reveal delay={0.25} className="mt-10">
          <Card className="bg-card/10 p-0 text-center">
            <div className="bg-linear-to-r from-orange-500/30 via-orange-400/40 to-orange-200/30 px-6 py-6 ">
              <p className="mx-auto  text-xl leading-relaxed text-white">
                <span className="font-semibold">Early users</span> receive
                hands-on support and directly shape the roadmap.
              </p>
            </div>
          </Card>
        </Reveal>
      </Container>
    </Section>
  );
}
