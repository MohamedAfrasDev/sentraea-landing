"use client";

import { ArrowLeft, ArrowRight, Loader2, Plus, X } from "lucide-react";
import { useActionState, useEffect, useRef, useState } from "react";

import {
  completeOnboarding,
  type OnboardingActionState,
} from "@/actions/onboarding";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { STARTUP_STAGES } from "@/lib/validators/onboarding";
import { cn } from "@/lib/utils";

const DRAFT_KEY = "sentraea-onboarding-draft-v1";

type Draft = {
  startupName: string;
  productSummary: string;
  customerType: string;
  stage: string;
  mainGoal30d: string;
  bottleneck: string;
  priorities: string[];
  websiteUrl: string;
  productUrl: string;
  competitorUrls: string[];
  recentChanges: string;
  notes: string;
};

const EMPTY_DRAFT: Draft = {
  startupName: "",
  productSummary: "",
  customerType: "",
  stage: "",
  mainGoal30d: "",
  bottleneck: "",
  priorities: [""],
  websiteUrl: "",
  productUrl: "",
  competitorUrls: [],
  recentChanges: "",
  notes: "",
};

const STEPS = [
  {
    title: "Your startup",
    description: "The basics Sentraea needs to understand what you're building.",
  },
  {
    title: "This month's focus",
    description: "Your goal, your bottleneck, and the priorities competing for your time.",
  },
  {
    title: "Context & links",
    description: "Optional, but every link sharpens the research.",
  },
] as const;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-destructive">{message}</p>;
}

