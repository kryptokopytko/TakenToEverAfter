import { Image } from "./types";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api", // "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const account_id = 2;

/*********************************************ACCOUNTS**********************************************/

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

export const registerAccount = async (
  groomName: string,
  brideName: string,
  email: string,
  weddingDate: string
) => {
  try {
    const accountResponse = await api.post("/accounts/", {
      groom_name: groomName,
      bride_name: brideName,
      email: email,
      mail_frequency: "normal",
    });

    const accountId = accountResponse.data.id;
    console.log("Account created:", accountResponse.data);

    const detailsResponse = await api.post("/account-details/", {
      account: accountId,
      wedding_date: weddingDate,
      newlyweds_table_id: null,
      budget_limit: null,
    });

    console.log("AccountDetails created:", detailsResponse.data);

    return {
      account: accountResponse.data,
      details: detailsResponse.data,
    };
  } catch (error) {
    console.error("Error during account registration:", error);
    throw error;
  }
};

/*********************************************EXPENSES**********************************************/

export const addExpense = (
  category: string,
  subCategory: string,
  amount: number,
  description: string
) => {};

export const addExpense2 = async (
  account: number,
  expense_card: number,
  price: number,
  notes: string | null = null
) => {
  try {
    const newExpense = {
      account,
      expense_card,
      price,
      notes,
    };

    const response = await api.post("/expenses/", newExpense);
    console.log("Expense created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding expense:", error);
    throw error;
  }
};

export const removeExpense = (category: string, subCategory: string) => {};
export const removeExpense2 = async (id: number) => {
  try {
    const response = await api.delete(`/expenses/${id}/`);
    console.log(`Expense with ID ${id} removed successfully.`);
    return response.data;
  } catch (error) {
    console.error(`Error removing expense with ID ${id}:`, error);
    throw error;
  }
};

export const updateExpense = (
  category: string,
  subCategory: string,
  newAmount: number,
  description: string
) => {};

