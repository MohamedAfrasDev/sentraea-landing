"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger offset in seconds. */
  delay?: number;
  /** Vertical travel in px before settling. */
  y?: number;
  /** Adds a blur-to-sharp reveal on top of the fade. */
  blur?: boolean;
};

/**
 * Scroll-triggered reveal: fade + slight upward motion (+ optional blur).
 * Collapses to a plain fade when the user prefers reduced motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  blur = false,
}: RevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: reducedMotion ? 0 : y,
        filter: blur && !reducedMotion ? "blur(8px)" : "blur(0px)",
      }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}
