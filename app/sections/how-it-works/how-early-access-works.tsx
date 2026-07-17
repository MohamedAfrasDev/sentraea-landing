"use client";
import { ArrowRight, Cable, FileText, Send } from "lucide-react";
import { Fragment, useState } from "react";
import { Container, Section, SectionHeading } from "../shared/section";
import { Reveal } from "../shared/reveal";
import BGOrange from "@/public/bg-cta-orange.jpg";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import JoinWaitlistDialog from "@/app/components/join-waitlist-dialog";
const STEPS = [
  {
    icon: Send,
    step: "Step 1",
    title: "Join the waitlist",
    body: "Tell us a bit about your SaaS and current growth stage.",
  },
  {
    icon: Cable,
    step: "Step 2",
    title: "Get selected for early access",
    body: "We’ll invite teams that are a strong fit and can benefit most from weekly guidance.",
  },
  {
    icon: FileText,
    step: "Step 3",
    title: "Get founder-led support",
    body: "Early users get hands-on onboarding, direct support, and a chance to shape the roadmap.",
  },
] as const;

export function HowEarlyAccessWorks() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <JoinWaitlistDialog open={open} setOpen={setOpen} />
      <Section id="early-access">
        <Container className="items-center flex flex-col">
          <Reveal>
            <div className="text-center items-center mt-0">
              <p className="uppercase font-number text-black">Early Access</p>

              <h2 className=" text-4xl md:text-[3.5rem] leading-[80px] font-medium bg-linear-to-r bg-clip-text text-transparent from-black via-black  to-black font-heading tracking-[-2px] md:tracking-[-3px]">
                Join the first Sentraea cohort{" "}
              </h2>
              <p className="text-white">
                We’re opening early access to a small group of founder-led B2B
                SaaS teams. You’ll get weekly guidance + direct input on the
                product before public launch.
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
                  <Card className="group bg-card/50 relative h-full gap-0 p-7 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_24px_56px_-24px_rgba(30,58,138,0.25)]">
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
          <Reveal delay={0.25} className="mt-10 w-full">
            <Card className="bg-card/10 p-0 text-start">
              <div className="bg-linear-to-r flex flex-col md:flex-row gap-5 items-center text-start justify-between from-orange-500/30 via-orange-400/40 to-orange-200/30 px-6 py-5 ">
                <p className=" text-xl text-center md:text-start leading-relaxed text-black">
                  Early-access spots are limited. Join now to be part of the
                  first cohort.{" "}
                </p>
                <Button
                  variant={"outline_without_border"}
                  onClick={() => setOpen(true)}
                  className={
                    "items-center justify-center text-xl px-4 py-5 shadow-none bg-black text-white"
                  }
                >
                  Join the waitlist
                </Button>
              </div>
            </Card>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
