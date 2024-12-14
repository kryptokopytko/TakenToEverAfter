import axios from "axios";
import { TaskCard, Task, Guest, Tag, Invitation } from "./types";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/*********************************************ACCOUNTS***************************************************/

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
  weddingDate: string
) => {
  var accountId = undefined;

  try {
    const accountResponse = await api.post("/accounts/accounts/", {
      groom_name: groomName,
      bride_name: brideName,
      email: email,
      mail_frequency: "normal",
    });

    accountId = accountResponse.data.id;
    console.log("Account created:", accountResponse.data);

    const detailsResponse = await api.post("/accounts/account-details/", {
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

/*********************************************EXPENSES***************************************************/
export const addExpense = async (
  account: number,
  expenseCard: number,
  price: number,
  notes: string | null = null
) => {
  try {
    const newExpense = {
      account,
      expenseCard,
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

export const removeExpense = async (id: number) => {
  try {
    const response = await api.delete(`/expenses/${id}/`);
    console.log(`Expense with ID ${id} removed successfully.`);
    return response.data;
  } catch (error) {
    console.error(`Error removing expense with ID ${id}:`, error);
    throw error;
  }
};

export const updateExpense = async (
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
/*********************************************GUESTS*****************************************************/

export const getGuests = async () => {
  try {
    const response = await api.get("/guests/");
    console.log("List of guests downloaded successfully.");
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the guests:", error);
  }
};

export const getGuestsInfo = async () => {
  try {
    const [guestsResponse, tagsResponse, invitationsResponse] = await Promise.all([
      api.get("/guests/user-guests/",  { withCredentials: true }),
      api.get("/guests/user-tags/",  { withCredentials: true }),
      api.get("/guests/user-invitations/",  { withCredentials: true })
    ]);

    const guests: Guest[] = guestsResponse.data.guests.map((guest: any) => ({
      id: guest.id,
      name: guest.name,
      decision: guest.confirmation,
      tags: guest.group_numbers,
      invitationId: guest.invitation?.id || null,
      hasPlusOne: guest.plus_one
    }));

    const tags: Tag[] = tagsResponse.data.tags.map((tag: any) => ({
      id: tag.id,
      name: tag.name,
      rank: tag.rank
    }));

    const invitations: Invitation[] = invitationsResponse.data.invitations.map((invitation: any) => ({
      id: invitation.id,
      handedOut: invitation.handed_out
    }));

    return {
      guests,
      tags,
      invitations
    };
  } catch (error) {
    console.error("Error fetching guests information:", error);
    throw error;
  }
};

export const addGuest = async (guestName: string, account_id: number) => {
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

// export const removeGuest = (guestName: string) => {};
export const removeGuest = async (id: Number) => {
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

export const updateTags = (
  tag: string,
  weight: number,
  oneInvite: boolean
) => {};

export const getAllSharedInviteNames = () => {
  return ["family"];
};

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

export const handleDecision = (guestId: number, decision: "yes" | "no") => {
  
};

/*********************************************PHOTOS*****************************************************/

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
export const updateTask = async (
  taskId: number,
  categoryId: number | null,
  categoryName: string,
  name: string,
  description: string | null = null,
  deadline: string | null = null
) => {
  try {
    if (!categoryId) {
      const newCategory = await addCategory(categoryName);
      categoryId = newCategory.id;
    }

    const updatedTask = {
      category: categoryId,
      name: name,
      description: description,
      deadline: deadline,
    };
    const response = await api.patch(`/tasks/tasks/${taskId}/`, updatedTask, 
      { withCredentials: true }
    );
    console.log("Task updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const addCategory = async (categoryName: string) => {
  try {
    const response = await api.post("/todo_list_categories/", categoryName);
    console.log("New category created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const addTask = async (
  categoryId: number | null,
  categoryName: string,
  name: string,
  description: string,
  deadline: string | null = null
) => {
  try {
    if (!categoryId) {
      const newCategory = await addCategory(categoryName);
      categoryId = newCategory.id;
    }

    const newTask = {
      categoryId,
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

export const removeTask = async (id: number) => {
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
    const response = await api.patch(`/tasks/${taskId}/`, isCompleted);
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

export const getTasks = async () => {
  try {
    const response = await api.get(`/tasks/user-tasks`, 
      { withCredentials: true }
    );
    const taskCards = response.data.taskCards.map((card: TaskCard): TaskCard => {
      return {
        id: card.id,
        category: card.category,
        tasks: card.tasks.map((task: Task): Task => ({
          id: task.id,
          name: task.name,
          completed: task.completed,
          deadline: task.deadline,
          description: task.description, 
          assignees: task.assignees
        })),
  }});
    return taskCards; 
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error; 
  }
}
