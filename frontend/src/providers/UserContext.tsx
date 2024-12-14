import { createContext, useContext, ReactNode, useState } from "react";
import { Guest, Account, AccountDetails, WeddingDetails, Language, TaskCard, Tag, Invitation } from "../types";
import Example from "../exampleData";

interface UserContextType {
    viewLocation: string;
    language: Language;
    isLogged: boolean;
    weddingDetails: WeddingDetails | null;
    guests: Guest[];
    tags: Tag[];
    invitations: Invitation[];
    account: Account;
    accountDetails: AccountDetails;
    taskCards: TaskCard[];
    
    setAccount: (account: Account) => void;
    setAccountDetails: (accountDetails: AccountDetails) => void;
    setIsLogged: (logged: boolean) => void;
    setGuests: (guests: Guest[]) => void;
    setTags: (tags: Tag[]) => void;
    setInvitations: (invitations: Invitation[]) => void;
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
    const [guests, setGuests] = useState<Guest[]>(Example.guests);
    const [weddingDetails, setWeddingDetails] = useState<WeddingDetails | null>(Example.weddingDetails);
    const [taskCards, setTaskCards] = useState<TaskCard[]>(Example.taskCards);
    const [tags, setTags] = useState<Tag[]>(Example.tags);
    const [invitations, setInvitations] = useState<Invitation[]>(Example.invitations);

    return (
        <UserContext.Provider
            value={{
                viewLocation,
                language,
                isLogged,
                weddingDetails,
                guests,
                tags,
                invitations,
                account,
                accountDetails,
                taskCards,
                setWeddingDetails,
                setGuests,
                setTags,
                setInvitations,
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
