import { createContext, useContext, ReactNode, useState } from "react";
import { guests, location, pairSurnames, date, time } from '../exampleData';
import { Guest, Account, AccountDetails } from "../types";

interface UserContextType {
    weddingDate: string;
    weddingTime: string;
    weddingLocation: string[];
    viewLocation: string;
    language: string;
    isLogged: boolean;
    guestList: Guest[];
    surnames: string[];
    account: Account | null;
    accountDetails: AccountDetails | null;
    setAccount: (account: Account) => void;
    setAccountDetails: (accountDetails: AccountDetails) => void;
    setIsLogged: (logged: boolean) => void;
    setWeddingDate: (date: string) => void;
    setWeddingTime: (time: string) => void;
    setWeddingLocation: (location: string[]) => void;
    setGuestList: (guests: Guest[]) => void;
    setSurnames: (surnames: string[]) => void;
    setViewLocation: (viewLocation: string) => void;
    setLanguage: (language: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [account, setAccount] = useState<Account | null>(null);
    const [accountDetails, setAccountDetails] = useState<AccountDetails | null>(null);
    const [isLogged, setIsLogged] = useState(false);

    const [surnames, setSurnames] = useState(pairSurnames);
    const [weddingDate, setWeddingDate] = useState(date);
    const [weddingTime, setWeddingTime] = useState(time);
    const [weddingLocation, setWeddingLocation] = useState(location);
    const [guestList, setGuestList] = useState(guests);
    const [viewLocation, setViewLocation] = useState("Home");
    const [language, setLanguage] = useState("english");

    return (
        <UserContext.Provider
            value={{
                weddingDate,
                weddingTime,
                weddingLocation,
                guestList,
                setAccount,
                setAccountDetails,
                setSurnames,
                setWeddingDate,
                setWeddingTime,
                setWeddingLocation,
                setGuestList,
                isLogged,
                setIsLogged,
                account,
                accountDetails,
                surnames,
                viewLocation,
                setViewLocation,
                language,
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
