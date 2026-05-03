import type { Metadata } from "next";
import { Inter, Montserrat, Raleway, Lato } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Suspense } from "react";
import NavigationProgress from "@/components/navigation-process";
import { Toaster } from "@/components/ui/sonner";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-body",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Sentraea",
  description: "Research Engine",
};

export default function RootLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${montserrat.variable} ${inter.variable} ${lato.variable} ${raleway.variable} h-full antialiased custom-scroll`}
    >
      <body className="">
        <ThemeProvider
          attribute="class"
          storageKey="theme"
          defaultTheme="light"
          enableSystem={false}
        >
          <TooltipProvider>
            <Suspense fallback={<div className="flex flex-col h-screen items-center justify-center">
              <div className="h-14 w-14 animate-spin rounded-full border-4 border-gray-300 border-t-primary"></div>
              <p className="text-muted-foreground">Loading...</p>
            </div>}>
              <NavigationProgress />
              {children}
            </Suspense>
          </TooltipProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}