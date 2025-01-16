import api from "./axiosInstance";

export const addExpense = async (
  expenseCard: number,
  name: string,
  price: number,
  notes: string | null = null
) => {
  try {
    const newExpense = {
      expense_card: expenseCard,
      name,
      amount: price,
      description: notes,
    };

    const response = await api.post("/expenses/add-expense/", newExpense, {withCredentials: true});
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
      "/expenses/add-expense-category/",
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
    const response = await api.delete(`/expenses/expenses/${id}/`);
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
  name: string,
  price: number,
  notes: string | null = null
) => {
  try {
    const updatedExpense = {
      expense_card,
      name,
      price,
      notes,
    };

    const response = await api.patch(`/expenses/expenses/${id}/`, updatedExpense);
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
  choiceId: number,
  categoryId: number,
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

export const getExpenses = async () => {
  try {
    const response = await api.get(`/expenses/user-expenses`, {
      withCredentials: true
    });

    const expenseCards = response.data.expenseCards.map((card: any) => {
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

    const choices = response.data.choices.map((choice: any) => {
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