export const updateExpense2 = async (
  id: number,
  expense_card: number,
  price: number,
  notes: string | null = null
) => {
  try {
    const updatedExpense = {
      expense_card,
      price,
      notes,
    };

    const response = await api.patch(`/expenses/${id}/`, updatedExpense);
    console.log("Expense updated:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error updating expense with ID ${id}:`, error);
    throw error;
  }
};

export const removeChoice = (category: string, choiceName: string) => {};

export const updateChoice = (
  category: string,
  choiceName: string,
  updatedChoice: { amount: number; description: string }
) => {};

export const handleChoicePick = (
  choiceName: string,
  category: string,
  picked: boolean
) => {};

export const addChoice = (
  category: string,
  choice: { name: string; amount: number; description: string }
) => {};

export const transferPotentialExpenseToExpense = async (
  potentialExpenseId: number,
  price: number,
  expenseCardId: number
) => {
  try {
    const potentialExpenseResponse = await api.get(
      `/potential-expenses/${potentialExpenseId}/`
    );
    const potentialExpense = potentialExpenseResponse.data;

    const newExpense = {
      account: potentialExpense.account,
      expense_card: expenseCardId,
      price: price,
      notes: potentialExpense.notes,
    };
    const response = await api.post(`/expenses/`, newExpense);
    await api.delete(`/potential-expenses/${potentialExpenseId}/`);
    console.log("Potential expense transferred to expense:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      `Error transferring potential expense with ID ${potentialExpenseId}:`,
      error
    );
    throw error;
  }
};
/*********************************************GUESTS**********************************************/

export const getGuests = async () => {
  try {
    const response = await api.get("/guests/");
    console.log("List of guests downloaded successfully.");
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the guests:", error);
  }
};

// email ignorowany
export const addGuest = async (guestName: string) => {
  const newGuest = {
    account: account_id,
    name: guestName,
    group_numbers: [],
    invitation: null,
    confirmation: "unknown",
    plus_one: false,
  };

  api
    .post("/guests/", newGuest)
    .then((response) => {
      console.log("New guest created:", response.data);
    })
    .catch((error) => {
      console.error("There was an error creating the guest:", error);
    });
};

export const removeGuest = (guestName: string) => {};
export const removeGuest2 = async (id: Number) => {
  try {
    const response = await api.delete(`/guests/${id}/`);
    console.log(`Guest with ID ${id} has been removed.`);
    return response.data;
  } catch (error) {
    console.error("There was an error removing the guest:", error);
  }
};

export const updateGuestTags = async (
  guestName: string,
  email: string,
  updatedTags: string[]
) => {};

export const updateGuestGroups = async (
  guestId: number,
  updatedGroupsId: number[]
) => {
  try {
    const guestResponse = await api.get(`/guests/${guestId}/`);
    const guest = guestResponse.data;

    const updatedGuestData = {
      ...guest,
      group_numbers: updatedGroupsId,
    };

    const response = await api.patch(`/guests/${guestId}/`, updatedGuestData);
    console.log("Guest updated:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      `Error updating guest groups for guest ID ${guestId}:`,
      error
    );
    throw error;
  }
};

export const updateTags = (tag: string, weight: number) => {};
export const updateGroupRank = async (groupId: number, newRank: number) => {
  try {
    const groupResponse = await api.get(`/groups/${groupId}/`);
    const group = groupResponse.data;

    const updatedGroupData = {
      ...group,
      rank: newRank,
    };

    const response = await api.patch(`/groups/${groupId}/`, updatedGroupData);
    console.log("Group rank updated:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error updating rank for group ID ${groupId}:`, error);
    throw error;
  }
};

export const updateGuestConfirmation = async (
  guestId: number,
  confirmation: boolean
) => {
  try {
    const guestResponse = await api.get(`/guests/${guestId}/`);
    const guest = guestResponse.data;

    const updatedGuestData = {
      ...guest,
      confirmation: confirmation ? "yes" : "no",
    };
    const response = await api.patch(`/guests/${guestId}/`, updatedGuestData);
    console.log("Guest confirmation updated:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      `Error updating confirmation for guest ID ${guestId}:`,
      error
    );
    throw error;
  }
};

export const handleInvite = (guestName: string) => {};
export const handOutInvitation = async (invitationId: number) => {
  try {
    const invitationResponse = await api.get(`/invitations/${invitationId}/`);
    const invitation = invitationResponse.data;

    const updatedInvitationData = {
      ...invitation,
      handed_out: true,
    };

    const response = await api.patch(
      `/invitations/${invitationId}/`,
      updatedInvitationData
    );
    console.log("Invitation handed out:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error handing out invitation ID ${invitationId}:`, error);
    throw error;
  }
};

export const handleDecision = (guestName: string, decision: "yes" | "no") => {};

/*********************************************PHOTOS**********************************************/

export const updateFavoriteStatus = async (
  imageId: number,
  isFavorite: boolean
) => {};
export const updateApprovedStatus = (
  imageId: number,
  isApproved: boolean
) => {};
export const addPhotoToApi = async (photo: Image) => {};

export const addPhoto = async (
  accountId: number,
  link: string,
  description: string | null = null,
  uploader: string | null = null
) => {
  try {
    const newPhoto = {
      account: accountId,
      link,
      description,
      uploader,
    };

    const response = await api.post("/to_accept_photos/", newPhoto);
    console.log("New photo added:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding photo:", error);
    throw error;
  }
};

export const removePhoto = async (photoId: number) => {
  try {
    const response = await api.delete(`/accepted_photos/${photoId}/`);
    console.log(`Photo with ID ${photoId} has been deleted.`);
    return response.data;
  } catch (error) {
    console.error("Error removing photo:", error);
    throw error;
  }
};

export const discardPhoto = async (photoId: number) => {
  try {
    const response = await api.delete(`/to_accept_photos/${photoId}/`);
    console.log(`Photo with ID ${photoId} has been discarded.`);
    return response.data;
  } catch (error) {
    console.error("Error discarding photo:", error);
    throw error;
  }
};

export const acceptPhoto = async (photoId: number) => {
  try {
    const toAcceptResponse = await api.get(`/to_accept_photos/${photoId}/`);
    const photoData = toAcceptResponse.data;
    await api.delete(`/to_accept_photos/${photoId}/`);

    const acceptedPhotoData = {
      account: photoData.account,
      link: photoData.link,
      description: photoData.description,
      favourite: false,
      uploader: photoData.uploader,
    };

    const acceptedPhotoResponse = await api.post(
      "/accepted_photos/",
      acceptedPhotoData
    );
    console.log(
      "Photo has been accepted and moved to the Accepted collection:",
      acceptedPhotoResponse.data
    );
    return acceptedPhotoResponse.data;
  } catch (error) {
    console.error("Error accepting photo:", error);
    throw error;
  }
};

export const updateFavourite = async (
  photoId: number,
  isFavourite: boolean
) => {
  try {
    const photoResponse = await api.get(`/accepted_photos/${photoId}/`);
    const photo = photoResponse.data;

    const updatedPhotoData = {
      ...photo,
      favourite: isFavourite,
    };

    const response = await api.patch(
      `/accepted_photos/${photoId}/`,
      updatedPhotoData
    );
    console.log("Updated photo favourite status:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating photo favourite status:", error);
    throw error;
  }
};

/*********************************************PREFERENCES************************************************/
/*********************************************QUESTIONNAIRE**********************************************/

export const sendResponse = (guestName: string, response: "yes" | "no") => {};

/*********************************************SEATING****************************************************/
/*********************************************TASKS******************************************************/

export const addTask = (
  category: string,
  task: {
    name: string;
    deadline: string;
    completed: boolean;
    description: string;
  }
) => {};
export const removeTask = (category: string, taskName: string) => {};
export const updateTask = (
  category: string,
  taskName: string,
  updatedTask: { deadline: string; description: string }
) => {};
export const handleTaskCompletion = (
  taskName: string,
  category: string,
  completed: boolean
) => {};

export const addCategory = async (accountId: number, categoryName: string) => {
  try {
    const newCategory = {
      account: accountId,
      name: categoryName,
    };
    const response = await api.post("/todo_list_categories/", newCategory);
    console.log("New category created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const addTask2 = async (
  account: number,
  category: number,
  name: string,
  description: string | null = null,
  deadline: string | null = null
) => {
  try {
    const newTask = {
      account,
      category,
      name,
      description,
      deadline,
    };

    const response = await api.post("/tasks/", newTask);
    console.log("Task created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

export const removeTask2 = async (id: number) => {
  try {
    const response = await api.delete(`/tasks/${id}/`);

    console.log(`Task with ID ${id} removed successfully.`);
    return response.data;
  } catch (error) {
    console.error(`Error removing task with ID ${id}:`, error);
    throw error;
  }
};

export const updateTaskCompletion = async (
  taskId: number,
  isCompleted: boolean
) => {
  try {
    const updatedTaskData = {
      completed: isCompleted,
    };
    const response = await api.put(`/tasks/${taskId}/`, updatedTaskData);
    console.log("Task completion status updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating task completion status:", error);
    throw error;
  }
};

export const addAssignee = async (accountId: number, assigneeName: string) => {
  try {
    const newAssignee = {
      account: accountId,
      name: assigneeName,
    };
    const response = await api.post("/task_assignees/", newAssignee);
    console.log("New assignee created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating assignee:", error);
    throw error;
  }
};

export const assignTask = async (
  taskId: number,
  assigneeId: number,
  accountId: number
) => {
  try {
    const newAssignment = {
      account: accountId,
      assignee: assigneeId,
      task: taskId,
    };
    const response = await api.post("/task_assignments/", newAssignment);
    console.log("Task assigned:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error assigning task:", error);
    throw error;
  }
};
