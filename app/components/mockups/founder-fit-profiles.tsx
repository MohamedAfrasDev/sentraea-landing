import { MockupCard } from "./mockup-primitives";
import { cn } from "@/lib/utils";

/**
 * Three compact founder profile cards for the "Who it's for" section,
 * so visitors can self-identify at a glance before reading the fit lists.
 */

type FounderProfile = {
  initial: string;
  name: string;
  traits: readonly string[];
  fit: "High" | "Low";
};

const PROFILES: readonly FounderProfile[] = [
  {
    initial: "A",
    name: "Founder A",
    traits: ["12 customers", "$3k MRR", "Founder-led sales"],
    fit: "High",
  },
  {
    initial: "B",
    name: "Founder B",
    traits: [
      "38 customers",
      "Inconsistent pipeline",
      "Too many competing priorities",
    ],
    fit: "High",
  },
  {
    initial: "C",
    name: "Founder C",
    traits: ["Pre-product", "No customers yet"],
    fit: "Low",
  },
] as const;

export function FounderFitProfiles() {
  return (
    <div
      role="img"
      aria-label="Three founder profiles: a founder with 12 customers and 3 thousand dollars of monthly revenue is a high fit, a founder with 38 customers and too many priorities is a high fit, and a pre-product founder with no customers yet is a low fit"
      className="grid select-none grid-cols-1 gap-3 sm:grid-cols-3"
    >
      {PROFILES.map(({ initial, name, traits, fit }) => {
        const isHighFit = fit === "High";
        return (
          <MockupCard
            key={name}
            className={cn(
              "flex h-full flex-col gap-3",
              !isHighFit && "bg-neutral-50/80 opacity-80",
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span
                  className={cn(
                    "flex size-8 items-center justify-center rounded-full text-xs font-bold",
                    isHighFit
                      ? "bg-blue-50 text-blue-700"
                      : "bg-neutral-100 text-neutral-400",
                  )}
                >
                  {initial}
                </span>
                <span className="text-sm font-semibold text-neutral-800">
                  {name}
                </span>
              </div>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-bold",
                  isHighFit
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-neutral-100 text-neutral-400",
                )}
              >
                Fit: {fit}
              </span>
            </div>
            <ul className="space-y-1.5">
              {traits.map((trait) => (
                <li
                  key={trait}
                  className={cn(
                    "flex items-center gap-2 text-xs",
                    isHighFit ? "text-neutral-600" : "text-neutral-400",
                  )}
                >
                  <span
                    className={cn(
                      "size-1 shrink-0 rounded-full",
                      isHighFit ? "bg-blue-400" : "bg-neutral-300",
                    )}
                    aria-hidden
                  />
                  {trait}
                </li>
              ))}
            </ul>
          </MockupCard>
        );
      })}
    </div>
  );
}
