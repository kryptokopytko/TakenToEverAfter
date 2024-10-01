import { createContext, useState, useEffect, ReactNode, useContext } from "react";
import { initialThemes, Theme } from "../styles/theme";

interface Themes {
  [key: string]: Theme;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themes: Themes;
  fontSize: number;
  setFontSize: (size: number) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themes, setThemes] = useState<Themes>(initialThemes);
  const [theme, setCurrentTheme] = useState<Theme>(themes.nude);
  const [customThemeCount, setCustomThemeCount] = useState(0);
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {

    const calculateFontSize = () => {
      const screenWidth = window.innerWidth;

      const newFontSize = Math.max(10, Math.min(20, screenWidth / 80));
      setFontSize(newFontSize);
    };


    calculateFontSize();


    window.addEventListener('resize', calculateFontSize);


    return () => {
      window.removeEventListener('resize', calculateFontSize);
    };
  }, []);

  const setTheme = (newTheme: Theme) => {
    const themeKeys = Object.keys(themes);
    const isThemeExisting = themeKeys.some(key => {
      return JSON.stringify(themes[key]) === JSON.stringify(newTheme);
    });

    if (!isThemeExisting) {
      const customThemeKey = `custom${customThemeCount + 1}`;
      setThemes(prevThemes => ({
        ...prevThemes,
        [customThemeKey]: newTheme,
      }));
      setCustomThemeCount(prevCount => prevCount + 1);
      setCurrentTheme(newTheme);
      console.log("Custom theme added:", customThemeKey, newTheme);
    } else {
      setCurrentTheme(newTheme);
      console.log("Theme updated:", newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes, fontSize, setFontSize }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
