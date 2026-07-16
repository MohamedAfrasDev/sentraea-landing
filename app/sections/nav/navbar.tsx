"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import HorizontalLogo from "@/public/logos/SENTRAEA.svg";

const NAV_LINKS = [
  { id: "problem", label: "The problem" },
  { id: "solution", label: "Solution" },
  { id: "how-it-works", label: "How it works" },
  { id: "who-its-for", label: "Who it's for" },
  { id: "faq", label: "FAQ" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  const scrollTo = useCallback((id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav item whose section currently crosses the upper third of the viewport.
  useEffect(() => {
    const sections = NAV_LINKS.map(({ id }) =>
      document.getElementById(id),
    ).filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 md:px-5">
      <div
        className={cn(
          "w-full max-w-6xl rounded-2xl border border-transparent transition-all duration-500",
          scrolled &&
            "border-black/[0.06] bg-white/70 shadow-[0_8px_32px_-12px_rgba(15,23,42,0.12)] backdrop-blur-xl",
        )}
      >
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex cursor-pointer items-center"
            aria-label="Sentraea — back to top"
          >
            <Image
              src={HorizontalLogo}
              alt="Sentraea"
              className="h-6 w-auto md:h-7"
            />
          </button>

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Primary"
          >
            {NAV_LINKS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                aria-current={activeId === id ? "true" : undefined}
                className={cn(
                  "cursor-pointer rounded-full px-3.5 py-1.5 text-sm transition-colors duration-200",
                  activeId === id
                    ? "bg-primary/8 font-medium text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollTo("waitlist")}
              className="group hidden cursor-pointer items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white shadow-[0_4px_16px_-4px_rgba(37,99,235,0.5)] transition-all duration-300 hover:shadow-[0_6px_24px_-4px_rgba(37,99,235,0.65)] md:inline-flex"
            >
              Join the waitlist
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>

            <button
              className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full text-foreground lg:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav
            className="flex flex-col gap-1 border-t border-black/5 bg-white/90 px-4 py-4 backdrop-blur-xl lg:hidden rounded-b-2xl"
            aria-label="Mobile"
          >
            {NAV_LINKS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="cursor-pointer rounded-lg px-3 py-2.5 text-left text-sm text-foreground hover:bg-black/[0.04]"
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("waitlist")}
              className="mt-2 cursor-pointer rounded-lg bg-primary px-3 py-2.5 text-center text-sm font-medium text-white"
            >
              Join the waitlist
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
