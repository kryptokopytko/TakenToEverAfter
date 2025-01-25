import { createContext, useContext, ReactNode, useState } from "react";
import { Guest, Account, AccountDetails, WeddingDetails, Language, TaskCard, Tag, Invitation, ExpenseCard, Choice, Image, Couple, Question, Answer } from "../types";
import Example from "../exampleData";

interface UserContextType {
    viewLocation: string;
    language: Language;
    isLogged: boolean;
    weddingDetails: WeddingDetails | null;
    guests: Guest[];
    couples: Couple[];
    tags: Tag[];
    invitations: Invitation[];
    account: Account;
    accountDetails: AccountDetails;
    taskCards: TaskCard[];
    expenseCards: ExpenseCard[];
    choices: Choice[];
    photos: Image[];
    questions: Question[];
    answers: Answer[];
    
    setAccount: (account: Account) => void;
    setAccountDetails: (accountDetails: AccountDetails) => void;
    setIsLogged: (logged: boolean) => void;
    setGuests: (guests: Guest[]) => void;
    setCouples: (couples: Couple[]) => void;
    setTags: (tags: Tag[]) => void;
    setInvitations: (invitations: Invitation[]) => void;
    setWeddingDetails: (weddingDetails: WeddingDetails | null) => void;
    setViewLocation: (location: string) => void;
    setLanguage: (language: Language) => void;
    setTaskCards: (taskCards: TaskCard[]) => void;
    setExpenseCards: (expenseCards: ExpenseCard[]) => void;
    setChoices: (choices: Choice[]) => void;
    setPhotos: (photos: Image[]) => void;
    setQuestions: (questions: Question[]) => void;
    setAnswers: (answers: Answer[]) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [viewLocation, setViewLocation] = useState("Home");
    const [language, setLanguage] = useState<Language>("english");
    const [isLogged, setIsLogged] = useState(false);

    const [account, setAccount] = useState<Account>(Example.account);
    const [accountDetails, setAccountDetails] = useState<AccountDetails>(Example.accountDetails);
    const [guests, setGuests] = useState<Guest[]>(Example.guests);
    const [couples, setCouples] = useState<Couple[]>([]);
    const [weddingDetails, setWeddingDetails] = useState<WeddingDetails | null>(Example.weddingDetails);
    const [taskCards, setTaskCards] = useState<TaskCard[]>(Example.taskCards);
    const [tags, setTags] = useState<Tag[]>(Example.tags);
    const [invitations, setInvitations] = useState<Invitation[]>(Example.invitations);
    const [expenseCards, setExpenseCards] = useState<ExpenseCard[]>(Example.expenses);
    const [choices, setChoices] = useState<Choice[]>(Example.choices);
    const [photos, setPhotos] = useState<Image[]>(Example.images);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<Answer[]>([]);

    return (
        <UserContext.Provider
            value={{
                viewLocation,
                language,
                isLogged,
                weddingDetails,
                guests,
                couples,
                tags,
                invitations,
                account,
                accountDetails,
                taskCards,
                expenseCards,
                choices,
                photos,
                questions,
                answers,

                setWeddingDetails,
                setGuests,
                setCouples,
                setTags,
                setInvitations,
                setAccount,
                setAccountDetails,
                setIsLogged,
                setViewLocation,
                setLanguage,
                setTaskCards,
                setExpenseCards,
                setChoices,
                setPhotos,
                setQuestions,
                setAnswers
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
