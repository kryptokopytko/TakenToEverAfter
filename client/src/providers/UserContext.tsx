import { createContext, useContext, ReactNode, useState } from "react";
import { weddingGuestList, location, pairNames, pairSurnames, date, time } from '../dummyData';
import { RoundTable, RectangularTable } from '../types';

interface UserContextType {
    weddingDate: string;
    weddingTime: string;
    isLogged: boolean;
    guestList: string[];
    weddingLocation: string[];
    roomDimensions: number[];
    roundTables: RoundTable[];
    rectangularTables: RectangularTable[];
    updateRoomDimensions: (x: string, y: string) => void;
    addRoundTable: (table: RoundTable) => void;
    addRectangularTable: (table: RectangularTable) => void;
    setIsLogged: (logged: boolean) => void;
    setWeddingDate: (date: string) => void;
    setWeddingTime: (time: string) => void;
    setWeddingLocation: (location: string[]) => void;
    setGuestList: (guests: string[]) => void;
    names: string[];
    surnames: string[];
    setNames: (names: string[]) => void;
    setSurnames: (surnames: string[]) => void;
    viewLocation: string;
    setViewLocation: (viewLocation: string) => void;
    updateTablePosition: (id: string, x: number, y: number) => void;
    handleUpdateTablePosition: (id: string, x: number, y: number) => void;
    setRoundTables: (tables: RoundTable[]) => void;
    setRectangularTables: (tables: RectangularTable[]) => void;
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
    const [viewLocation, setViewLocation] = useState("Home");


    const [roomDimensions, setRoomDimensions] = useState([12, 12]);
    const [roundTables, setRoundTables] = useState<RoundTable[]>([]);
    const [rectangularTables, setRectangularTables] = useState<RectangularTable[]>([]);



    const addRoundTable = (table: RoundTable) => {
        setRoundTables((prev) => [...prev, table]);
    };

    const addRectangularTable = (table: RectangularTable) => {
        setRectangularTables((prev) => [...prev, table]);
    };

    const updateTablePosition = (id: string, x: number, y: number) => {
        setRoundTables((prev) =>
            prev.map((table) => (table.id === id ? { ...table, x, y } : table))
        );
        setRectangularTables((prev) =>
            prev.map((table) => (table.id === id ? { ...table, x, y } : table))
        );
    };

    const updateRoomDimensions = (width: string, length: string) => {
        const numWidth = Number(width);
        const numLength = Number(length);
        if (!isNaN(numWidth) && !isNaN(numLength)) {
            setRoomDimensions([numWidth, numLength]);
        }
    };

    const handleUpdateTablePosition = (id: string, x: number, y: number) => {
        updateTablePosition(id, x, y); 
    };

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
                roomDimensions,
                roundTables,
                rectangularTables,
                updateRoomDimensions,
                addRoundTable,
                addRectangularTable,
                updateTablePosition,
                handleUpdateTablePosition,
                setRoundTables,
                setRectangularTables,

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
