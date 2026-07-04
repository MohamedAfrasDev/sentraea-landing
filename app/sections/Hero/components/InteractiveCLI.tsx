"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ─── Types ────────────────────────────────────────────────────── */
interface OutputLine {
  id: number;
  type: "cmd" | "info" | "success" | "warn" | "error" | "ai" | "divider";
  text: string;
}

interface DemoStep {
  cmd: string;
  outputs: OutputLine[];
  delay: number; // ms before the next step auto-fires
}

/* ─── Demo script ───────────────────────────────────────────────── */
let _lineId = 0;
const L = (type: OutputLine["type"], text: string): OutputLine => ({
  id: ++_lineId,
  type,
  text,
});

const DEMO_STEPS: DemoStep[] = [
  {
    cmd: "sentraea init",
    delay: 2600,
    outputs: [
      L("info", "Bootstrapping execution system…"),
      L("success", "✓  Workspace initialised"),
      L("success", "✓  Founder profile created"),
      L("info", "Run `sentraea validate` to audit your idea."),
    ],
  },
  {
    cmd: 'sentraea validate --idea "AI research assistant for solo founders"',
    delay: 3400,
    outputs: [
      L("info", "Running market-fit analysis…"),
      L("info", "Scanning 2 847 competitor signals…"),
      L("warn", "⚠  High competition density detected (ICP overlap: 68 %)"),
      L("success", "✓  Demand signal confirmed via trend data"),
      L(
        "ai",
        "AI › Narrow ICP to technical founders in seed stage. Reduces overlap to 12 %.",
      ),
    ],
  },
  {
    cmd: "sentraea plan --stage 1",
    delay: 3000,
    outputs: [
      L("info", "Building Stage 1 execution map…"),
      L("success", "✓  4 milestones generated"),
      L("success", "✓  Weekly sprint cadence locked"),
      L(
        "ai",
        "AI › Week 1: Ship a 1-question landing page. Target 50 opt-ins before any code.",
      ),
      L("info", "Run `sentraea track` to log progress."),
    ],
  },
  {
    cmd: 'sentraea track --log "Got 12 sign-ups in 48 h"',
    delay: 2800,
    outputs: [
      L("success", "✓  Progress logged"),
      L("info", "Milestone velocity: 24 % above forecast"),
      L(
        "ai",
        "AI › You are ahead. Do NOT add features — double down on outreach.",
      ),
      L("divider", ""),
      L("success", "✓  Next checkpoint in 5 days · keep building."),
    ],
  },
];

/* ─── Helpers ───────────────────────────────────────────────────── */
const COLOR: Record<OutputLine["type"], string> = {
  cmd: "text-[#7dd3fc]", // sky-300
  info: "text-[#94a3b8]", // slate-400
  success: "text-[#4ade80]", // green-400
  warn: "text-[#facc15]", // yellow-400
  error: "text-[#f87171]", // red-400
  ai: "text-[#a78bfa]", // violet-400
  divider: "text-[#334155]",
};

const PREFIX: Record<OutputLine["type"], string> = {
  cmd: "$ ",
  info: "  ",
  success: "  ",
  warn: "  ",
  error: "  ",
  ai: "  ",
  divider: "",
};

/* ─── Typewriter hook ───────────────────────────────────────────── */
function useTypewriter(text: string, speed = 38, active = true) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!active) {
      setDisplayed(text);
      return;
    }
    setDisplayed("");
    if (!text) return;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed, active]);

  return displayed;
}

