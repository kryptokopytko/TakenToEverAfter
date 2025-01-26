import api from "./axiosInstance";
import { initialFontSize } from "../../styles/theme";
import { AccountDetails } from "../../types";

export const getUserByEmail = async (email: string) => {
  try {
    const responseData = await api.get("/accounts/get-user-by-email/", {
      params: { email },
    });
    return responseData.data;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw error;
  }
};

export const isRegistrated = async (email: string) => {
  try {
    const responseData = await api.get("/accounts/check-user-exists/", {
      params: { email },
    });
    return responseData.data.exists;
  } catch (error) {
    console.error("Error during user check:", error);
    throw error;
  }
};

export const registerUser = async (
  groomName: string,
  brideName: string,
  email: string,
  weddingDate: string,
  language: string,
) => {
  var accountId = undefined;

  try {
    const accountResponse = await api.post("/accounts/accounts/", {
      groomName: groomName,
      brideName: brideName,
      email: email,
      mailFrequency: "normal",
    });

    accountId = accountResponse.data.id;

    const detailsResponse = await api.post("/accounts/account-details/", {
      account: accountId,
      weddingDate: weddingDate,
      newlywedsTableId: null,
      budgetLimit: null,
    });

    await login(email);

    const viewPreferencesResponse = await api.post("/preferences/view-preferences/", {
      account: accountId,
      language: language, 
      colorTheme: null,
      fontSize: initialFontSize,
    }, { withCredentials: true } );

    return {
      account: accountResponse.data,
      details: detailsResponse.data,
      viewPreferences: viewPreferencesResponse.data,
    };
  } catch (error) {
    if (accountId) {
      await api.delete(`/accounts/accounts/${accountId}/`);
      console.log("Account deleted (rollback).");
    }
    console.error("Error during registration:", error);
    throw error;
  }
};

export const login = async (mail: string) => {
  try {
    const response = await api.post(
      "/login/",
      { mail: mail },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await api.get(
      "/logout/",
      { withCredentials: true }
    );
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};

export const checkSession = async () => {
  try {
    const response = await api.get("/check-session/", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error during checking session:", error);
    throw error;
  }
};

export const updateAccountDetails = async (
  updatedAccountDetails: AccountDetails
) => {
  try {
    const response = await api.post(`/accounts/update-account-details/`, updatedAccountDetails, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("There was an error updating the account details:", error);
    return null;
  }
};