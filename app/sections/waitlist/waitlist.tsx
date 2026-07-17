"use client";

import { ArrowRight, Check, ChevronDown, Loader2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Container, Section } from "../shared/section";
import {
  WaitlistCounter,
  WAITLIST_JOINED_EVENT,
} from "@/app/components/waitlist-counter";
import { Reveal } from "../shared/reveal";

import CTABG from "@/public/cta-bg.jpg";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const MRR_BANDS = [
  "Pre-revenue",
  "$1–1k",
  "$1–10k",
  "$10–50k",
  "$50k+",
] as const;

const inputClasses =
  "w-full rounded-xl border border-black/[0.08] bg-white px-4 py-3 text-[15px] text-foreground placeholder:text-muted-foreground/60 transition-all duration-200 focus:border-primary/40 focus:outline-none focus:ring-3 focus:ring-primary/15";

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting || submitted) return;

    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast.error(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
      window.dispatchEvent(new Event(WAITLIST_JOINED_EVENT));
      toast.success("Waitlist joined. We'll be in touch soon.");
    } catch {
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Section id="waitlist" className="py-20 md:py-28">
      <Container>
        <Reveal y={32}>
          <Image
            src={CTABG}
            alt="cta"
            width={1000}
            height={1000}
            className="absolute w-full h-full rounded-md shadow-2xl"
          />
          <div
            className="absolute inset-0 opacity-[0.3] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.3] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative overflow-hidden rounded-[2rem]  px-6 py-16 md:px-10 md:py-10">
            {/* Ambient glow + grid on the panel */}

            <div className="relative flex flex-col md:flex-row  items-center gap-10">
              {/* Pitch */}
              <div className="text-white flex-3">
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-white">
                  Early access
                </p>
                <h2 className="mt-4 font-heading text-5xl font-medium leading-none tracking-tighter md:text-4xl lg:text-[3.5rem] bg-clip-text text-transparent bg-linear-to-r from-black via-blue-950/90 to-blue-700">
                  Get on the early access waitlist
                </h2>
                <p className="mt-5 max-w-md text-xl leading-relaxed text-white">
                  We&apos;re inviting a small cohort of early-stage B2B SaaS
                  founders to help shape Sentraea. If you want clearer weekly
                  focus, not more noise, leave your email below.
                </p>
                <WaitlistCounter className="mt-6" light />
              </div>

              {/* Form card */}
              <Card className="flex-3 p-4">
                {submitted ? (
                  <div className="flex flex-col items-center py-12 text-center">
                    <span className="inline-flex size-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                      <Check className="size-7" strokeWidth={2.5} aria-hidden />
                    </span>
                    <h3 className="mt-5 font-heading text-xl font-semibold tracking-tight text-foreground">
                      Waitlist joined!
                    </h3>
                    <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                      Thanks for joining the waitlist! We review applications
                      and invite founders in small batches — we&apos;ll be in
                      touch soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="grid gap-4 sm:grid-cols-1">
                      <InputGroup className="bg-muted-foreground/5 shadow-none border-none">
                        <InputGroupAddon align={"block-start"}>
                          <InputGroupText>Email</InputGroupText>
                        </InputGroupAddon>
                        <InputGroupInput
                          id="waitlist-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@company.com"
                        />
                      </InputGroup>
                    </div>

                    <Button
                      className={"w-full mt-5 h-10 text-lg"}
                      type="submit"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          Submitting application
                          <Loader2
                            className="size-4 animate-spin"
                            aria-hidden
                          />
                        </>
                      ) : (
                        <>
                          Apply for Early Access
                          <ArrowRight
                            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                            aria-hidden
                          />
                        </>
                      )}
                    </Button>

                    <p className="mt-4 text-center text-xs text-muted-foreground">
                      We&apos;ll review applications and invite founders in
                      small batches.
                    </p>
                  </form>
                )}
              </Card>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
