import { Choice } from "../../types";
import api from "./axiosInstance";

export const addExpense = async (
  expenseCard: number,
  name: string,
  price: number,
  notes: string | null = null
) => {
  try {
    const newExpense = {
      expenseCard,
      name,
      amount: price,
      description: notes,
    };

    const response = await api.post("/expenses/expenses/", newExpense, {withCredentials: true});
    console.log("Expense created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding expense:", error);
    throw error;
  }
};

export const addExpenseCategory = async (name: string) => {
  try {
    const response = await api.post(
      "/expenses/expense-cards/",
      { category: name },
      { withCredentials: true }
    );
    console.log("Expense category created:", response.data);
    return response.data.id;
  } catch (error) {
    console.error("Error adding expense category:", error);
    throw error;
  }
};

export const removeExpense = async (id: number) => {
  try {
    const response = await api.delete(`/expenses/expenses/${id}/`, {withCredentials: true});
    console.log(`Expense with ID ${id} removed successfully.`);
    return response.data;
  } catch (error) {
    console.error(`Error removing expense with ID ${id}:`, error);
    throw error;
  }
};

export const updateExpense = async (
  id: number,
  expenseCard: number,
  name: string,
  amount: number,
  notes: string | null = null
) => {
  try {
    const updatedExpense = {
      expenseCard,
      name,
      amount,
      notes,
    };

    const response = await api.patch(`/expenses/expenses/${id}/`, updatedExpense, { withCredentials: true });
    console.log("Expense updated:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error updating expense with ID ${id}:`, error);
    throw error;
  }
};

export const addChoice = async (
  expenseCard: number,
  name: string,
  amount: number,
  description: string,
  pros: string,
  cons: string
) => {
  try {
    const newChoice = {
      expenseCard,
      name,
      amount,
      description,
      pros,
      cons
    };

    const response = await api.post("/expenses/choices/", newChoice, {withCredentials: true});
    console.log("Choice created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding choice:", error);
    throw error;
  }
};

export const addChoiceCategory = async (name: string) => {
  try {
    const response = await api.post(
      "/expenses/choice-cards/",
      { category: name },
      { withCredentials: true }
    );
    console.log("Choice category created:", response.data);
    return response.data.id;
  } catch (error) {
    console.error("Error adding choice category:", error);
    throw error;
  }
};

export const removeChoice = async (id: number) => {
  try {
    const response = await api.delete(`/expenses/choices/${id}/`, {withCredentials: true});
    console.log(`Choice with ID ${id} removed successfully.`);
    return response.data;
  } catch (error) {
    console.error(`Error removing choice with ID ${id}:`, error);
    throw error;
  }
};

export const updateChoice = async (
  id: number,
  expenseCard: number,
  name: string,
  amount: number,
  notes: string | null = null,
  pros: string,
  cons: string
) => {
  try {
    const updatedChoice = {
      expenseCard,
      name,
      amount,
      notes,
      pros,
      cons
    };

    const response = await api.patch(`/expenses/choices/${id}/`, updatedChoice, { withCredentials: true });
    console.log("Choice updated:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error updating choice with ID ${id}:`, error);
    throw error;
  }
};

export const handleChoicePick = (
  choiceId: number,
  categoryId: number,
) => {};

export const transferChoiceToExpense = async (
  choiceId: number,
  choice: Choice,
  expenseCardId: number
) => {
  try {
    await api.delete(`/expenses/choices/${choiceId}/`, {withCredentials: true});
    const response = await api.post("/expenses/expenses/", {...choice, expenseCard: expenseCardId}, {withCredentials: true});
    return response.data;
  } catch (error) {
    console.error(
      `Error transferring potential expense with ID ${choiceId}:`,
      error
    );
    throw error;
  }
};

export const getExpenses = async () => {
  try {
    const expensesResponse = await api.get(`/expenses/expense-cards`, {
      withCredentials: true
    });

    const expenseCards = expensesResponse.data.map((card: any) => {
      return {
        id: card.id,
        category: card.category,
        expenses: card.expenses.map((expense: any) => ({
          id: expense.id,
          name: expense.name,
          amount: expense.amount,
          description: expense.description
        }))
      };
    });

    const choicesResponse = await api.get(`/expenses/choice-cards`, {
      withCredentials: true
    });
    
    const choices = choicesResponse.data.map((choice: any) => {
      return {
        id: choice.id,
        category: choice.category,
        options: choice.options.map((option: any) => ({
          id: option.id,
          name: option.name,
          amount: option.amount,
          description: option.description,
          pros: option.pros,
          cons: option.cons
        }))
      };
    });

    return {
      expenseCards,
      choices
    };
  } catch (error) {
    console.error('Error fetching expenses:', error);
    throw error;
  }
};