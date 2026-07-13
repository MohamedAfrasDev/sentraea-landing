import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-mono text-[11px] uppercase tracking-[0.22em] text-primary",
        className,
      )}
    >
      {children}
    </p>
  );
}

const CONFIDENCE_STYLES: Record<string, string> = {
  high: "bg-emerald-50 text-emerald-700 border-emerald-200",
  medium: "bg-amber-50 text-amber-700 border-amber-200",
  low: "bg-neutral-100 text-neutral-600 border-neutral-200",
};

export function ConfidenceBadge({ level }: { level: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
        CONFIDENCE_STYLES[level] ?? CONFIDENCE_STYLES.low,
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          level === "high"
            ? "bg-emerald-500"
            : level === "medium"
              ? "bg-amber-500"
              : "bg-neutral-400",
        )}
      />
      {level} confidence
    </span>
  );
}

export function UsefulnessBadge({ usefulness }: { usefulness: string }) {
  const useful = usefulness === "useful";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        useful
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-neutral-200 bg-neutral-100 text-neutral-600",
      )}
    >
      {useful ? "Marked useful" : "Marked not useful"}
    </span>
  );
}

export const OPTION_TYPE_LABELS: Record<string, string> = {
  build: "Build",
  outreach: "Outreach",
  research: "Research",
  sales: "Sales",
  ops: "Ops",
};

/** Compact meta chips for a weekly option: type · impact · effort · reversibility. */
export function OptionMetaRow({
  type,
  expectedImpact,
  effort,
  reversible,
  className,
}: {
  type: string;
  expectedImpact: string;
  effort: string;
  reversible: boolean;
  className?: string;
}) {
  const chips = [
    { label: OPTION_TYPE_LABELS[type] ?? type, accent: true },
    { label: `${expectedImpact} impact` },
    { label: `${effort} effort` },
    { label: reversible ? "reversible" : "hard to undo" },
  ];
  return (
    <span className={cn("flex flex-wrap items-center gap-1.5", className)}>
      {chips.map((chip) => (
        <span
          key={chip.label}
          className={cn(
            "inline-flex rounded-full border px-2 py-0.5 font-mono text-[10px] tracking-wide",
            chip.accent
              ? "border-primary/25 bg-primary/5 text-primary"
              : "border-muted-foreground/15 bg-muted/50 text-muted-foreground",
          )}
        >
          {chip.label}
        </span>
      ))}
    </span>
  );
}

export function formatWeekOf(date: Date): string {
  return `Week of ${date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })}`;
}
