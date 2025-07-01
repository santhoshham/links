import { useState, useEffect, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { ThemeContext } from "@/contexts/ThemeContext";
import { Theme } from "@shared/schema";

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme | null>(null);

  const { data: themes = [], isLoading } = useQuery({
    queryKey: ["/api/themes"],
  });

  useEffect(() => {
    if (themes.length > 0 && !currentTheme) {
      // Load saved theme from localStorage or use default
      const savedThemeId = localStorage.getItem("selectedTheme");
      let selectedTheme;
      
      if (savedThemeId) {
        selectedTheme = themes.find((theme: Theme) => theme.id === parseInt(savedThemeId));
      }
      
      if (!selectedTheme) {
        selectedTheme = themes.find((theme: Theme) => theme.isDefault) || themes[0];
      }
      
      setCurrentTheme(selectedTheme);
    }
  }, [themes, currentTheme]);

  useEffect(() => {
    if (currentTheme) {
      // Apply theme to CSS variables
      const root = document.documentElement;
      root.style.setProperty("--primary", currentTheme.primaryColor);
      root.style.setProperty("--secondary", currentTheme.secondaryColor);
      root.style.setProperty("--background", currentTheme.backgroundColor);
      root.style.setProperty("--text", currentTheme.textColor);
      root.style.setProperty("--card", currentTheme.cardColor);
      
      // Save to localStorage
      localStorage.setItem("selectedTheme", currentTheme.id.toString());
    }
  }, [currentTheme]);

  const setTheme = (theme: Theme) => {
    setCurrentTheme(theme);
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        availableThemes: themes,
        setTheme,
        isLoading,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
