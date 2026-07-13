"use client";

import { ArrowRight, Check, Loader2, Plus, RotateCcw, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { startAnalysis } from "@/actions/analysis";
import { Eyebrow } from "@/components/shared/brief-bits";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IMPACT_LEVELS, OPTION_TYPES } from "@/lib/validators/weekly";
import { cn } from "@/lib/utils";

const STAGES = [
  { key: "synthesizing_context", label: "Understanding your context" },
  { key: "generating_questions", label: "Generating market questions" },
  { key: "researching", label: "Researching the market" },
  { key: "deciding", label: "Weighing your options against the evidence" },
  { key: "complete", label: "Preparing this week's decision" },
] as const;

const STAGE_ORDER: Record<string, number> = {
  pending: -1,
  synthesizing_context: 0,
  generating_questions: 1,
  researching: 2,
  deciding: 3,
  complete: 4,
};

type Phase = "form" | "running" | "failed";

type OptionDraft = {
  key: number;
  title: string;
  type: string;
  expectedImpact: string;
  effort: string;
  reversible: boolean;
  targetOutcome: string;
  note: string;
};

let optionKey = 0;
function emptyOption(): OptionDraft {
  return {
    key: optionKey++,
    title: "",
    type: "",
    expectedImpact: "medium",
    effort: "medium",
    reversible: true,
    targetOutcome: "",
    note: "",
  };
}

function optionReady(o: OptionDraft): boolean {
  return (
    o.title.trim().length >= 3 &&
    o.type !== "" &&
    o.targetOutcome.trim().length >= 3
  );
}

