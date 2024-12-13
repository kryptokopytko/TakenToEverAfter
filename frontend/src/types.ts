/*********************************************ACCOUNTS***************************************************/
export interface Account {
  groomName: string;
  brideName: string;
  email: string;
  mailFrequency: 'high' | 'normal' | 'none';
}

export interface AccountDetails {
  weddingDate: string | null; 
  newlywedsTableId: number | null;
  budgetLimit: number | null; 
}

export interface WeddingDetails {
  weddingTime: string;
  weddingLocation: string[];
  surnames: string[];
}

/*********************************************EXPENSES***************************************************/
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

/*********************************************GUESTS*****************************************************/
export type Guest = {
  // id: number;
  name: string;
  decision: Decision;
  tags: number[];
  // invitationId: number;
  hasPlusOne?: boolean;
}

export type Tag = {
  id: number;
  name: string;
  rank: number;
}

export type Invitation = {
  id: number;
  handed_out: boolean;
}

export type Decision = "yes" | "no" | "unknown";
export const decisionTypes = ["yes", "no", "unknown"];

/*********************************************PHOTOS*****************************************************/
export interface Image {
  id: number;
  name?: string;
  link: string;
  isFavorite?: boolean;
  author?: string;
  isVertical?: boolean;
  isApproved?: boolean;
}

/*********************************************PREFERENCES************************************************/
export type Language = 'english' | 'polish';

/*********************************************QUESTIONNAIRE**********************************************/
export interface BooleanQuestion {
  id: number;
  content: string;
}

export interface BooleanAnswer {
  questionId: number;
  guestId: number;
  answer: boolean;
}

export interface StringQuestion {
  id: number;
  content: string;
}

export interface StringAnswer {
  questionId: number;
  guestId: number;
  answer: string;
}

/*********************************************SEATING****************************************************/
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

/*********************************************TASKS******************************************************/
export interface Task {
  id: number;
  name: string;
  completed: boolean;
  deadline: string;
  description: string;
  assignees: string[];
}

export interface TaskCard {
  id: number;
  category: string;
  tasks: Task[];
}