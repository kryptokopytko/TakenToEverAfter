import { createContext, useContext, ReactNode, useState } from "react";
import { guests, location, pairNames, pairSurnames, date, time } from '../dummyData';
import { Guest } from "../types";

interface UserContextType {
    weddingDate: string;
    weddingTime: string;
    isLogged: boolean;
    guestList: Guest[];
    weddingLocation: string[];
    names: string[];
    surnames: string[];
    setIsLogged: (logged: boolean) => void;
    setWeddingDate: (date: string) => void;
    setWeddingTime: (time: string) => void;
    setWeddingLocation: (location: string[]) => void;
    setGuestList: (guests: Guest[]) => void;
    setNames: (names: string[]) => void;
    setSurnames: (surnames: string[]) => void;
    viewLocation: string;
    setViewLocation: (viewLocation: string) => void;
    language: string;
    setLanguage: (language: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [names, setNames] = useState(pairNames);
    const [surnames, setSurnames] = useState(pairSurnames);
    const [weddingDate, setWeddingDate] = useState(date);
    const [weddingTime, setWeddingTime] = useState(time);
    const [isLogged, setIsLogged] = useState(true);
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
                setNames,
                setSurnames,
                setWeddingDate,
                setWeddingTime,
                setWeddingLocation,
                setGuestList,
                isLogged,
                setIsLogged,
                names,
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
