import { cn } from "@/lib/utils";
import { ReactNode } from "react";

/**
 * Shared building blocks for the product-mockup fragments used across the
 * landing page. Every mockup uses the same shell (white card, thin neutral
 * border, soft shadow) so the fragments read as screens of one product.
 */

export function MockupCard({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "select-none rounded-md bg-card/30 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.02)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Tiny uppercase section label used inside mockups. */
export function MockupLabel({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <p
      className={cn(
        "text-[10px] font-bold uppercase tracking-wider text-neutral-400",
        className,
      )}
    >
      {children}
    </p>
  );
}

const TOOL_DOTS: Record<string, string> = {
  Stripe: "bg-indigo-500",
  HubSpot: "bg-orange-500",
  Notion: "bg-neutral-800",
  Linear: "bg-violet-500",
  PostHog: "bg-amber-500",
};

/** Small connected-tool chip with a brand-toned status dot. */
export function ToolChip({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-xs bg-white px-2 py-0.5 text-[10px] font-semibold tracking-tight text-neutral-600">
      <span
        className={cn(
          "size-1.5 rounded-full",
          TOOL_DOTS[name] ?? "bg-neutral-400",
        )}
      />
      {name}
    </span>
  );
}