function Segmented({
  value,
  onChange,
  choices,
}: {
  value: string;
  onChange: (v: string) => void;
  choices: readonly { value: string; label: string }[];
}) {
  return (
    <div className="flex flex-wrap gap-1">
      {choices.map((c) => (
        <button
          key={c.value}
          type="button"
          onClick={() => onChange(c.value)}
          className={cn(
            "rounded-full border px-2.5 py-1 text-xs transition-colors",
            value === c.value
              ? "border-primary bg-primary/5 font-medium text-primary"
              : "border-muted-foreground/15 bg-card text-muted-foreground hover:border-primary/30",
          )}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}

const LEVEL_CHOICES = IMPACT_LEVELS.map((l) => ({
  value: l,
  label: l[0].toUpperCase() + l.slice(1),
}));

export function AnalyzeFlow({ initialRunId }: { initialRunId?: string }) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>(initialRunId ? "running" : "form");
  const [runId, setRunId] = useState<string | null>(initialRunId ?? null);
  const [status, setStatus] = useState<string>("pending");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [options, setOptions] = useState<OptionDraft[]>(() => [
    emptyOption(),
    emptyOption(),
    emptyOption(),
  ]);
  const [currentBlocker, setCurrentBlocker] = useState("");
  const [recentChanges, setRecentChanges] = useState("");
  const [notes, setNotes] = useState("");

  const setOption = (key: number, patch: Partial<OptionDraft>) =>
    setOptions((prev) =>
      prev.map((o) => (o.key === key ? { ...o, ...patch } : o)),
    );

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  const executePipeline = useCallback((id: string) => {
    // Kicks the pipeline; progress is observed via polling, not this response.
    fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ runId: id }),
    }).catch(() => {
      // Network drop mid-run — polling will surface the true state.
    });
  }, []);

  const startPolling = useCallback(
    (id: string) => {
      stopPolling();
      pollRef.current = setInterval(async () => {
        try {
          const res = await fetch(`/api/analysis/${id}`, { cache: "no-store" });
          if (!res.ok) return;
          const data: {
            status: string;
            error: string | null;
            recommendationId: string | null;
          } = await res.json();
          setStatus(data.status);
          if (data.status === "complete" && data.recommendationId) {
            stopPolling();
            router.push(`/app/recommendations/${data.recommendationId}`);
          } else if (data.status === "failed") {
            stopPolling();
            setError(
              data.error ??
                "The analysis failed. Nothing was lost — you can retry.",
            );
            setPhase("failed");
          }
        } catch {
          // Transient polling error — keep trying.
        }
      }, 2500);
    },
    [router, stopPolling],
  );

  useEffect(() => {
    if (initialRunId) startPolling(initialRunId);
    return stopPolling;
  }, [initialRunId, startPolling, stopPolling]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError(null);
    setFieldErrors({});

    const input = {
      options: options.map((o) => ({
        title: o.title,
        type: o.type,
        expectedImpact: o.expectedImpact,
        effort: o.effort,
        reversible: o.reversible,
        targetOutcome: o.targetOutcome,
        note: o.note,
      })),
      currentBlocker,
      recentChanges,
      notes,
    };

    try {
      const result = await startAnalysis(input);
      if ("error" in result) {
        setError(result.error);
        setFieldErrors(result.fieldErrors ?? {});
        return;
      }
      setRunId(result.runId);
      setStatus("pending");
      setPhase("running");
      executePipeline(result.runId);
      startPolling(result.runId);
    } catch {
      setError("Could not start the analysis. Check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetry = () => {
    if (!runId) {
      setPhase("form");
      return;
    }
    setError(null);
    setStatus("pending");
    setPhase("running");
    executePipeline(runId);
    startPolling(runId);
  };

  if (phase === "running" || phase === "failed") {
    const currentIndex = STAGE_ORDER[status] ?? -1;
    return (
      <Card className="gap-6 px-6 py-7 md:px-9 md:py-8">
        <div className="flex flex-col gap-1.5">
          <Eyebrow className="text-muted-foreground">Weekly analysis</Eyebrow>
          <h2 className="font-heading text-2xl font-medium tracking-tight">
            {phase === "failed"
              ? "The analysis hit a problem"
              : "Deciding between your options"}
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {phase === "failed"
              ? "Nothing was lost. Your options are saved — retry when ready."
              : "Each stage below is the pipeline actually running — this usually takes a couple of minutes."}
          </p>
        </div>

        <ol className="flex flex-col gap-4">
          {STAGES.map((stage, i) => {
            const done =
              status === "complete" ? true : i < Math.max(currentIndex, 0);
            const active = phase === "running" && i === currentIndex;
            return (
              <li key={stage.key} className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors",
                    done
                      ? "border-primary bg-primary text-white"
                      : active
                        ? "border-primary text-primary"
                        : "border-muted-foreground/20 text-muted-foreground/40",
                  )}
                >
                  {done ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : active ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <span className="text-[10px] font-medium">{i + 1}</span>
                  )}
                </span>
                <span
                  className={cn(
                    "text-sm transition-colors",
                    done || active
                      ? "text-foreground"
                      : "text-muted-foreground/60",
                  )}
                >
                  {stage.label}
                </span>
              </li>
            );
          })}
        </ol>

        {phase === "failed" ? (
          <div className="flex flex-col gap-3">
            {error ? (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            ) : null}
            <Button onClick={handleRetry} className="w-fit py-5">
              <RotateCcw /> Retry analysis
            </Button>
          </div>
        ) : null}
      </Card>
    );
  }

  const readyCount = options.filter(optionReady).length;
  const canSubmit = options.length >= 3 && readyCount === options.length;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* The decision set */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <h2 className="font-heading text-xl font-medium tracking-tight">
            This week&apos;s options
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            The 3–5 real things you could do this week. Sentraea will choose
            the highest-leverage move from these — and tell you why the others
            lose.
          </p>
        </div>

        {options.map((option, index) => (
          <Card key={option.key} className="gap-4 px-5 py-5 md:px-6">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Option {index + 1}
              </p>
              {options.length > 3 ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() =>
                    setOptions((prev) => prev.filter((o) => o.key !== option.key))
                  }
                  aria-label={`Remove option ${index + 1}`}
                >
                  <X />
                </Button>
              ) : null}
            </div>

            <div className="flex flex-col gap-1.5">
              <Input
                value={option.title}
                onChange={(e) => setOption(option.key, { title: e.target.value })}
                placeholder={
                  index === 0
                    ? "e.g. Cold outreach to 30 agency founders"
                    : index === 1
                      ? "e.g. Ship the onboarding rework"
                      : "e.g. Interview five churned users"
                }
                aria-label={`Option ${index + 1} title`}
              />
              {fieldErrors[`options.${index}.title`] ? (
                <p className="text-xs text-destructive">
                  {fieldErrors[`options.${index}.title`]}
                </p>
              ) : null}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs text-muted-foreground">Type</Label>
                <Segmented
                  value={option.type}
                  onChange={(v) => setOption(option.key, { type: v })}
                  choices={OPTION_TYPES}
                />
                {fieldErrors[`options.${index}.type`] ? (
                  <p className="text-xs text-destructive">
                    {fieldErrors[`options.${index}.type`]}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs text-muted-foreground">
                  Reversible if it doesn&apos;t work?
                </Label>
                <Segmented
                  value={option.reversible ? "yes" : "no"}
                  onChange={(v) =>
                    setOption(option.key, { reversible: v === "yes" })
                  }
                  choices={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "Hard to undo" },
                  ]}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs text-muted-foreground">
                  Expected impact
                </Label>
                <Segmented
                  value={option.expectedImpact}
                  onChange={(v) => setOption(option.key, { expectedImpact: v })}
                  choices={LEVEL_CHOICES}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs text-muted-foreground">Effort</Label>
                <Segmented
                  value={option.effort}
                  onChange={(v) => setOption(option.key, { effort: v })}
                  choices={LEVEL_CHOICES}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-muted-foreground">
                Target outcome or metric
              </Label>
              <Input
                value={option.targetOutcome}
                onChange={(e) =>
                  setOption(option.key, { targetOutcome: e.target.value })
                }
                placeholder="e.g. 5 booked calls · onboarding drop-off under 40%"
              />
              {fieldErrors[`options.${index}.targetOutcome`] ? (
                <p className="text-xs text-destructive">
                  {fieldErrors[`options.${index}.targetOutcome`]}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-1.5">
              <Input
                value={option.note}
                onChange={(e) => setOption(option.key, { note: e.target.value })}
                placeholder="Optional note — context, doubts, constraints"
                className="border-dashed"
              />
            </div>
          </Card>
        ))}

        {options.length < 5 ? (
          <Button
            type="button"
            variant="outline"
            className="w-fit py-5"
            onClick={() => setOptions((prev) => [...prev, emptyOption()])}
          >
            <Plus /> Add option {options.length + 1}
          </Button>
        ) : null}
        {fieldErrors.options ? (
          <p className="text-xs text-destructive">{fieldErrors.options}</p>
        ) : null}
      </div>

      {/* Supporting context */}
      <Card className="gap-5 px-5 py-5 md:px-6">
        <div className="flex flex-col gap-1">
          <h3 className="font-heading text-base font-medium tracking-tight">
            Supporting context
          </h3>
          <p className="text-xs text-muted-foreground">
            Optional, but sharpens the tradeoff.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="currentBlocker">
            What feels most stuck right now?
          </Label>
          <Textarea
            id="currentBlocker"
            value={currentBlocker}
            onChange={(e) => setCurrentBlocker(e.target.value)}
            placeholder="e.g. Signups are flat and I don't know if it's the message or the channel."
            className="min-h-20"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="recentChanges">What changed since last week?</Label>
          <Textarea
            id="recentChanges"
            value={recentChanges}
            onChange={(e) => setRecentChanges(e.target.value)}
            placeholder="e.g. A competitor launched a free tier. Two users churned."
            className="min-h-20"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="notes">Any new notes?</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Anything else that should weigh on the decision."
            className="min-h-20"
          />
        </div>
      </Card>

      {error ? (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : null}

      <div className="flex flex-col gap-2">
        <Button
          type="submit"
          disabled={isSubmitting || !canSubmit}
          className="w-full py-5 text-base"
        >
          {isSubmitting ? (
            <>
              Starting analysis <Loader2 className="animate-spin" />
            </>
          ) : (
            <>
              Choose my move <ArrowRight />
            </>
          )}
        </Button>
        {!canSubmit ? (
          <p className="text-center text-xs text-muted-foreground">
            Each option needs a title, a type, and a target outcome
            {options.length < 3 ? " — and at least 3 options" : ""}.
          </p>
        ) : null}
      </div>
    </form>
  );
}
