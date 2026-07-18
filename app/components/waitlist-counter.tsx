"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

/** Fired by the waitlist forms after a successful signup so every counter
 * on the page bumps immediately instead of waiting for the next refetch. */
export const WAITLIST_JOINED_EVENT = "waitlist:joined";

const AVATAR_GRADIENTS = [
  "from-blue-500 to-indigo-600",
  "from-emerald-400 to-teal-600",
  "from-amber-400 to-orange-500",
  "from-rose-400 to-pink-600",
];

function useWaitlistCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/waitlist")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && typeof data?.count === "number") {
          setCount(data.count);
        }
      })
      .catch(() => {});

    const onJoined = () => setCount((c) => (c === null ? c : c + 1));
    window.addEventListener(WAITLIST_JOINED_EVENT, onJoined);

    return () => {
      cancelled = true;
      window.removeEventListener(WAITLIST_JOINED_EVENT, onJoined);
    };
  }, []);

  return count;
}

/** Counts up from 0 to `target` once, easing out. */
function useCountUp(target: number | null) {
  const [display, setDisplay] = useState(0);
  const animated = useRef(false);

  useEffect(() => {
    if (target === null) return;

    // rAF doesn't fire in hidden tabs — show the final value straight away.
    if (animated.current || document.hidden) {
      animated.current = true;
      setDisplay(target);
      return;
    }
    animated.current = true;

    const duration = 900;
    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * target));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  return display;
}

export function WaitlistCounter({
  className,
  light = false,
}: {
  className?: string;
  /** Use light text colors (for dark backgrounds). */
  light?: boolean;
}) {
  const count = useWaitlistCount();
  const display = useCountUp(count);

  // Nothing to brag about yet — render nothing rather than "0 founders".
  if (count === null || count < 1) return null;

  return (
    <div
      className={cn(
        "flex items-center gap-3 transition-opacity duration-500",
        className,
      )}
    >
      <div className="flex -space-x-2" aria-hidden>
        {AVATAR_GRADIENTS.slice(0, Math.min(count, 4)).map((gradient) => (
          <span
            key={gradient}
            className={cn(
              "inline-block size-6 rounded-full bg-linear-to-br ring-2",
              gradient,
              light ? "ring-white/40" : "ring-background",
            )}
          />
        ))}
      </div>
      <p
        className={cn(
          "text-sm",
          light ? "text-white/90" : "text-muted-foreground",
        )}
      >
        <span
          className={cn(
            "font-semibold tabular-nums",
            light ? "text-white" : "text-foreground",
          )}
        >
          <span className="font-normal">Join</span> {display}
        </span>{" "}
        {count === 1 ? "other founder" : "other founders"} on the waitlist
      </p>
    </div>
  );
}
