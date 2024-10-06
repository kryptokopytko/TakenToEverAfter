export const addGuest = (guestName: string) => {};

export const updateGuestTags = (guestName: string, updatedTags: string[]) => {};

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

