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
      className="bg-black/90 min-h-screen h-full py-20 relative items-center flex flex-col justify-center px-5 md:px-20"
    >
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#cacccf_1px,transparent_1px)] bg-size-[20px_20px] dark:bg-[radial-gradient(#4f5052_1px,transparent_1px)] opacity-70 mask-[radial-gradient(ellipse_80%_60%_at_50%_40%,#000_60%,transparent_100%)]" />
      <Card className="z-2 items-center bg-card/98 backdrop-blur-lg w-fit justify-center">
        <p className="uppercase tracking-[0.08rem] text-muted-foreground font-number">
          Join the waitlist
        </p>
        <h2 className="font-heading text-4xl text-center md:text-6xl font-semibold">
          Get early access to
          <span className="text-primary"> Sentraea.</span>
        </h2>
        <p className="text-lg text-center">
          First 50 founders get founding member pricing. Help shape what gets
          built.
        </p>

        <div>
          <Progress value={33} />
          <p className="mt-2 text-muted-foreground">
            33/50 founding spots remaining
          </p>
        </div>

        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex items-center justify-center gap-2 mb-5">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1.5 w-10 rounded-full transition-all duration-300",
                  i + 1 <= step ? "bg-primary" : "bg-muted",
                )}
              />
            ))}
            <p className="text-sm text-muted-foreground ml-2">
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
                <p className="text-lg text-muted-foreground">
                  Where are you right now ?
                </p>

                <div className="flex flex-col gap-2 mt-3">
                  {current_stage_section.map((stage, index) => {
                    return (
                      <Card
                        key={index}
                        onClick={() => setCurrentStage(stage)}
                        className={cn(
                          "px-4 py-3 cursor-pointer shadow-sm transition-all duration-300",
                          currentStage === stage
                            ? "bg-primary"
                            : "hover:scale-101 hover:bg-primary/2",
                        )}
                      >
                        <p
                          className={cn(
                            "text-lg",
                            currentStage == stage && "text-white",
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

          <div className="flex gap-3 mt-5">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={goBack}
                disabled={isSubmitting}
                className="text-lg py-5"
              >
                <ArrowLeft /> Back
              </Button>
            )}

            {step < totalSteps ? (
              <Button
                key="continue"
                type="button"
                onClick={goNext}
                className="flex-1 text-lg py-5"
              >
                Continue <ArrowRight />
              </Button>
            ) : (
              <Button
                key="submit"
                type="submit"
                disabled={isSubmitting || submitted}
                className="flex-1 text-lg py-5"
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

        <p className="text-sm text-muted-foreground">
          No spam. No updates until Sentraea is ready. Unsubscribe anytime.
        </p>
      </Card>
    </div>
  );
};

export default JoinWaitlistSection;
