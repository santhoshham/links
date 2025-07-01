import { createContext, useContext, ReactNode } from "react";
import { Theme } from "@shared/schema";

export interface ThemeContextType {
  currentTheme: Theme | null;
  availableThemes: Theme[];
  setTheme: (theme: Theme) => void;
  isLoading: boolean;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
