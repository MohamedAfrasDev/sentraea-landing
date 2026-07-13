"use client";

import { createContext, useCallback, useContext, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: Theme;
  themes: Theme[];
  setTheme: (value: Theme | ((prev: Theme) => Theme)) => void;
};

const DEFAULT_CONTEXT: ThemeContextValue = {
  theme: "light",
  resolvedTheme: "light",
  themes: ["light"],
  setTheme: () => {},
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Sentraea is light-mode only, so this replaces next-themes rather than
 * configuring it. next-themes injects its theme-detection script via
 * React.createElement("script", ...), which React 19.2 warns about
 * ("Encountered a script tag while rendering React component") — a script
 * this app has no use for since there's no system/persisted theme to detect.
 * Same context shape (theme, resolvedTheme, themes, setTheme) so existing
 * `useTheme()` call sites don't need to change.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const setTheme = useCallback(
    (value: Theme | ((prev: Theme) => Theme)) => {
      setThemeState((prev) => (typeof value === "function" ? value(prev) : value));
    },
    [],
  );

  return (
    <ThemeContext.Provider
      value={{ theme, resolvedTheme: theme, themes: ["light"], setTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext) ?? DEFAULT_CONTEXT;
}
