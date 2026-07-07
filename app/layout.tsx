import type { Metadata } from "next";
import {
  Inter,
  Montserrat,
  Raleway,
  Lato,
  JetBrains_Mono,
  Geist_Mono,
  Manrope,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import { Suspense } from "react";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";

import NavigationProgress from "@/components/navigation-process";
const arizonaFlare = localFont({
  src: [
    {
      path: "../public/fonts/ABCArizonaFlare-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-arizona-flare",
});
const heming = localFont({
  src: [
    {
      path: "../public/fonts/Heming.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-heming",
});
const overcame = localFont({
  src: [
    {
      path: "../public/fonts/overcame-demo.outline.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-overcame",
});

const gtsuper = localFont({
  src: [
    {
      path: "../public/fonts/GT-Super-Display-Light-Italic-Trial.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/GT-Super-Display-Light-Trial.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/GT-Super-Display-Regular-Italic-Trial.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/GT-Super-Display-Regular-Trial.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/GT-Super-Display-Medium-Italic-Trial.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/GT-Super-Display-Medium-Trial.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/GT-Super-Display-Bold-Italic-Trial.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/GT-Super-Display-Bold-Trial.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/GT-Super-Display-Super-Italic-Trial.otf",
      weight: "900",
      style: "italic",
    },
    {
      path: "../public/fonts/GT-Super-Display-Super-Trial.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-gtsuper",
});
const sfproDisplay = localFont({
  src: [
    {
      path: "../public/fonts/SFPRODISPLAYTHINITALIC.otf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../public/fonts/SFPRODISPLAYULTRALIGHTITALIC.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../public/fonts/SFPRODISPLAYLIGHTITALIC.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/SFPRODISPLAYREGULAR.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/SFPRODISPLAYMEDIUM.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/SFPRODISPLAYSEMIBOLDITALIC.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../public/fonts/SFPRODISPLAYBOLD.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/SFPRODISPLAYHEAVYITALIC.otf",
      weight: "800",
      style: "italic",
    },
    {
      path: "../public/fonts/SFPRODISPLAYBLACKITALIC.otf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-sfpro",
});
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-raleway",
});
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});
const lato = Lato({
  subsets: ["latin"],
  weight: ["300"],
  variable: "--font-lato",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-number",
});

const manropeFont = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Sentraea | An Execution System for Bootstrapped Startup Founders",
  description:
    "Guide your bootstrapped startup with an AI execution system from idea to scale.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={` ${inter.variable} ${playfairDisplay.variable} ${gtsuper.variable} ${overcame.variable} ${manropeFont.variable} ${heming.variable} ${arizonaFlare.variable} ${sfproDisplay.variable} ${geistMono.variable} ${jetbrainsMono.variable}  ${lato.variable} ${raleway.variable} h-full antialiased custom-scroll scroll-smooth`}
    >
      <body className="">
        <ThemeProvider
          attribute="class"
          storageKey="theme"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
        >
          <Analytics />
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
