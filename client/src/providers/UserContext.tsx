import { createContext, useContext, ReactNode, useState } from "react";
import { weddingGuestList, location, names, surnames, date, time } from '../dummyData';

interface UserContextType {
    bridesName: string;
    groomsName: string;
    bridesSurname: string;
    groomsSurname: string;
    weddingDate: string;
    weddingTime: string;
    isLogged: boolean;
    location: string[];
    guestList: string[][];
    setBridesName: (name: string) => void;
    setGroomsName: (name: string) => void;
    setBridesSurname: (surname: string) => void;
    setGroomsSurname: (surname: string) => void;
    setWeddingDate: (date: string) => void;
    setWeddingTime: (time: string) => void;
    setWeddingLocation: (location: string[]) => void;
    setGuestList: (guests: string[][]) => void;
    names: string[];
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [bridesName, setBridesName] = useState(names[0]);
    const [groomsName, setGroomsName] = useState(names[1]);
    const [bridesSurname, setBridesSurname] = useState(surnames[0]);
    const [groomsSurname, setGroomsSurname] = useState(surnames[1]);
    const [weddingDate, setWeddingDate] = useState(date);
    const [weddingTime, setWeddingTime] = useState(time);
    const [isLogged, setIsLogged] = useState(true);
    const [weddinglocation, setWeddingLocation] = useState(location);
    const [guestList, setGuestList] = useState(
        weddingGuestList,
    );

    return (
        <UserContext.Provider
            value={{
                bridesName,
                groomsName,
                bridesSurname,
                groomsSurname,
                weddingDate,
                weddingTime,
                location,
                guestList,
                setBridesName,
                setGroomsName,
                setBridesSurname,
                setGroomsSurname,
                setWeddingDate,
                setWeddingTime,
                setWeddingLocation,
                setGuestList,
                isLogged,
                names,
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
