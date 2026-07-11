import React from "react";

/* ---------------------------------------------------------------- */
/*  Markers — thin geometric strokes, matching section icon style    */
/* ---------------------------------------------------------------- */

/* brand-blue check inside a sharp square */
function MarkCheck() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="mt-0.5 h-5 w-5 shrink-0"
      aria-hidden="true"
    >
      <rect
        x="1.25"
        y="1.25"
        width="17.5"
        height="17.5"
        rx="4"
        fill="none"
        stroke="#2563eb"
        strokeOpacity="0.25"
        strokeWidth="1.25"
      />
      <path
        d="m6 10.3 2.6 2.6 5.4-5.8"
        fill="none"
        stroke="#2563eb"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* soft gray cross */
function MarkCross() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="mt-0.5 h-5 w-5 shrink-0"
      aria-hidden="true"
    >
      <path
        d="m6.25 6.25 7.5 7.5m0-7.5-7.5 7.5"
        fill="none"
        stroke="#a3a3a3"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ---------------------------------------------------------------- */
/*  Content                                                          */
/* ---------------------------------------------------------------- */

const BEST_FOR = [
  "Solo founders carrying every decision alone",
  "Bootstrapped builders where every week counts",
  "Founders actively shipping and selling",
  "Anyone drowning in equally plausible priorities",
  "Teams with messy tools but no weekly operating system",
];

const NOT_FOR = [
  "People who just want brainstorming",
  "Teams looking for a generic AI chatbot",
  "Large companies with mature operating layers",
  "Founders who want passive advice without execution",
];

/* ---------------------------------------------------------------- */
/*  Section                                                          */
/* ---------------------------------------------------------------- */

const FitSection = () => {
  return (
    <section id="fit" className="bg-white px-6 py-32 md:px-10">
      <div className="mx-auto max-w-[1280px]">
        {/* header stack */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
            Fit
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
            Built for a specific kind of founder.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-neutral-500">
            Sentraea is deliberately narrow. That&apos;s the point.
          </p>
        </div>

        {/* asymmetric split cards */}
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          {/* best for — emphasized */}
          <div className="rounded-3xl border border-black/[0.07] bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_16px_40px_-12px_rgba(15,23,42,0.08)] md:p-10">
            <p className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
              <span className="h-1.5 w-1.5 rounded-sm bg-blue-500" />
              Best for
            </p>
            <ul className="space-y-4">
              {BEST_FOR.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <MarkCheck />
                  <span className="text-[15px] leading-relaxed text-neutral-700">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* not for — de-emphasized */}
          <div className="rounded-3xl border border-black/[0.04] bg-neutral-50 p-8 md:p-10">
            <p className="mb-6 text-xs font-bold uppercase tracking-wider text-neutral-400">
              Not for
            </p>
            <ul className="space-y-4">
              {NOT_FOR.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <MarkCross />
                  <span className="text-[15px] leading-relaxed text-neutral-400">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* bottom line */}
        <div className="mx-auto mt-16 max-w-xl text-center">
          <p className="font-heading text-lg font-medium leading-relaxed tracking-tight text-neutral-800 md:text-xl">
            Sentraea is for founders who want a system that narrows the week
            and helps carry it forward.
          </p>
          <a
            href="#waitlist"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
          >
            That&apos;s you? Claim a founding spot
            <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
              <path
                d="M2 6h8M7 3l3 3-3 3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FitSection;
