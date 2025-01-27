import { createContext, useContext, ReactNode, useState } from "react";
import { RoundTable, RectangularTable } from "../types";
import Example from "../exampleData";

interface TableContextType {
    roomDimensions: number[];
    roundTables: RoundTable[];
    rectangularTables: RectangularTable[];
    updateRoomDimensions: (x: string, y: string) => void;
    addRoundTable: (table: RoundTable) => void;
    addRectangularTable: (table: RectangularTable) => void;
    updateTablePosition: (id: string, x: number, y: number) => void;
    handleUpdateTablePosition: (id: string, x: number, y: number) => void;
    setRoundTables: React.Dispatch<React.SetStateAction<RoundTable[]>>;
    setRectangularTables: React.Dispatch<React.SetStateAction<RectangularTable[]>>;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export const TableProvider = ({ children }: { children: ReactNode }) => {
    const [roomDimensions, setRoomDimensions] = useState([16, 7]);
    const [roundTables, setRoundTables] = useState<RoundTable[]>(Example.roundTables);
    const [rectangularTables, setRectangularTables] = useState<RectangularTable[]>(Example.rectangularTables);

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
        if (!isNaN(numWidth) && Number(numWidth) != 0 && !isNaN(numLength) && Number(numLength) != 0) {
            setRoomDimensions([numWidth, numLength]);
        }
    };

    const handleUpdateTablePosition = (id: string, x: number, y: number) => {
        updateTablePosition(id, x, y);
    };

    return (
        <TableContext.Provider
            value={{
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
        </TableContext.Provider>
    );
};

export const useTable = () => {
    const context = useContext(TableContext);
    if (!context) {
        throw new Error("useTable must be used within a TableProvider");
    }
    return context;
};
