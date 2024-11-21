import { Image } from "./types";

export const addGuest = (guestName: string) => {};

export const updateGuestTags = (guestName: string, updatedTags: string[]) => {};

export const updateTags = (tag: string, weight: number) => {};

export const handleDecision = (guestName: string, decision: "yes" | "no") => {};

export const removeGuest = (guestName: string) => {};

export const handleInvite = (guestName: string) => {};

export const addExpense = (
  category: string,
  subCategory: string,
  amount: number
) => {};

export const removeExpense = (category: string, subCategory: string) => {};

export const updateExpense = (
  category: string,
  subCategory: string,
  newAmount: number
) => {};

export const addTask = (
  category: string,
  task: { name: string; deadline: string; completed: boolean }
) => {};

export const removeTask = (category: string, taskName: string) => {};

export const updateTask = (
  category: string,
  taskName: string,
  updatedTask: { deadline: string }
) => {};

export const handleTaskCompletion = (
  taskName: string,
  category: string,
  completed: boolean
) => {};

export const addChoice = (
  category: string,
  choice: { name: string; amount: number }
) => {};

export const removeChoice = (category: string, choiceName: string) => {};

export const updateChoice = (
  category: string,
  choiceName: string,
  updatedChoice: { amount: number }
) => {};

export const handleChoicePick = (
  choiceName: string,
  category: string,
  picked: boolean
) => {};

export const updateFavoriteStatus = async (
  imageId: number,
  isFavorite: boolean
) => {};

export const updateApprovedStatus = (
  imageId: number,
  isApproved: boolean
) => {};

export const addPhotoToApi = async (photo: Image) => {};

export const loginUser = (email: string, password: string) => {
  if (email === "test@example.com" && password === "password123") {
    return true;
  }
  return false;
};

export const registerUser = async (
  email: string,
  password: string,
  weddingDate: string,
  firstName1: string,
  firstName2: string
): Promise<boolean> => {
  if (email && password && firstName1 && firstName2) {
    return true;
  }
  return false;
};

export const sendResponse = (guestName: string, response: "yes" | "no") => {};
