"use client";

import React from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const ROWS = [
  "Stage-gated — you can't skip ahead",
  "Requires evidence before advancing",
  "Built only for solo, bootstrapped founders",
  "Blocks building before validation",
  "Remembers your decision history",
  "Matched to your stage, not your business size",
];

const COLUMNS = [
  { name: "Generic advice", values: [false, false, false, false, false, false] },
  { name: "AI copilots", values: [false, false, false, false, true, false] },
  { name: "Productivity apps", values: [false, false, false, false, true, false] },
  { name: "Sentraea", values: [true, true, true, true, true, true], highlight: true },
];

const Differentiators = () => {
  return (
    <section className="flex flex-col py-24 md:py-32">
      <p className="text-sm uppercase tracking-[0.2em] text-primary font-medium">
        What Makes It Different
      </p>
      <h2 className="text-4xl md:text-6xl font-medium tracking-tight md:tracking-[-3px] mt-3 max-w-3xl">
        Not advice. Not a copilot. A gate.
      </h2>
      <p className="text-lg text-muted-foreground mt-4 max-w-2xl tracking-tight">
        Most tools tell you what could work. Sentraea won&apos;t let you move
        forward until you&apos;ve proven it does.
      </p>

      <div className="mt-14 overflow-x-auto custom-scroll">
        <table className="w-full min-w-[720px] border-collapse">
          <thead>
            <tr>
              <th className="text-left pb-4 pr-6 font-normal text-muted-foreground text-sm align-bottom" />
              {COLUMNS.map((col) => (
                <th
                  key={col.name}
                  className={cn(
                    "text-left pb-4 px-4 align-bottom font-medium text-lg tracking-tight",
                    col.highlight && "text-primary",
                  )}
                >
                  {col.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, i) => (
              <tr key={row} className="border-t border-border">
                <td className="py-4 pr-6 text-base md:text-lg tracking-tight text-foreground/90 max-w-xs">
                  {row}
                </td>
                {COLUMNS.map((col) => (
                  <td key={col.name} className="py-4 px-4">
                    <div
                      className={cn(
                        "flex items-center justify-start w-9 h-9 rounded-md",
                        col.highlight && "bg-primary/10",
                      )}
                    >
                      {col.values[i] ? (
                        <Check
                          className={cn(
                            "w-5 h-5",
                            col.highlight ? "text-primary" : "text-foreground",
                          )}
                        />
                      ) : (
                        <Minus className="w-5 h-5 text-muted-foreground/30" />
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Differentiators;
