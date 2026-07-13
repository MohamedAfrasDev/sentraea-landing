"use client";

import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { signOut } from "@/actions/auth";
import { cn } from "@/lib/utils";

import HorizontalLogo from "@/public/logos/SENTRAEA.svg";

const NAV_LINKS = [
  { href: "/app", label: "This week" },
  { href: "/app/history", label: "History" },
  { href: "/app/settings", label: "Settings" },
];

export function AppNav({ email }: { email: string }) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-muted-foreground/10 bg-card/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-4 px-5 md:px-8">
        <Link href="/app" className="shrink-0">
          <Image src={HorizontalLogo} alt="Sentraea" width={132} height={34} />
        </Link>

        <nav className="flex items-center gap-1 md:gap-2">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/app"
                ? pathname === "/app" ||
                  pathname.startsWith("/app/analyze") ||
                  pathname.startsWith("/app/recommendations")
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-sm px-3 py-1.5 text-sm transition-colors",
                  active
                    ? "bg-foreground/5 font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden max-w-44 truncate text-xs text-muted-foreground md:block">
            {email}
          </span>
          <form action={signOut}>
            <button
              type="submit"
              className="flex cursor-pointer items-center gap-1.5 rounded-sm px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
