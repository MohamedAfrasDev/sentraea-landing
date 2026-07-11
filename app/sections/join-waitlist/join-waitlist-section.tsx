import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const JoinWaitlistSection = () => {
  const current_stage_section = [
    "I have an idea but haven't validated it yet",
    "I'm currently talking to potential users",
    "I'm already building something",
    "I've built something but I'm stuck or pivoting",
    "I have some revenue but want to grow faster",
  ];
  const [currentStage, setCurrentStage] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const goNext = () => {
    if (step === 1 && !email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }
    if (step === 2 && !currentStage) {
      toast.error("Please tell us where you are right now.");
      return;
    }
    setStep((s) => Math.min(s + 1, totalSteps));
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (step < totalSteps) {
      goNext();
      return;
    }

    if (!email.trim()) {
      toast.error("Please enter your email address.");
      setStep(1);
      return;
    }
    if (!currentStage) {
      toast.error("Please tell us where you are right now.");
      setStep(2);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          stage: currentStage,
          message: message.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast.error(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
      setEmail("");
      setMessage("");
      setCurrentStage("");
      setStep(1);
      toast.success("You're on the list! We'll be in touch soon.");
    } catch {
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="waitlist"
      className="bg-[#09090b] min-h-screen h-full py-28 relative items-center flex flex-col justify-center px-5 md:px-20"
    >
      {/* subtle dark dot grid + anchored glow */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#26262b_1px,transparent_1px)] bg-size-[22px_22px] opacity-60 mask-[radial-gradient(ellipse_75%_60%_at_50%_45%,#000_55%,transparent_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_50%_38%_at_50%_38%,rgba(59,130,246,0.09)_0%,transparent_70%)]" />

      {/* emotional closing stack — lives on the dark canvas, not in the box */}
      <div className="relative z-2 mb-12 max-w-2xl text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-blue-400">
          Join the waitlist
        </p>
        <h2 className="mt-4 font-heading text-4xl tracking-tighter text-white md:text-6xl font-medium">
          Get early access to
          <span className="text-primary"> Sentraea.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-neutral-400 md:text-lg">
          First 50 founders get founding member pricing and help shape what
          gets built.
        </p>
        <p className="mx-auto mt-3 max-w-lg font-heading text-lg font-medium tracking-tight text-neutral-200 md:text-xl">
          Your next Monday could start with one clear move.
        </p>

        {/* scarcity — quiet, factual */}
        <div className="mx-auto mt-7 max-w-xs">
          <Progress value={34} className="h-1" />
          <p className="mt-2.5 font-mono text-[11px] tracking-wide text-neutral-500">
            33 of 50 founding spots remaining
          </p>
        </div>
      </div>

      <Card className="z-2 w-full max-w-xl items-center rounded-2xl border-white/10 bg-card/98 px-7 py-8 backdrop-blur-lg justify-center shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)] md:px-9">
        <p className="w-full text-center font-mono text-[11px] tracking-wide text-neutral-400">
          Takes about 60 seconds. Three short steps.
        </p>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1 w-9 rounded-full transition-all duration-300",
                    i + 1 <= step ? "bg-primary" : "bg-muted",
                  )}
                />
              ))}
            </div>
            <p className="font-mono text-[11px] tracking-wide text-muted-foreground">
              Step {step} of {totalSteps}
            </p>
          </div>

          <div className="w-full">
            {step === 1 && (
              <InputGroup className="w-full">
                <InputGroupAddon align={"block-start"}>
                  <InputGroupText>Email Address</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    fontSize: 18,
                  }}
                  placeholder="your@example.com"
                ></InputGroupInput>
              </InputGroup>
            )}

            {step === 2 && (
              <div>
                <p className="text-base font-medium text-neutral-800">
                  Where are you right now?
                </p>

                <div className="flex flex-col gap-2 mt-3">
                  {current_stage_section.map((stage, index) => {
                    return (
                      <Card
                        key={index}
                        onClick={() => setCurrentStage(stage)}
                        className={cn(
                          "px-4 py-3 cursor-pointer shadow-sm transition-all duration-200",
                          currentStage === stage
                            ? "bg-primary border-primary"
                            : "hover:border-primary/30 hover:bg-primary/[0.03]",
                        )}
                      >
                        <p
                          className={cn(
                            "text-[15px]",
                            currentStage == stage && "text-white font-medium",
                          )}
                        >
                          {stage}
                        </p>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 3 && (
              <InputGroup className="w-full">
                <InputGroupAddon align={"block-start"}>
                  <InputGroupText className="text-lg">
                    What's the one thing you wish you knew before you started?
                    (optional)
                  </InputGroupText>
                </InputGroupAddon>
                <InputGroupTextarea
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[100px] max-h-[100px] text-lg"
                  style={{
                    fontSize: 18,
                  }}
                  placeholder="Eg. I wish I had validated the idea before writing a single line of code..."
                ></InputGroupTextarea>
              </InputGroup>
            )}
          </div>

          <div className="flex gap-3 mt-6">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={goBack}
                disabled={isSubmitting}
                className="text-base py-5"
              >
                <ArrowLeft /> Back
              </Button>
            )}

            {step < totalSteps ? (
              <Button
                key="continue"
                type="button"
                onClick={goNext}
                className="flex-1 text-base py-5"
              >
                Continue <ArrowRight />
              </Button>
            ) : (
              <Button
                key="submit"
                type="submit"
                disabled={isSubmitting || submitted}
                className="flex-1 text-base py-5"
              >
                {isSubmitting ? (
                  <>
                    Claiming your spot <Loader2 className="animate-spin" />
                  </>
                ) : submitted ? (
                  "You're on the list ✓"
                ) : (
                  <>
                    Claim my founding spot <ArrowRight />
                  </>
                )}
              </Button>
            )}
          </div>
        </form>

        <p className="text-xs text-muted-foreground">
          No spam. No updates until Sentraea is ready. Unsubscribe anytime.
        </p>
      </Card>

      <p className="relative z-2 mt-10 font-mono text-[11px] tracking-[0.08em] text-neutral-600">
        One clear move. Every week. Starting with this one.
      </p>
    </div>
  );
};

export default JoinWaitlistSection;
