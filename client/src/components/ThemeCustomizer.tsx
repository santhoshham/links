import { useState } from "react";
import { Palette, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { Theme } from "@shared/schema";

export function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentTheme, availableThemes, setTheme, isLoading } = useTheme();

  const getThemeGradient = (theme: Theme) => {
    return {
      background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
    };
  };

  if (isLoading) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300"
        variant="outline"
      >
        <Palette className="text-primary w-5 h-5" />
      </Button>

      {/* Theme Panel */}
      {isOpen && (
        <div className="absolute top-16 right-0 bg-white rounded-2xl shadow-2xl p-6 w-72 transform transition-all duration-300 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text">Customize Theme</h3>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-2">Color Schemes</label>
              <div className="grid grid-cols-3 gap-2">
                {availableThemes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setTheme(theme)}
                    className={`h-12 rounded-lg transition-all duration-200 hover:scale-105 ${
                      currentTheme?.id === theme.id ? "ring-2 ring-primary ring-offset-2" : ""
                    }`}
                    style={getThemeGradient(theme)}
                    title={theme.name}
                  />
                ))}
              </div>
            </div>

            {currentTheme && (
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">Current: <span className="font-medium">{currentTheme.name}</span></p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-10 -z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
