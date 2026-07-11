import React from "react";

/* ---------------------------------------------------------------- */
/*  Micro icons — thin monochrome strokes, 1.25px                    */
/* ---------------------------------------------------------------- */

type IconProps = React.SVGProps<SVGSVGElement>;

const iconBase = {
  viewBox: "0 0 20 20",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/* email frame */
function IconMail(props: IconProps) {
  return (
    <svg {...iconBase} {...props}>
      <rect x="2.5" y="4.5" width="15" height="11" rx="1.5" />
      <path d="m3 5.5 7 5.5 7-5.5" />
    </svg>
  );
}

/* workflow nodes */
function IconFlow(props: IconProps) {
  return (
    <svg {...iconBase} {...props}>
      <circle cx="4.5" cy="10" r="2" />
      <circle cx="15.5" cy="4.5" r="2" />
      <circle cx="15.5" cy="15.5" r="2" />
      <path d="M6.4 9.2 13.6 5.3M6.4 10.8l7.2 3.9" />
    </svg>
  );
}

/* layered notes */
function IconLayers(props: IconProps) {
  return (
    <svg {...iconBase} {...props}>
      <path d="m10 2.75 7.25 3.75L10 10.25 2.75 6.5 10 2.75Z" />
      <path d="m2.75 10.5 7.25 3.75 7.25-3.75" />
      <path d="m2.75 14 7.25 3.75L17.25 14" />
    </svg>
  );
}

/* compressed lines */
function IconCompress(props: IconProps) {
  return (
    <svg {...iconBase} {...props}>
      <path d="M3 4.5h14M3 8h14M5.5 11.5h9M7.5 15h5" />
    </svg>
  );
}

/* checklist */
function IconChecklist(props: IconProps) {
  return (
    <svg {...iconBase} {...props}>
      <path d="m3 5.25 1.4 1.4 2.35-2.6M3 12.25l1.4 1.4 2.35-2.6" />
      <path d="M10 5.5h7M10 12.5h7" />
    </svg>
  );
}

/* reduced stack — chevron collapse */
function IconReduce(props: IconProps) {
  return (
    <svg {...iconBase} {...props}>
      <path d="m5 3.5 5 4 5-4M5 16.5l5-4 5 4" />
      <path d="M4 10h12" />
    </svg>
  );
}

/* info mark for safeguard note */
function IconInfo(props: IconProps) {
  return (
    <svg {...iconBase} {...props}>
      <circle cx="10" cy="10" r="7.25" />
      <path d="M10 9v4.5" />
      <circle cx="10" cy="6.4" r="0.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* ---------------------------------------------------------------- */
/*  Grid content                                                     */
/* ---------------------------------------------------------------- */

const CARDS = [
  {
    icon: IconMail,
    title: "Draft outreach emails",
    description: "Prepare first-pass outbound based on the chosen weekly move.",
  },
  {
    icon: IconFlow,
    title: "Build simple workflows",
    description: "Set up follow-ups, reminders, and task flows.",
  },
  {
    icon: IconLayers,
    title: "Organize founder research",
    description: "Turn scattered notes into usable context.",
  },
  {
    icon: IconCompress,
    title: "Summarize market findings",
    description: "Compress live research into a readable decision layer.",
  },
  {
    icon: IconChecklist,
    title: "Prepare next-step checklists",
    description: "Translate recommendations into concrete execution.",
  },
  {
    icon: IconReduce,
    title: "Reduce repeated admin",
    description: "Remove the small decisions that drain focus.",
  },
];

/* ---------------------------------------------------------------- */
/*  Section                                                          */
/* ---------------------------------------------------------------- */

const ExecutionGrid = () => {
  return (
    <section id="execution" className="bg-[#09090b] px-6 py-32 md:px-10">
      <div className="mx-auto max-w-7xl">
        {/* header stack */}
        <div className="text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-blue-500">
            Execution
          </p>
          <h2 className="mb-4 font-heading text-4xl font-bold tracking-tight text-white md:text-5xl">
            It does more than recommend.
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-neutral-400 md:text-lg">
            Once Sentraea identifies the weekly priority, it handles the small,
            reversible work around that decision so you are not carrying every
            follow-up, draft, and workflow yourself.
          </p>

          {/* bounded-execution chips — answers "is this just another chat tool?" */}
          <div className="mb-16 flex flex-wrap items-center justify-center gap-2">
            {["Not a chat window", "Bounded scope", "Reversible by design", "You approve every send"].map(
              (chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 font-mono text-[10.5px] tracking-wide text-neutral-400"
                >
                  {chip}
                </span>
              ),
            )}
          </div>
        </div>

        {/* 2x3 joined execution grid */}
        <div className="grid grid-cols-1 gap-0 overflow-hidden rounded-2xl border border-white/[0.09] md:grid-cols-2">
          {CARDS.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group bg-card/1 backdrop-blur-sm border-white/[0.06] border-[0.5px] px-7 py-8 transition-colors duration-300 hover:bg-white/[0.025]"
            >
              <span className="mb-5 flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] transition-colors duration-300 group-hover:border-white/[0.14]">
                <Icon className="h-[18px] w-[18px] text-neutral-400 transition-colors duration-300 group-hover:text-neutral-200" />
              </span>
              <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-neutral-400">
                {description}
              </p>
            </div>
          ))}
        </div>

        {/* safeguard note */}
        <div className="mx-auto mt-16 max-w-xl text-center">
          <div className="inline-flex items-start gap-2.5 text-left">
            <IconInfo className="mt-0.5 h-4 w-4 shrink-0 text-neutral-600" />
            <p className="font-mono text-xs leading-relaxed tracking-wide text-neutral-500">
              Sentraea automates the small, reversible tasks around the
              decision. It does not pretend to replace founder judgment on major
              strategy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExecutionGrid;
