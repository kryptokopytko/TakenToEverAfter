import { createContext, useState, ReactNode, useContext } from "react";
import { initialThemes, Theme } from "../themes/theme";


interface Themes {
  [key: string]: Theme; 
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themes, setThemes] = useState<Themes>(initialThemes);
  const [theme, setCurrentTheme] = useState<Theme>(themes.nudeTheme);
  const [customThemeCount, setCustomThemeCount] = useState(0);

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
    <ThemeContext.Provider value={{ theme, setTheme }}>
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
