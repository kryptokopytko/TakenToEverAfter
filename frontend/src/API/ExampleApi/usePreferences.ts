
import { useTheme } from "../../providers/ThemeContext";
import { Theme } from "../../types";

export const usePreferences = () => {
    const { themes, setThemes } = useTheme();
  
    const addNewTheme = (newName: string, themeData: Theme) => {
        const newThemesCopy = { ...themes };
        newThemesCopy[newName] = themeData;
        setThemes(newThemesCopy);
    };

    const deleteTheme = (themeKey: string) => {
        const newThemesCopy = { ...themes };
        delete newThemesCopy[themeKey];
        setThemes(newThemesCopy);
    }

    return {
        addNewTheme,
        deleteTheme
      };
}