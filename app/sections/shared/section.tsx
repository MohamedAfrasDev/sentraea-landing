import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Reveal } from "./reveal";

type SectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};

/** Vertical rhythm wrapper for every landing section. */
export function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("relative scroll-mt-20 py-5 ", className)}>
      {children}
    </section>
  );
}

/** Horizontal content container shared across sections. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full px-10 md:px-15", className)}>
      {children}
    </div>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "center" | "left";
  className?: string;
};

/** Eyebrow + headline + lead paragraph, revealed on scroll. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <Reveal
      className={cn(
        "flex flex-col gap-5",
        centered ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
          {eyebrow}
        </p>
      )}
      <h2 className="max-w-7xl font-heading text-3xl font-medium leading-none tracking-tight text-foreground md:text-6xl">
        {title}
      </h2>
      {lead && (
        <div
          className={cn(
            "max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg",
            centered && "mx-auto",
          )}
        >
          {lead}
        </div>
      )}
    </Reveal>
  );
}
