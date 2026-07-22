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
  Instrument_Serif,
  Plus_Jakarta_Sans,
} from "next/font/google";
import Clarity from "@microsoft/clarity";

import twImage from "@/public/illustrations/twitt.png";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import { Suspense } from "react";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";

import NavigationProgress from "@/components/navigation-process";
import ClarityProvider from "@/components/ClarityProvider";
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

const clashDisplay = localFont({
  src: [
    {
      path: "../public/fonts/ClashDisplay-Extralight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/ClashDisplay-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/ClashDisplay-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/ClashDisplay-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/ClashDisplay-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/ClashDisplay-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-clash-display",
});
const satoshi = localFont({
  src: [
    {
      path: "../public/fonts/Satoshi-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/Satoshi-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/Satoshi-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/Satoshi-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/Satoshi-Black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-BlackItalic.otf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-satoshi",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-raleway",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument-serif",
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
  title:
    "Sentraea — Know the One Highest-Leverage Move for Your SaaS Every Week",
  description:
    "Sentraea helps early-stage B2B SaaS founders identify the single highest-leverage move every week by analyzing business context, bottlenecks, and growth signals.",
  openGraph: {
    title:
      "Sentraea — Know the One Highest-Leverage Move for Your SaaS Every Week",
    description:
      "Sentraea helps early-stage B2B SaaS founders identify the single highest-leverage move every week by analyzing business context, bottlenecks, and growth signals.",
    type: "website",
    siteName: "Sentraea",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sentraea",
    images: twImage.src,
    title:
      "Sentraea — Know the One Highest-Leverage Move for Your SaaS Every Week",
    description:
      "Sentraea helps early-stage B2B SaaS founders identify the single highest-leverage move every week by analyzing business context, bottlenecks, and growth signals.",
  },
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
      className={` ${inter.variable} ${instrumentSerif.variable} ${playfairDisplay.variable} ${gtsuper.variable} ${overcame.variable} ${manropeFont.variable} ${heming.variable} ${arizonaFlare.variable} ${sfproDisplay.variable} ${clashDisplay.variable} ${satoshi.variable} ${geistMono.variable} ${jetbrainsMono.variable}  ${lato.variable} ${raleway.variable} h-full antialiased custom-scroll scroll-smooth`}
    >
      <body className="">
        <ThemeProvider>
          <ClarityProvider />
          <Analytics />
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
