import { createContext, useContext, ReactNode, useState } from "react";
import { weddingGuestList, location, pairNames, pairSurnames, date, time } from '../dummyData';

interface UserContextType {
    weddingDate: string;
    weddingTime: string;
    isLogged: boolean;
    guestList: string[];
    weddingLocation: string[];
    setIsLogged: (logged: boolean) => void;
    setWeddingDate: (date: string) => void;
    setWeddingTime: (time: string) => void;
    setWeddingLocation: (location: string[]) => void;
    setGuestList: (guests: string[]) => void;
    names: string[];
    surnames: string[];
    setNames: (names: string[]) => void;
    setSurnames: (surnames: string[]) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [names, setNames] = useState(pairNames);
    const [surnames, setSurnames] = useState(pairSurnames);
    const [weddingDate, setWeddingDate] = useState(date);
    const [weddingTime, setWeddingTime] = useState(time);
    const [isLogged, setIsLogged] = useState(true);
    const [weddingLocation, setWeddingLocation] = useState(location);
    const [guestList, setGuestList] = useState(weddingGuestList);

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
