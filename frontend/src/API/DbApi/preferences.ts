import api from "./axiosInstance";

export const getUserPreferences = async () => {
  try {
    const response = await api.get("/preferences/user-themes-and-preferences/", { withCredentials: true });
    return {
      preferences: response.data.preferences,
      themes: response.data.themes,
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
    const response = await api.delete(`/preferences/color-themes/${themeKey}/`, { withCredentials: true });

    return {
      preferences: response.data.preferences,
      themes: response.data.themes,
    };
  } catch (error) {
    console.error("There was an error deleting the theme:", error);
    throw error;
  }
}