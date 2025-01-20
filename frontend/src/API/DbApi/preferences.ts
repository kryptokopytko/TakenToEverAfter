import api from "./axiosInstance";
import { Theme, Themes } from "../../types";

export const getUserPreferences = async () => {
  try {
    const response = await api.get("/preferences/user-themes-and-preferences/", { withCredentials: true });
    const themes: Themes = response.data.themes.reduce((acc: Themes, theme: any) => {
      acc[theme.name] = {
        primary: theme.primary,
        light: theme.light,
        secondary: theme.secondary,
        tertiary: theme.tertiary,
        dark: theme.dark,
        body: theme.body,
        hue: theme.hue,
        saturation: theme.saturation,
        lightness: theme.lightness,
      };
      return acc;
    }, {});

    return {
      preferences: response.data.preferences,
      themes: themes,
    };
  } catch (error) {
    console.error("There was an error fetching the user preferences and themes:", error);
    throw error;
  }
};

export const addNewTheme = async (newName: string, themeData: Theme) => {
  try {
    await api.post("/preferences/color-themes/", {
      name: newName,
      primary: themeData.primary,
      secondary: themeData.secondary,
      tertiary: themeData.tertiary,
      light: themeData.light,
      dark: themeData.dark,
      body: themeData.body,
      hue: themeData.hue,
      saturation: themeData.saturation,
      lightness: themeData.lightness,
    }, { withCredentials: true });

  } catch (error) {
    console.error("There was an error adding the new theme:", error);
    throw error;
  }
};

export const deleteTheme = async (themeKey: string) => {
  try {
    await api.delete(`/preferences/delete-theme/${themeKey}/`, { withCredentials: true });
  } catch (error) {
    console.error("There was an error deleting the theme:", error);
    throw error;
  }
}

export const pickTheme = async (themeKey: string) => {
  try {
    const response = await api.post(
      `/preferences/pick-theme/${themeKey}/`,
      {},
      { withCredentials: true }
    );

    return response.data.preferences;
  } catch (error) {
    console.error("There was an error picking the theme:", error);
    throw error;
  }
};

export const changeFontSize = async (newFontSize: number) => {
  try {
    await api.post(
      '/preferences/change-font-size/', 
      { fontSize: newFontSize }, 
      { withCredentials: true }
    );
  } catch (error) {
    console.error("There was an error changing the font size:", error);
    throw error;
  }
};
