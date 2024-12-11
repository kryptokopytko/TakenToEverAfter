import { createContext, useContext, ReactNode, useState } from "react";
import { Guest, Account, AccountDetails, WeddingDetails } from "../types";
import Example from "../exampleData";

interface UserContextType {
    viewLocation: string;
    language: string;
    isLogged: boolean;
    weddingDetails: WeddingDetails;
    guestList: Guest[];
    account: Account;
    accountDetails: AccountDetails;
    
    setAccount: (account: Account) => void;
    setAccountDetails: (accountDetails: AccountDetails) => void;
    setIsLogged: (logged: boolean) => void;
    setGuestList: (guests: Guest[]) => void;
    setWeddingDetails: (weddingDetails: WeddingDetails) => void;
    setViewLocation: (location: string) => void;
    setLanguage: (language: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [viewLocation, setViewLocation] = useState("Home");
    const [language, setLanguage] = useState("english");
    const [isLogged, setIsLogged] = useState(false);

    const [account, setAccount] = useState<Account>(Example.account);
    const [accountDetails, setAccountDetails] = useState<AccountDetails>(Example.accountDetails);
    const [guestList, setGuestList] = useState<Guest[]>([]);
    const [weddingDetails, setWeddingDetails] = useState<WeddingDetails>(Example.weddingDetails);

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
                setWeddingDetails,
                setGuestList,
                setAccount,
                setAccountDetails,
                setIsLogged,
                setViewLocation,
                setLanguage
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
