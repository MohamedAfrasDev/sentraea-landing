"use client";

import { useEffect, useState } from "react";
import Logo from "@/assets/images/studinity_logo_new.png";
import Image from "next/image";
import MenuIcon from "@/public/file.svg";
import CloseIcon from "@/public/file.svg";
import { useIsMobile } from "./Responsive";
import Link from "next/link";
import HorizontalLogo from "@/public/logos/SENTRAEA.svg";
import VerticalLogo from "@/public/logos/SENTRAEA_LOGO_ICON.svg";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShrunk, setIsShrunk] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsShrunk(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    const handleKeyDown = (e: any) => {

      if (e.altKey && e.key === "t") {
        setTheme((prev: string) => prev === "dark" ? "light" : "dark");
        console.log("b");
        if (e.repeat) return;
      }


    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [theme]);
  return (
    //  FIX 1: Changed "flex justify-center" to "flex flex-col items-center" 
    //         This stacks the children (navbar and mobile menu) vertically.
    <header className="sticky z-50 w-full flex flex-col items-center transition-all duration-500 ease-in-out"
      style={{
        top: useIsMobile() ? 0 : isShrunk ? 10 : 0
      }}>
      {/* Outer container for width animation */}
      <div
        className={`transition-all w-full flex justify-center ease-in-out duration-500`}
        style={{
          maxWidth: useIsMobile() ? "100%" : isShrunk ? "60%" : "100%",
          minWidth: "100px",
        }}
      >
        {/* Inner navbar */}
        <div className={cn("bg-white/70 dark:bg-gray-950/70  backdrop-blur-lg dark:backdrop-blur-lg   w-full flex items-center justify-between px-10 py-5 md:px-10 md:py-5 dark:border border transition-all duration-300", isShrunk ? "dark:border-gray-700/30 border-gray-300/50" : "dark:border-gray-950")}
          style={{
            borderRadius: isShrunk ? 10 : 0
          }}>
          {/* Logo */}
          <a href="#studinity" className="flex items-center gap-2">
            <Image src={HorizontalLogo} alt="Studinity Logo" className="dark:invert" height={60} width={200} />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-foreground">
            <a href="#features">Features</a>
            <a href="#reviews">Reviews</a>
            <a href="#pricing">Pricing</a>
            <a href="#waitlist" className="bg-black text-white px-4 py-2 rounded-lg font-medium">Join Waitlist</a>

          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <Image src={CloseIcon} alt="Close menu" width={30} height={20} />
            ) : (
              // FIX 2: Changed from <MenuIcon /> to <Image /> for consistency
              // <MenuIcon className="h-5 w-5" />
              <h2>a</h2>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {/* This will now render *below* the div above, which is correct */}
      {isMenuOpen && (
        <div className="md:hidden bg-white w-full border-t shadow animate-slide-down">
          <nav className="flex flex-col items-center gap-4 py-4 text-black/70">
            <a href="#features" onClick={() => setIsMenuOpen(false)}>
              Features
            </a>
            <a href="#reviews" onClick={() => setIsMenuOpen(false)}>
              Reviews
            </a>
            <a href="#pricing" onClick={() => setIsMenuOpen(false)}>
              Pricing
            </a>

            <a href="#waitlist" className="bg-black text-white px-4 py-2 rounded-lg font-medium" onClick={() => setIsMenuOpen(false)}>Join Waitlist</a>

            <Link href={"/learnmore"} onClick={() => setIsMenuOpen(false)}>
              <button
                className="bg-blue-400 text-white px-4 py-2 rounded-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Learn More
              </button></Link>
          </nav>
        </div>
      )}
    </header>
  );
};