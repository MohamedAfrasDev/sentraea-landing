"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function CopyBriefButton({ briefText }: { briefText: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(briefText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't access the clipboard.");
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex cursor-pointer items-center gap-1.5 rounded-sm border border-border bg-card px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-emerald-600" /> Copied
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" /> Copy brief
        </>
      )}
    </button>
  );
}
