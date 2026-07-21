"use client";

import { useCallback, useEffect, useState } from "react";
import Logo from "@/assets/images/studinity_logo_new.png";
import Image from "next/image";
import MenuIcon from "@/public/file.svg";
import CloseIcon from "@/public/file.svg";
import { useIsMobile } from "./Responsive";
import Link from "next/link";
import HorizontalLogo from "@/public/logos/SENTRAEA-FULL-LOGO.svg";
import VerticalLogo from "@/public/logos/SENTRAEA_LOGO_ICON.svg";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import GetStartedBtn from "./getstarted-btn";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import JoinWaitlistDialog from "@/app/components/join-waitlist-dialog";
import { Button } from "./ui/button";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShrunk, setIsShrunk] = useState(false);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const shouldShrink = window.scrollY > 20;
      setIsShrunk((prev) => (prev === shouldShrink ? prev : shouldShrink));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.altKey && e.key === "t") {
        setTheme((prev: string) => (prev === "dark" ? "light" : "dark"));
        console.log("b");
        if (e.repeat) return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [theme]);

  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    //  FIX 1: Changed "flex justify-center" to "flex flex-col items-center"
    //         This stacks the children (navbar and mobile menu) vertically.
    <>
      <JoinWaitlistDialog open={dialogOpen} setOpen={setDialogOpen} />
      <header
        className="sticky z-50 w-full flex flex-col items-center transition-all duration-500 ease-in-out"
        style={{
          top: useIsMobile() ? 0 : isShrunk ? 10 : 0,
        }}
      >
        {/* Outer container for width animation */}
        <div
          className={`transition-all w-full flex justify-center ease-in-out duration-500`}
          style={{
            maxWidth: useIsMobile() ? "100%" : isShrunk ? "89%" : "100%",
            minWidth: "100px",
          }}
        >
          {/* Inner navbar */}
          <div
            className={cn(
              " backdrop-blur-sm bg-white dark:bg-black  rounded-lg   w-full flex items-center justify-between px-10 py-5 md:px-10 md:py-5  transition-all duration-500",
              isShrunk &&
                "bg-white/70 dark:bg-black/70 border-muted-foreground/5  shadow-none shadow-gray-200/90 dark:shadow-gray-950/60 ",
            )}
            style={{
              borderRadius: isShrunk ? 5 : 0,
            }}
          >
            {/* Logo */}
            <button
              onClick={() => scrollTo("sentraea")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Image
                src={HorizontalLogo}
                alt="Sentraea Logo"
                className="dark:invert"
                height={60}
                width={200}
                onClick={() => scrollTo("hero")}
              />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8 text-foreground ">
              <button
                onClick={() => scrollTo("how-it-works")}
                className="cursor-pointer"
              >
                How it works
              </button>
              <button
                onClick={() => scrollTo("faq")}
                className="cursor-pointer"
              >
                FAQ
              </button>
              {/* <Link href="/sign-in" className="cursor-pointer">
              Sign in
            </Link> */}

              <Button
                variant={"outline_without_border"}
                onClick={() => setDialogOpen(true)}
                className={
                  "items-center justify-center text-lg px-3 py-5 shadow-none bg-black text-white"
                }
              >
                Join the Founder Waitlist
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X />
              ) : (
                // FIX 2: Changed from <MenuIcon /> to <Image /> for consistency
                // <MenuIcon className="h-5 w-5" />
                <Menu />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {/* This will now render *below* the div above, which is correct */}
        {isMenuOpen && (
          <div className="md:hidden bg-white w-full border-t shadow animate-slide-down">
            <nav className="flex flex-col items-center gap-4 py-4 text-black/70">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  scrollTo("how-it-works");
                }}
                className="cursor-pointer"
              >
                How it works
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  scrollTo("faq");
                }}
                className="cursor-pointer"
              >
                FAQ
              </button>
              {/* <Link href="/sign-in" className="cursor-pointer">
              Sign in
            </Link> */}

              <Button
                variant={"outline_without_border"}
                onClick={() => setDialogOpen(true)}
                className={
                  "items-center justify-center text-lg px-3 py-5 shadow-none bg-black text-white"
                }
              >
                Join the Founder Waitlist
              </Button>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
