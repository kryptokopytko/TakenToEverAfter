import { createContext, useContext, ReactNode, useState } from "react";
import { Guest, Account, AccountDetails, WeddingDetails, Language, TaskCard } from "../types";
import Example from "../exampleData";

interface UserContextType {
    viewLocation: string;
    language: Language;
    isLogged: boolean;
    weddingDetails: WeddingDetails | null;
    guestList: Guest[];
    account: Account;
    accountDetails: AccountDetails;
    taskCards: TaskCard[];
    
    setAccount: (account: Account) => void;
    setAccountDetails: (accountDetails: AccountDetails) => void;
    setIsLogged: (logged: boolean) => void;
    setGuestList: (guests: Guest[]) => void;
    setWeddingDetails: (weddingDetails: WeddingDetails | null) => void;
    setViewLocation: (location: string) => void;
    setLanguage: (language: Language) => void;
    setTaskCards: (taskCards: TaskCard[]) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [viewLocation, setViewLocation] = useState("Home");
    const [language, setLanguage] = useState<Language>("english");
    const [isLogged, setIsLogged] = useState(false);

    const [account, setAccount] = useState<Account>(Example.account);
    const [accountDetails, setAccountDetails] = useState<AccountDetails>(Example.accountDetails);
    const [guestList, setGuestList] = useState<Guest[]>([]);
    const [weddingDetails, setWeddingDetails] = useState<WeddingDetails | null>(Example.weddingDetails);
    const [taskCards, setTaskCards] = useState<TaskCard[]>(Example.taskCards);

    return (
        <UserContext.Provider
            value={{
                viewLocation,
                language,
                isLogged,
                weddingDetails,
                guestList,
                account,
                accountDetails,
                taskCards,
                setWeddingDetails,
                setGuestList,
                setAccount,
                setAccountDetails,
                setIsLogged,
                setViewLocation,
                setLanguage,
                setTaskCards
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
