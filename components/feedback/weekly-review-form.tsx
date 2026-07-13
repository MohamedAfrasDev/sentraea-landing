"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import { useActionState, useState } from "react";

import {
  submitWeeklyReview,
  type WeeklyReviewActionState,
} from "@/actions/feedback";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

function ChoiceRow({
  name,
  options,
  error,
  onSelect,
}: {
  name: string;
  options: { value: string; label: string }[];
  error?: string;
  onSelect?: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <label key={opt.value} className="cursor-pointer">
            <input
              type="radio"
              name={name}
              value={opt.value}
              className="peer sr-only"
              onChange={() => onSelect?.(opt.value)}
            />
            <span
              className={cn(
                "inline-flex rounded-sm border border-border bg-card px-4 py-2 text-sm transition-colors",
                "peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:font-medium peer-checked:text-primary",
                "hover:border-primary/40",
              )}
            >
              {opt.label}
            </span>
          </label>
        ))}
      </div>
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

export function WeeklyReviewForm({
  recommendationId,
  chosenOptionTitle,
  otherOptionTitles,
}: {
  recommendationId: string;
  chosenOptionTitle: string | null;
  otherOptionTitles: string[];
}) {
  const boundAction = submitWeeklyReview.bind(null, recommendationId);
  const [state, formAction, isPending] = useActionState<
    WeeklyReviewActionState,
    FormData
  >(boundAction, {});
  const [choseRight, setChoseRight] = useState<string | null>(null);
  const [betterOption, setBetterOption] = useState("");

  const fieldErrors = state.fieldErrors ?? {};

  return (
    <Card className="gap-6 px-6 py-7 md:px-9 md:py-8">
      <form action={formAction} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Label>
            Did Sentraea choose the right option from your list
            {chosenOptionTitle ? (
              <>
                {" "}
                (<span className="font-normal text-muted-foreground">it picked “{chosenOptionTitle}”</span>)
              </>
            ) : null}
            ?
          </Label>
          <ChoiceRow
            name="choseRightOption"
            options={[
              { value: "yes", label: "Yes, right call" },
              { value: "no", label: "No, wrong pick" },
            ]}
            error={fieldErrors.choseRightOption}
            onSelect={setChoseRight}
          />
        </div>

        {choseRight === "no" ? (
          <div className="flex flex-col gap-3 rounded-md border border-muted-foreground/15 bg-muted/40 px-4 py-4">
            <div className="flex flex-col gap-2">
              <Label>Which option should have won?</Label>
              {otherOptionTitles.length ? (
                <div className="flex flex-wrap gap-2">
                  {otherOptionTitles.map((title) => (
                    <button
                      key={title}
                      type="button"
                      onClick={() => setBetterOption(title)}
                      className={cn(
                        "rounded-sm border px-3 py-1.5 text-left text-sm transition-colors",
                        betterOption === title
                          ? "border-primary bg-primary/5 font-medium text-primary"
                          : "border-border bg-card hover:border-primary/40",
                      )}
                    >
                      {title}
                    </button>
                  ))}
                </div>
              ) : null}
              <Input
                name="betterOptionTitle"
                value={betterOption}
                onChange={(e) => setBetterOption(e.target.value)}
                placeholder="Or name a different move"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="feltWrongNotes">
                What made the recommendation feel wrong?
              </Label>
              <Textarea
                id="feltWrongNotes"
                name="feltWrongNotes"
                placeholder="e.g. It underweighted how little time I actually had. The market signal it leaned on didn't apply to my segment."
                className="min-h-20"
              />
            </div>
          </div>
        ) : (
          // Keep the field submitted (empty) when the pick was right.
          <input type="hidden" name="betterOptionTitle" value="" />
        )}

        <div className="flex flex-col gap-2">
          <Label>Did you act on it?</Label>
          <ChoiceRow
            name="actedOn"
            options={[
              { value: "yes", label: "Yes" },
              { value: "partially", label: "Partially" },
              { value: "no", label: "No" },
            ]}
            error={fieldErrors.actedOn}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Was it useful?</Label>
          <ChoiceRow
            name="usefulness"
            options={[
              { value: "useful", label: "Useful" },
              { value: "not_useful", label: "Not useful" },
            ]}
            error={fieldErrors.usefulness}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Did the execution tasks help you start?</Label>
          <ChoiceRow
            name="tasksHelped"
            options={[
              { value: "yes", label: "Yes" },
              { value: "somewhat", label: "Somewhat" },
              { value: "no", label: "No" },
            ]}
            error={fieldErrors.tasksHelped}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="outcomeNotes">What happened?</Label>
          <Textarea
            id="outcomeNotes"
            name="outcomeNotes"
            placeholder="e.g. Did three of the five interviews. Two mentioned the same objection about pricing."
            className="min-h-24"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="changedThisWeek">What changed during the week?</Label>
          <Textarea
            id="changedThisWeek"
            name="changedThisWeek"
            placeholder="e.g. A new competitor launched. Got two inbound demo requests."
            className="min-h-20"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="nextTimeNotes">Anything for next week&apos;s decision?</Label>
          <Textarea
            id="nextTimeNotes"
            name="nextTimeNotes"
            placeholder="e.g. I only have mornings free this month. Weight sales options higher — runway is getting short."
            className="min-h-20"
          />
        </div>

        {state.error ? (
          <p role="alert" className="text-sm text-destructive">
            {state.error}
          </p>
        ) : null}

        <Button type="submit" disabled={isPending} className="py-5 text-base">
          {isPending ? (
            <>
              Saving your review <Loader2 className="animate-spin" />
            </>
          ) : (
            <>
              Close the week <ArrowRight />
            </>
          )}
        </Button>
      </form>
    </Card>
  );
}
