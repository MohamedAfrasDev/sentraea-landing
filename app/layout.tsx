import type { Metadata } from "next";
import { Inter, Montserrat, Raleway, Lato, JetBrains_Mono, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import { Suspense } from "react";
import NavigationProgress from "@/components/navigation-process";

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
  weight: ["300",],
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
      className={`${montserrat.variable} ${inter.variable} ${geistMono.variable} ${jetbrainsMono.variable}  ${lato.variable} ${raleway.variable} h-full antialiased custom-scroll`}
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