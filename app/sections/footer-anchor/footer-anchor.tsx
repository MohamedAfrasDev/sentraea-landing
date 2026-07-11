import React from "react";

const NAV_LINKS = [
  { label: "How it works", href: "#howitworks" },
  { label: "Why trust it", href: "#trust" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "mailto:hello@sentraea.com" },
  { label: "Privacy", href: "#" },
];

const FooterAnchor = () => {
  return (
    <footer className="border-t border-neutral-200/60 bg-neutral-50/50 px-6 py-16">
      <div className="mx-auto max-w-6xl">
        {/* grid split */}
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          {/* brand node */}
          <div>
            <p className="font-heading text-xl font-bold tracking-tight text-neutral-900">
              SENTRAEA
            </p>
            <p className="mt-2 max-w-[200px] text-xs leading-normal text-neutral-400">
              Weekly founder operating system for solo founders
            </p>
          </div>

          {/* nav links */}
          <nav className="flex flex-wrap gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* baseline */}
        <p className="mt-12 block border-t border-neutral-200/40 pt-6 font-mono text-[11px] tracking-wide text-neutral-400">
          Built for founders trying not to lose another week to scattered work.
        </p>
      </div>
    </footer>
  );
};

export default FooterAnchor;
