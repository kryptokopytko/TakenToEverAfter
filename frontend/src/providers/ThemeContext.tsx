import { createContext, useState, useLayoutEffect, ReactNode, useContext } from "react";
import { initialFontSize, initialThemes } from "../styles/theme";
import { Theme, Themes } from "../types";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themes: Themes;
  fontSize: number;
  setFontSize: (size: number) => void;
  setThemes: (themes: Themes) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const debounce = (func: () => void, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func, delay);
  };
};


export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themes, setThemes] = useState<Themes>(initialThemes);
  const [theme, setCurrentTheme] = useState<Theme>(themes.nude);
  const [customThemeCount, setCustomThemeCount] = useState(0);
  const [fontSize, setFontSize] = useState(initialFontSize);

  const calculateFontSize = () => {
    const screenWidth = window.innerWidth;
    const newFontSize = Math.max(10, Math.min(18, (screenWidth - 400) / 35));
    setFontSize(newFontSize);
  };


  useLayoutEffect(() => {
    const debouncedResizeHandler = debounce(calculateFontSize, 150);
    calculateFontSize();
    window.addEventListener("resize", debouncedResizeHandler);
    return () => {
      window.removeEventListener("resize", debouncedResizeHandler);
    };
  }, []);

  const setTheme = (newTheme: Theme) => {
    const themeKeys = Object.keys(themes);
    const isThemeExisting = themeKeys.some(
      (key) => JSON.stringify(themes[key]) === JSON.stringify(newTheme)
    );

    if (!isThemeExisting) {
      const customThemeKey = `custom${customThemeCount + 1}`;
      setThemes((prevThemes) => ({
        ...prevThemes,
        [customThemeKey]: newTheme,
      }));
      setCustomThemeCount((prevCount) => prevCount + 1);
      setCurrentTheme(newTheme);
      console.log("Custom theme added:", customThemeKey, newTheme);
    } else {
      setCurrentTheme(newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes, setThemes, fontSize, setFontSize }}>
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
