export type Decision = "yes" | "maybe" | "no" | "not invited";

export interface Guest {
  name: string;
  decision: Decision;
  tags: string[];
}

export const decisionTypes = ["yes", "maybe", "no", "not invited"];

export interface Table {
  id: string;
  x: number;
  y: number;
  guests: string[];
}

export interface RoundTable extends Table {
  seats: number;
}
export interface RectangularTable extends Table {
  width: number;
  length: number;
}

export interface SubExpense {
  subCategory: string;
  amount: number;
  description: string;
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
  description: string;
}

export interface Task {
  category: string;
  subTasks: SubTask[];
}

export type Option = {
  option: string;
  amount: number;
  isPicked: boolean;
  description: string;
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