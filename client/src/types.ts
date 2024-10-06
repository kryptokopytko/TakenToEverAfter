export type Decision = "yes" | "maybe" | "no" | "not invited";

export interface Guest {
  name: string;
  decision: Decision;
  tags: string[];
}

export const decisionTypes = ["yes", "maybe", "no", "not invited"];

export interface SubExpense {
  subCategory: string;
  amount: number;
}

export interface Expense {
  category: string;
  subExpenses: SubExpense[];
}

export type Expenses = Expense[];