/* ─── Single output line (revealed after a short stagger) ─────── */
function OutputRow({ line, index }: { line: OutputLine; index: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100 + index * 90);
    return () => clearTimeout(t);
  }, [index]);

  if (line.type === "divider") {
    return (
      <div
        className={`transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
      >
        <div className="border-t border-[#1e293b] my-1" />
      </div>
    );
  }

  return (
    <div
      className={`font-mono text-[13px] leading-6 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
      } ${COLOR[line.type]}`}
    >
      <span className="opacity-40">{PREFIX[line.type]}</span>
      {line.text}
    </div>
  );
}

/* ─── Typed command line ────────────────────────────────────────── */
function CommandLine({ cmd, onDone }: { cmd: string; onDone: () => void }) {
  const typed = useTypewriter(cmd, 36, true);
  const done = useRef(false);

  useEffect(() => {
    if (!done.current && typed === cmd) {
      done.current = true;
      // small pause after typing finishes before outputs appear
      const t = setTimeout(onDone, 280);
      return () => clearTimeout(t);
    }
  }, [typed, cmd, onDone]);

  return (
    <div className="font-mono text-[13px] leading-6 text-[#7dd3fc] flex items-center gap-1">
      <span className="text-[#4ade80] select-none">❯</span>
      <span>{typed}</span>
      {typed !== cmd && (
        <span className="inline-block w-[7px] h-[14px] bg-[#7dd3fc] ml-0.5 animate-pulse" />
      )}
    </div>
  );
}

/* ─── Main CLI Component ────────────────────────────────────────── */
export default function InteractiveCLI() {
  const [stepIndex, setStepIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "outputs" | "idle">("typing");
  const [lines, setLines] = useState<OutputLine[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [userHistory, setUserHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const autoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const step = DEMO_STEPS[stepIndex % DEMO_STEPS.length];

  /* Auto-scroll — only moves the terminal's own container, never the page */
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, phase]);

  /* After typing finishes → reveal outputs */
  const handleCmdDone = useCallback(() => {
    setPhase("outputs");
    setLines((prev) => [...prev, ...step.outputs]);

    autoTimer.current = setTimeout(() => {
      setPhase("typing");
      setStepIndex((i) => i + 1);
    }, step.delay);
  }, [step]);

  useEffect(
    () => () => {
      if (autoTimer.current) clearTimeout(autoTimer.current);
    },
    [],
  );

  /* User submits their own command */
  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputValue.trim();
    if (!cmd) return;

    setUserHistory((h) => [cmd, ...h]);
    setHistIdx(-1);
    setInputValue("");

    // Append user command + a generic AI reply
    setLines((prev) => [
      ...prev,
      L("cmd", cmd),
      L(
        "ai",
        `AI › "${cmd}" logged. Sentraea will factor this into your next sprint.`,
      ),
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, userHistory.length - 1);
      setHistIdx(next);
      setInputValue(userHistory[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInputValue(next === -1 ? "" : (userHistory[next] ?? ""));
    }
  };

  return (
    <div
      className="
        relative w-full max-w-[520px]
        rounded-sm overflow-hidden
        bg-black dark:bg-gray-800/40
        backdrop-blur-2xl
        shadow-xl
      "
      onClick={() => inputRef.current?.focus()}
    >
      {/* ── Title bar ── */}
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-200/30 border-b dark:bg-gray-950 border-white/[0.05]">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[11px] text-[#475569] tracking-wide select-none">
          sentraea — execution terminal
        </span>
        {/* Live indicator */}
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
          <span className="font-mono text-[10px] text-[#4ade80]/60 tracking-widest uppercase">
            live
          </span>
        </div>
      </div>

      {/* ── Terminal body ── */}
      <div
        ref={scrollContainerRef}
        className="
          h-[340px] overflow-y-auto px-4 py-3
          custom-scroll flex flex-col gap-0.5
        "
      >
        {/* Welcome banner */}
        <div className="mb-2">
          <div className="font-mono text-[11px] text-[#1e40af]/80 bg-[#1e40af]/10 rounded-sm shadow-md px-3 py-1.5 inline-block">
            Sentraea v1.0.0 · Solo-founder execution system · Type a command ↓
          </div>
        </div>

        {/* All accumulated lines */}
        {lines.map((line, i) => (
          <OutputRow key={line.id} line={line} index={i} />
        ))}

        {/* Current demo step being typed */}
        {phase === "typing" && (
          <CommandLine cmd={step.cmd} onDone={handleCmdDone} />
        )}
      </div>

      {/* ── Input bar ── */}
      <form
        onSubmit={handleUserSubmit}
        className="flex items-center gap-2 px-4 py-2.5 bg-gray-200/30 dark:bg-gray-950 border-t border-white/5"
      >
        <span className="font-mono text-[13px] text-[#4ade80] select-none shrink-0">
          ❯
        </span>
        <input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type a command…"
          className="
            flex-1 bg-transparent font-mono text-[13px] 
            outline-none placeholder:text-[#334155]
            caret-[#7dd3fc]
          "
          spellCheck={false}
          autoComplete="off"
        />
        <kbd className="font-mono text-[10px] text-[#334155] border border-[#1e293b] rounded px-1.5 py-0.5 select-none">
          ↵
        </kbd>
      </form>
    </div>
  );
}