export function OnboardingForm({
  initialDraft,
}: {
  initialDraft?: Partial<Draft>;
}) {
  const [state, formAction, isPending] = useActionState<
    OnboardingActionState,
    FormData
  >(completeOnboarding, {});
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>({
    ...EMPTY_DRAFT,
    ...initialDraft,
  });
  const hydrated = useRef(false);

  // Restore an in-progress draft (server data wins over localStorage).
  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    if (initialDraft && Object.keys(initialDraft).length > 0) return;
    try {
      const raw = window.localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<Draft>;
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time localStorage hydration; a lazy initializer would mismatch the SSR'd HTML
        setDraft((d) => ({ ...d, ...saved }));
      }
    } catch {
      // Corrupt draft — start fresh.
    }
  }, [initialDraft]);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch {
      // Storage full/blocked — draft persistence is best-effort.
    }
  }, [draft]);

  // On successful completion the action redirects; clear the draft when
  // the form unmounts without errors.
  useEffect(() => {
    return () => {
      if (!state.error) {
        try {
          window.localStorage.removeItem(DRAFT_KEY);
        } catch {
          /* noop */
        }
      }
    };
  }, [state.error]);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const fieldErrors = state.fieldErrors ?? {};

  const stepValid = (() => {
    if (step === 0) {
      return (
        draft.startupName.trim().length > 0 &&
        draft.productSummary.trim().length >= 10 &&
        draft.customerType.trim().length >= 3 &&
        draft.stage !== ""
      );
    }
    if (step === 1) {
      return (
        draft.mainGoal30d.trim().length >= 5 &&
        draft.bottleneck.trim().length >= 5 &&
        draft.priorities.some((p) => p.trim().length > 0)
      );
    }
    return true;
  })();

  return (
    <Card className="w-full gap-6 px-6 py-7 md:px-9 md:py-8">
      {/* progress */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1 w-10 rounded-full transition-all duration-300",
                i <= step ? "bg-primary" : "bg-muted",
              )}
            />
          ))}
        </div>
        <p className="font-mono text-[11px] tracking-wide text-muted-foreground">
          Step {step + 1} of {STEPS.length}
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="font-heading text-xl font-medium tracking-tight">
          {STEPS[step].title}
        </h2>
        <p className="text-sm text-muted-foreground">
          {STEPS[step].description}
        </p>
      </div>

      <form action={formAction} className="flex flex-col gap-5">
        {/* Keep every field in the DOM so one submit carries the full profile. */}
        <div className={cn("flex-col gap-5", step === 0 ? "flex" : "hidden")}>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="startupName">Startup name</Label>
            <Input
              id="startupName"
              name="startupName"
              value={draft.startupName}
              onChange={(e) => set("startupName", e.target.value)}
              placeholder="e.g. Fieldnote"
            />
            <FieldError message={fieldErrors.startupName} />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="productSummary">One-line product summary</Label>
            <Textarea
              id="productSummary"
              name="productSummary"
              value={draft.productSummary}
              onChange={(e) => set("productSummary", e.target.value)}
              placeholder="e.g. A weekly planning tool that turns messy founder notes into a focused plan."
              className="min-h-20"
            />
            <FieldError message={fieldErrors.productSummary} />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="customerType">Who is it for?</Label>
            <Input
              id="customerType"
              name="customerType"
              value={draft.customerType}
              onChange={(e) => set("customerType", e.target.value)}
              placeholder="e.g. bootstrapped B2B SaaS founders, 0–10 employees"
            />
            <FieldError message={fieldErrors.customerType} />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Stage</Label>
            <input type="hidden" name="stage" value={draft.stage} />
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {STARTUP_STAGES.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => set("stage", s.value)}
                  className={cn(
                    "rounded-sm border px-4 py-3 text-left transition-all duration-200",
                    draft.stage === s.value
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "border-border bg-card hover:border-primary/30",
                  )}
                >
                  <p className="text-sm font-medium">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.hint}</p>
                </button>
              ))}
            </div>
            <FieldError message={fieldErrors.stage} />
          </div>
        </div>

        <div className={cn("flex-col gap-5", step === 1 ? "flex" : "hidden")}>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="mainGoal30d">
              Primary goal for the next 30 days
            </Label>
            <Textarea
              id="mainGoal30d"
              name="mainGoal30d"
              value={draft.mainGoal30d}
              onChange={(e) => set("mainGoal30d", e.target.value)}
              placeholder="e.g. Get 10 paying customers from the waitlist."
              className="min-h-20"
            />
            <FieldError message={fieldErrors.mainGoal30d} />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="bottleneck">Current bottleneck</Label>
            <Textarea
              id="bottleneck"
              name="bottleneck"
              value={draft.bottleneck}
              onChange={(e) => set("bottleneck", e.target.value)}
              placeholder="e.g. Traffic is fine but almost nobody converts to a trial."
              className="min-h-20"
            />
            <FieldError message={fieldErrors.bottleneck} />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Priorities you&apos;re weighing right now</Label>
            <p className="text-xs text-muted-foreground">
              The competing options on your plate — Sentraea decides between
              these each week.
            </p>
            <div className="flex flex-col gap-2">
              {draft.priorities.map((p, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Input
                    name="priorities"
                    value={p}
                    onChange={(e) => {
                      const next = [...draft.priorities];
                      next[i] = e.target.value;
                      set("priorities", next);
                    }}
                    placeholder={
                      i === 0
                        ? "e.g. Rewrite the landing page"
                        : "Another priority"
                    }
                  />
                  {draft.priorities.length > 1 ? (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        set(
                          "priorities",
                          draft.priorities.filter((_, j) => j !== i),
                        )
                      }
                      aria-label="Remove priority"
                    >
                      <X />
                    </Button>
                  ) : null}
                </div>
              ))}
            </div>
            {draft.priorities.length < 8 ? (
              <Button
                type="button"
                variant="ghost"
                className="w-fit"
                onClick={() => set("priorities", [...draft.priorities, ""])}
              >
                <Plus /> Add priority
              </Button>
            ) : null}
            <FieldError message={fieldErrors.priorities} />
          </div>
        </div>

        <div className={cn("flex-col gap-5", step === 2 ? "flex" : "hidden")}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="websiteUrl">Website URL (optional)</Label>
              <Input
                id="websiteUrl"
                name="websiteUrl"
                type="url"
                value={draft.websiteUrl}
                onChange={(e) => set("websiteUrl", e.target.value)}
                placeholder="https://yourstartup.com"
              />
              <FieldError message={fieldErrors.websiteUrl} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="productUrl">Product URL (optional)</Label>
              <Input
                id="productUrl"
                name="productUrl"
                type="url"
                value={draft.productUrl}
                onChange={(e) => set("productUrl", e.target.value)}
                placeholder="https://app.yourstartup.com"
              />
              <FieldError message={fieldErrors.productUrl} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Competitor URLs (optional)</Label>
            <div className="flex flex-col gap-2">
              {draft.competitorUrls.map((u, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Input
                    name="competitorUrls"
                    type="url"
                    value={u}
                    onChange={(e) => {
                      const next = [...draft.competitorUrls];
                      next[i] = e.target.value;
                      set("competitorUrls", next);
                    }}
                    placeholder="https://competitor.com"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      set(
                        "competitorUrls",
                        draft.competitorUrls.filter((_, j) => j !== i),
                      )
                    }
                    aria-label="Remove competitor"
                  >
                    <X />
                  </Button>
                </div>
              ))}
            </div>
            {draft.competitorUrls.length < 6 ? (
              <Button
                type="button"
                variant="ghost"
                className="w-fit"
                onClick={() =>
                  set("competitorUrls", [...draft.competitorUrls, ""])
                }
              >
                <Plus /> Add competitor
              </Button>
            ) : null}
            <FieldError message={fieldErrors.competitorUrls} />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="recentChanges">
              What changed recently? (optional)
            </Label>
            <Textarea
              id="recentChanges"
              name="recentChanges"
              value={draft.recentChanges}
              onChange={(e) => set("recentChanges", e.target.value)}
              placeholder="e.g. Launched on Product Hunt two weeks ago; signups spiked then flattened."
              className="min-h-20"
            />
            <FieldError message={fieldErrors.recentChanges} />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="notes">Anything else Sentraea should know? (optional)</Label>
            <Textarea
              id="notes"
              name="notes"
              value={draft.notes}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Constraints, strong opinions, things you've already ruled out…"
              className="min-h-20"
            />
            <FieldError message={fieldErrors.notes} />
          </div>
        </div>

        {state.error ? (
          <p role="alert" className="text-sm text-destructive">
            {state.error}
          </p>
        ) : null}

        <div className="mt-1 flex items-center gap-3">
          {step > 0 ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep((s) => s - 1)}
              disabled={isPending}
              className="py-5"
            >
              <ArrowLeft /> Back
            </Button>
          ) : null}

          {step < STEPS.length - 1 ? (
            <Button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              disabled={!stepValid}
              className="flex-1 py-5 text-base"
            >
              Continue <ArrowRight />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isPending}
              className="flex-1 py-5 text-base"
            >
              {isPending ? (
                <>
                  Setting up your workspace <Loader2 className="animate-spin" />
                </>
              ) : (
                <>
                  Finish setup <ArrowRight />
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}
