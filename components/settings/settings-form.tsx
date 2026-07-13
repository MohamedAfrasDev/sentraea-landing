"use client";

import { Check, Loader2, Plus, X } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import { updateStartupProfile } from "@/actions/onboarding";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { STARTUP_STAGES } from "@/lib/validators/onboarding";
import { cn } from "@/lib/utils";

export type SettingsFormValues = {
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

export function SettingsForm({ initial }: { initial: SettingsFormValues }) {
  const [state, formAction, isPending] = useActionState(
    updateStartupProfile,
    {},
  );
  const [stage, setStage] = useState(initial.stage);
  const [priorities, setPriorities] = useState<string[]>(
    initial.priorities.length ? initial.priorities : [""],
  );
  const [competitorUrls, setCompetitorUrls] = useState<string[]>(
    initial.competitorUrls,
  );

  useEffect(() => {
    if (state.success) toast.success("Profile saved.");
    if (state.error) toast.error(state.error);
  }, [state]);

  const fieldErrors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="startupName">Startup name</Label>
          <Input
            id="startupName"
            name="startupName"
            defaultValue={initial.startupName}
          />
          {fieldErrors.startupName ? (
            <p className="text-xs text-destructive">{fieldErrors.startupName}</p>
          ) : null}
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="customerType">Customer / ICP</Label>
          <Input
            id="customerType"
            name="customerType"
            defaultValue={initial.customerType}
          />
          {fieldErrors.customerType ? (
            <p className="text-xs text-destructive">
              {fieldErrors.customerType}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="productSummary">Product summary</Label>
        <Textarea
          id="productSummary"
          name="productSummary"
          defaultValue={initial.productSummary}
          className="min-h-20"
        />
        {fieldErrors.productSummary ? (
          <p className="text-xs text-destructive">
            {fieldErrors.productSummary}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Stage</Label>
        <input type="hidden" name="stage" value={stage} />
        <div className="flex flex-wrap gap-2">
          {STARTUP_STAGES.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => setStage(s.value)}
              className={cn(
                "rounded-sm border px-4 py-2 text-sm transition-colors",
                stage === s.value
                  ? "border-primary bg-primary/5 font-medium text-primary"
                  : "border-border bg-card hover:border-primary/40",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
        {fieldErrors.stage ? (
          <p className="text-xs text-destructive">{fieldErrors.stage}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="mainGoal30d">Primary goal (next 30 days)</Label>
        <Textarea
          id="mainGoal30d"
          name="mainGoal30d"
          defaultValue={initial.mainGoal30d}
          className="min-h-20"
        />
        {fieldErrors.mainGoal30d ? (
          <p className="text-xs text-destructive">{fieldErrors.mainGoal30d}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="bottleneck">Current bottleneck</Label>
        <Textarea
          id="bottleneck"
          name="bottleneck"
          defaultValue={initial.bottleneck}
          className="min-h-20"
        />
        {fieldErrors.bottleneck ? (
          <p className="text-xs text-destructive">{fieldErrors.bottleneck}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Priorities being weighed</Label>
        <div className="flex flex-col gap-2">
          {priorities.map((p, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input
                name="priorities"
                value={p}
                onChange={(e) =>
                  setPriorities(
                    priorities.map((v, j) => (j === i ? e.target.value : v)),
                  )
                }
              />
              {priorities.length > 1 ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setPriorities(priorities.filter((_, j) => j !== i))
                  }
                  aria-label="Remove priority"
                >
                  <X />
                </Button>
              ) : null}
            </div>
          ))}
        </div>
        {priorities.length < 8 ? (
          <Button
            type="button"
            variant="ghost"
            className="w-fit"
            onClick={() => setPriorities([...priorities, ""])}
          >
            <Plus /> Add priority
          </Button>
        ) : null}
        {fieldErrors.priorities ? (
          <p className="text-xs text-destructive">{fieldErrors.priorities}</p>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="websiteUrl">Website URL</Label>
          <Input
            id="websiteUrl"
            name="websiteUrl"
            type="url"
            defaultValue={initial.websiteUrl}
            placeholder="https://"
          />
          {fieldErrors.websiteUrl ? (
            <p className="text-xs text-destructive">{fieldErrors.websiteUrl}</p>
          ) : null}
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="productUrl">Product URL</Label>
          <Input
            id="productUrl"
            name="productUrl"
            type="url"
            defaultValue={initial.productUrl}
            placeholder="https://"
          />
          {fieldErrors.productUrl ? (
            <p className="text-xs text-destructive">{fieldErrors.productUrl}</p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Competitor URLs</Label>
        <div className="flex flex-col gap-2">
          {competitorUrls.map((u, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input
                name="competitorUrls"
                type="url"
                value={u}
                onChange={(e) =>
                  setCompetitorUrls(
                    competitorUrls.map((v, j) =>
                      j === i ? e.target.value : v,
                    ),
                  )
                }
                placeholder="https://competitor.com"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() =>
                  setCompetitorUrls(competitorUrls.filter((_, j) => j !== i))
                }
                aria-label="Remove competitor"
              >
                <X />
              </Button>
            </div>
          ))}
        </div>
        {competitorUrls.length < 6 ? (
          <Button
            type="button"
            variant="ghost"
            className="w-fit"
            onClick={() => setCompetitorUrls([...competitorUrls, ""])}
          >
            <Plus /> Add competitor
          </Button>
        ) : null}
        {fieldErrors.competitorUrls ? (
          <p className="text-xs text-destructive">
            {fieldErrors.competitorUrls}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="recentChanges">What changed recently?</Label>
        <Textarea
          id="recentChanges"
          name="recentChanges"
          defaultValue={initial.recentChanges}
          className="min-h-20"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="notes">Notes for Sentraea</Label>
        <Textarea
          id="notes"
          name="notes"
          defaultValue={initial.notes}
          className="min-h-20"
        />
      </div>

      <Button type="submit" disabled={isPending} className="w-fit px-6 py-5">
        {isPending ? (
          <>
            Saving <Loader2 className="animate-spin" />
          </>
        ) : state.success ? (
          <>
            Saved <Check />
          </>
        ) : (
          "Save changes"
        )}
      </Button>
    </form>
  );
}
