"use client";

import { Loader2, ThumbsDown, ThumbsUp } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { markUsefulness } from "@/actions/feedback";
import { cn } from "@/lib/utils";

export function FeedbackActions({
  recommendationId,
  currentUsefulness,
}: {
  recommendationId: string;
  currentUsefulness: string | null;
}) {
  const [isPending, startTransition] = useTransition();
  const [pendingChoice, setPendingChoice] = useState<string | null>(null);

  const submit = (usefulness: "useful" | "not_useful") => {
    setPendingChoice(usefulness);
    startTransition(async () => {
      const result = await markUsefulness(recommendationId, usefulness);
      setPendingChoice(null);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(
          usefulness === "useful"
            ? "Noted. Feedback sharpens next week's run."
            : "Noted. Sentraea will weigh this next week.",
        );
      }
    });
  };

  const baseClass =
    "inline-flex cursor-pointer items-center gap-1.5 rounded-sm border px-3.5 py-2 text-sm font-medium transition-colors disabled:opacity-50";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        disabled={isPending}
        onClick={() => submit("useful")}
        className={cn(
          baseClass,
          currentUsefulness === "useful"
            ? "border-emerald-300 bg-emerald-50 text-emerald-700"
            : "border-border bg-card text-foreground hover:border-emerald-300 hover:text-emerald-700",
        )}
      >
        {isPending && pendingChoice === "useful" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <ThumbsUp className="h-4 w-4" />
        )}
        Useful
      </button>
      <button
        type="button"
        disabled={isPending}
        onClick={() => submit("not_useful")}
        className={cn(
          baseClass,
          currentUsefulness === "not_useful"
            ? "border-neutral-400 bg-neutral-100 text-neutral-700"
            : "border-border bg-card text-foreground hover:border-neutral-400",
        )}
      >
        {isPending && pendingChoice === "not_useful" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <ThumbsDown className="h-4 w-4" />
        )}
        Not useful
      </button>
    </div>
  );
}
