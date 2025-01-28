import { createContext, useContext, ReactNode, useState } from "react";
import { RoundTable, RectangularTable } from "../types";
import Example from "../exampleData";
import useFunctionsProxy from "../API/FunctionHandler";

interface TableContextType {
    roomDimensions: number[];
    roundTables: RoundTable[];
    rectangularTables: RectangularTable[];
    updateRoomDimensions: (x: number, y: number) => void;
    addRoundTable: (table:  Omit<RoundTable, "id">) => void;
    addRectangularTable: (table:  Omit<RectangularTable, "id">) => void;
    updateTablePosition: (id: number, x: number, y: number) => void;
    deleteTable: (id: number) => void;
    setRoomDimensions: React.Dispatch<React.SetStateAction<number[]>>;
    setRectangularTables: React.Dispatch<React.SetStateAction<RectangularTable[]>>;
    setRoundTables: React.Dispatch<React.SetStateAction<RoundTable[]>>;
    saveTableLayout: () => void;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export const TableProvider = ({ children }: { children: ReactNode }) => {
    const [roomDimensions, setRoomDimensions] = useState(Example.roomDismensions);
    const [roundTables, setRoundTables] = useState<RoundTable[]>(Example.roundTables);
    const [rectangularTables, setRectangularTables] = useState<RectangularTable[]>(Example.rectangularTables);
    const FunctionsProxy = useFunctionsProxy();

    const addRoundTable = async (table:  Omit<RoundTable, "id">) => {
        console.log(table.x, table.y);
        const id = await FunctionsProxy.addTable(table.name, table.x, table.y, table.seats, "circular");
        setRoundTables((prev) => [...prev, {...table, id: id || 0}]);
    };

    const addRectangularTable = async (table: Omit<RectangularTable, "id">) => {
        const id = await FunctionsProxy.addTable(table.name, table.x, table.y, {length: table.length, width: table.width}, "rectangular");
        setRectangularTables((prev) => [...prev, {...table, id: id || 0}]);
    };

    const updateTablePosition = async (id: number, x: number, y: number) => {
        const rectTable = rectangularTables.find(table => table.id == id);
        if (rectTable) { 
            setRectangularTables((prev) =>
                prev.map((table) => (table.id === id ? { ...table, x, y } : table))
            );
        }

        setRoundTables((prev) =>
            prev.map((table) => (table.id === id ? { ...table, x, y } : table))
        );
    };

    const saveTableLayout = async () => {
        for (const rectTable of rectangularTables) { 
            await FunctionsProxy.updateTable(rectTable.id, "rectangular", rectTable);
        }

        for (const roundTable of roundTables) {
            await FunctionsProxy.updateTable(roundTable.id, "circular", roundTable);
        }
    }

    const updateRoomDimensions = async (width: number, length: number) => {
        setRoomDimensions([width, length]);
        await FunctionsProxy.updateRoomDimensions(width, length);
    };

    const deleteTable = async (tableId: number) => {
        const updatedRoundTables = roundTables.filter((table) => table.id !== tableId);
        const updatedRectangularTables = rectangularTables.filter((table) => table.id !== tableId);
        
        setRoundTables(updatedRoundTables);
        setRectangularTables(updatedRectangularTables);
        await FunctionsProxy.deleteTable(tableId);
    }

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
                deleteTable,
                setRoomDimensions,
                setRectangularTables,
                setRoundTables,
                saveTableLayout,
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
