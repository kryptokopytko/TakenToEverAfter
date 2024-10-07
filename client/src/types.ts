export type Decision = "yes" | "maybe" | "no" | "not invited";

export interface Guest {
  name: string;
  decision: Decision;
  tags: string[];
  email?: string;
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

export interface SubTask {
  name: string;
  completed: boolean;
  deadline: string;
}

export interface Task {
  category: string;
  subTasks: SubTask[];
}

export type Option = {
  option: string;
  amount: number;
  isPicked: boolean;
};

export type Choice = {
  choice: string;
  options: Option[];
};

export interface Image {
  name?: string;
  link: string;
  isFavorite?: boolean;
  author?: string;
  isVertical?: boolean;
  isApproved?: boolean;
  id: number;
}
