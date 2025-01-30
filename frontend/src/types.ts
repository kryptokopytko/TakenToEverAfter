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
  photoAlbumUrl: string;
  invitationMainText: string | null;
  invitationAdditionalText: string | null;
  invitationGuestText: string | null;
}

export interface WeddingDetails {
  weddingTime: string;
  weddingLocation: string[];
  groomSurname: string;
  brideSurname: string;
}

/*********************************************EXPENSES***************************************************/
export interface Expense {
  id: number;
  name: string;
  amount: number;
  description: string;
}

export interface ExpenseCard {
  id: number;
  category: string;
  expenses: Expense[];
}

export interface Option extends Expense {
  pros?: string;
  cons?: string;
};

export interface Choice {
  id: number;
  category: string;
  options: Option[];
};

/*********************************************GUESTS*****************************************************/
export interface Guest {
  id: number;
  name: string;
  decision: Decision;
  tags: number[];
  invitationId: number;
  hasPlusOne: boolean;
}

export interface Couple {
  id: number;
  guest1: number;
  guest2: number;
}

export interface Tag {
  id: number;
  name: string;
  rank: number;
}

export interface Invitation {
  id: number;
  handedOut: boolean;
  confirmationUrl: string;
}

export interface InvitationDetails {
  brideName: string,
  groomName: string,
  weddingDate: string,
  mainText: string | null,
  additionalText: string | null,
  guestText: string | null,
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

export interface Theme {
  primary: string;
  light: string;
  secondary: string;
  tertiary: string;
  dark: string;
  body: string;
  hue: number;
  saturation: number;
  lightness: number;
}

export interface Themes {
  [key: string]: Theme;
}

/*********************************************QUESTIONNAIRE**********************************************/
export type QuestionType = "choice" | "yes/no";

export interface RawQuestion { 
  text: string; 
  type: QuestionType; 
  options?: string[] 
}

export interface Question extends RawQuestion { 
  id: number,
}

export interface Answer {
  questionId: number;
  guestId: number;
  answer: string;
}

/*********************************************SEATING****************************************************/
export interface Table {
  id: number;
  name: string;
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
  deadline: string | null;
  description: string;
  assignees: string[];
}

export interface TaskCard {
  id: number;
  category: string;
  tasks: Task[];
}

/****************************************************************************************************************/
export interface GuestPageProps {
  names: {groom: string, bride: string},
  date: string | null
}