import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Check, Loader2 } from "lucide-react";
import React, { FormEvent, useState } from "react";
import { toast } from "sonner";
import {
  WAITLIST_JOINED_EVENT,
  WaitlistCounter,
} from "@/app/components/waitlist-counter";

const JoinWaitlistDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  const [email, setEmail] = useState("");
  const [startupLink, setStartupLink] = useState("");

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
          company: startupLink.trim(),
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className={"md:min-w-md items-center text-center"}
        showCloseButton={false}
      >
        {!submitted && (
          <div>
            <div>
              <h2 className="bg-clip-text text-transparent leading-[35px] bg-linear-to-r from-black/80 via-blue-800/70 to-blue-800/80 text-4xl font-medium tracking-[-1px]">
                Join the first Sentraea cohort
              </h2>
              <p className="mt-2 text-muted-foreground">
                Get early access to weekly growth-focus guidance for founder-led
                B2B SaaS teams.
              </p>

              <div className="mt-5 px-5">
                <p className="mt-3 text-lg">Early members get:</p>
                <div className="text-start mt-2 text-muted-foreground flex flex-wrap gap-x-10 gap-y-1">
                  <li className="">Priority access when we launch</li>
                  <li>Direct input on the product</li>
                  <li>Personal onboarding support from the founder</li>
                </div>
              </div>
            </div>

            <form
              className="grid grid-cols-1 gap-2 mt-5"
              onSubmit={handleSubmit}
            >
              <InputGroup className="bg-card/5 shadow-none">
                <InputGroupInput
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  placeholder="Email"
                  required
                />
              </InputGroup>
              {/* <InputGroup className="bg-card/5 shadow-none">
                <InputGroupInput
                  value={startupLink}
                  onChange={(e) => setStartupLink(e.target.value)}
                  placeholder="Your SaaS Link (optional)"
                />
              </InputGroup> */}

              <Button
                type="submit"
                className="mt-2 text-lg py-5"
                disabled={submitting || submitted}
              >
                {submitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Reserve my spot"
                )}
              </Button>
            </form>
            {/* <div className="items-center flex justify-center mt-4">
              <WaitlistCounter className="mt-2 items-center" />
            </div> */}
          </div>
        )}
        {submitted && <WaitlistJoined />}
      </DialogContent>
    </Dialog>
  );
};

export default JoinWaitlistDialog;

const WaitlistJoined = () => {
  return (
    <div className="items-center flex flex-col">
      <div className="w-25 h-25 bg-emerald-400 rounded-full p-2 items-center text-center justify-center flex">
        <Check className="text-center text-white " size={60} />
      </div>
      <h3 className="mt-2 bg-clip-text text-transparent bg-linear-to-r from-black/80 via-emerald-900/70 to-emerald-900/80 text-4xl font-medium tracking-[-1px]">
        Waitlist joined!
      </h3>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
        Thanks for joining the waitlist! We review applications and invite
        founders in small batches — we&apos;ll be in touch soon.
      </p>
    </div>
  );
};
