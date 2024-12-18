import React, { useState } from "react";
import { Container, MenuContainer, Notification, notificationTimeOut } from "../styles/page";
import { Heading, Subtitle } from "../styles/typography";
import Input from "../components/ui/Input";
import Button, { ButtonContainer } from "../components/ui/Button";
import Checkbox from "../components/ui/Checkbox";
import HorizontalLine from "../components/ui/HorizontalLine";
import TableChart from "../sections/TableChart/TableChart";
import { RoundTable, RectangularTable } from "../types";
import { useTable } from "../providers/TableContext";
import GuidedInput from "../components/ui/GuidedInput";
import { useUser } from "../providers/UserContext";
import { SpaceBetweenContainer } from "../styles/section";
interface TableChartPageProps { }

const TableChartPage: React.FC<TableChartPageProps> = () => {
    const {
        updateRoomDimensions, roomDimensions, setRoundTables, setRectangularTables,
        addRoundTable, addRectangularTable, roundTables, rectangularTables
    } = useTable();

    const { guestList } = useUser();

    const [isRound, setIsRound] = useState(false);
    const [tableName, setTableName] = useState("");
    const [roundSeats, setRoundSeats] = useState("");
    const [rectWidth, setRectWidth] = useState("");
    const [rectLength, setRectLength] = useState("");
    const [notification, setNotification] = useState<string | null>(null);
    const [roomWidth, setRoomWidth] = useState("");
    const [roomLength, setRoomLength] = useState("");
    const [tableToRemove, setTableToRemove] = useState("");
    const allTableNames = [...roundTables.map((t) => t.id), ...rectangularTables.map((t) => t.id)];
    const [selectedGuests, setSelectedGuests] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");

    const placeNewTable = (
        newTable: RoundTable | RectangularTable,
        roomDimensions: [number, number],
        roundTables: RoundTable[],
        rectangularTables: RectangularTable[]
    ): { x: number; y: number } => {
        const spacing = 5;
        const roomWidth = 100;
        const roomHeight = 100;

        const calculateRowHeight = () => {
            const maxTableLength = Math.max(
                ...rectangularTables.map((table) => table.length),
                ...roundTables.map((table) => (table.seats * 0.5) / Math.PI)
            );
            return (maxTableLength / roomDimensions[1]) * 100 + spacing;
        };

        const rowHeight = calculateRowHeight();

        if ("width" in newTable && "length" in newTable) {
            const scaledWidth = (newTable.width / roomDimensions[0]) * 100;

            let currentX = spacing;
            let currentY = spacing;

            for (const table of rectangularTables) {
                const tableWidth = (table.width / roomDimensions[0]) * 100;

                if (currentX + tableWidth + scaledWidth > roomWidth) {
                    currentX = spacing;
                    currentY += rowHeight;
                } else {
                    currentX += tableWidth + spacing;
                }
            }

            return { x: currentX, y: currentY };
        } else if ("seats" in newTable) {

            const diameter = (newTable.seats * 0.5) / Math.PI;
            const scaledDiameter = (diameter / roomDimensions[0]) * 100;

            let currentX = roomWidth - spacing;
            let currentY = roomHeight - rowHeight;

            for (const table of roundTables) {
                const tableDiameter = ((table.seats * 0.5) / Math.PI / roomDimensions[0]) * 100;

                if (currentX - tableDiameter - scaledDiameter < 0) {
                    currentX = roomWidth - spacing;
                    currentY -= rowHeight;
                } else {
                    currentX -= tableDiameter + spacing;
                }
            }

            return { x: currentX - scaledDiameter, y: currentY };
        }

        throw new Error("Unknown table type");
    };

    const handleRemoveTable = () => {
        const updatedRoundTables = roundTables.filter((table) => table.id !== tableToRemove);
        const updatedRectangularTables = rectangularTables.filter((table) => table.id !== tableToRemove);

        if (updatedRoundTables.length === roundTables.length && updatedRectangularTables.length === rectangularTables.length) {
            setNotification(`Table "${tableToRemove}" not found.`);
        } else {
            setRoundTables(updatedRoundTables);
            setRectangularTables(updatedRectangularTables);
            setNotification(`Table "${tableToRemove}" has been removed.`);
        }

        setTableToRemove("");
        setTimeout(() => setNotification(null), notificationTimeOut);
    };

    const handleAddTable = () => {
        if (allTableNames.includes(tableName.trim())) {
            setNotification("Table name must be unique.");
            setTimeout(() => setNotification(null), notificationTimeOut);
            return;
        }

        const generateTableId = (prefix: string, existingTables: any[]) =>
            tableName.trim() || `${prefix}-${existingTables.length + 1}`;
        if (isRound) {
            const seats = parseInt(roundSeats, 10);
            if (!isNaN(seats) && seats > 0) {
                let newTable = {
                    id: generateTableId("round", roundTables),
                    x: 0,
                    y: 0,
                    seats,
                    guests: []
                };
                const { x, y } = placeNewTable(newTable, roomDimensions as [number, number], roundTables, rectangularTables);
                newTable.x = x;
                newTable.y = y;
                addRoundTable(newTable);
                setNotification(`Added round table ${tableName.trim() || `#${roundTables.length + 1}`} with ${seats} seats.`);
                setRoundSeats("");
                setTableName("");
            } else {
                setNotification("Invalid number of seats for a round table.");
            }
        } else {
            const width = parseInt(rectWidth, 10);
            const length = parseInt(rectLength, 10);
            if (!isNaN(width) && width > 0 && !isNaN(length) && length > 0) {
                const newTable = {
                    id: generateTableId("rect", rectangularTables),
                    width,
                    length,
                    x: 0,
                    y: 0,
                    guests: [],
                };
                const { x, y } = placeNewTable(newTable, roomDimensions as [number, number], roundTables, rectangularTables);
                newTable.x = x;
                newTable.y = y;
                addRectangularTable(newTable);
                setNotification(`Added rectangular table ${tableName.trim() || `#${rectangularTables.length + 1}`} with width ${width} and length ${length}.`);
                setRectWidth("");
                setRectLength("");
                setTableName("");
            } else {
                setNotification("Invalid dimensions for a rectangular table.");
            }
        }
        setTimeout(() => setNotification(null), notificationTimeOut);
    };


    return (
        <Container >
            <MenuContainer>
                <Heading level={2}>Table chart</Heading>

                <Subtitle level={3}>Room Width (m)</Subtitle>

                <Input
                    value={roomWidth}
                    type="number"
                    placeholder="Room width in meters"
                    onChange={(e) => { setRoomWidth(e.target.value); updateRoomDimensions(e.target.value, roomLength) }}

                />
                <Subtitle level={3}>Room Length (m)</Subtitle>

                <Input
                    value={roomLength}
                    type="number"
                    placeholder="Room length in meters"
                    onChange={(e) => { setRoomLength(e.target.value); updateRoomDimensions(roomWidth, e.target.value) }}

                />
                <HorizontalLine />

                <Heading level={3}>Add Table</Heading>
                <Subtitle level={3}>Name (optional)</Subtitle>
                <Input
                    value={tableName}
                    placeholder="Enter table name"
                    onChange={(e) => setTableName(e.target.value)}
                />

                {isRound ? (
                    <>
                        <Subtitle level={3}>Seats</Subtitle>
                        <Input
                            value={roundSeats}
                            type="number"
                            placeholder="Number of seats"
                            onChange={(e) => setRoundSeats(e.target.value)}
                        />
                    </>
                ) : (
                    <>
                        <Subtitle level={3}>Width</Subtitle>
                        <Input
                            value={rectWidth}
                            type="number"
                            placeholder="Number of seats on the width side"
                            onChange={(e) => setRectWidth(e.target.value)}
                        />
                        <Subtitle level={3}>Length</Subtitle>
                        <Input
                            value={rectLength}
                            type="number"
                            placeholder="Number of seats on the length side"
                            onChange={(e) => setRectLength(e.target.value)}
                        />
                    </>
                )}

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
                    <Checkbox checked={isRound} onChange={() => setIsRound(!isRound)} />
                    Is table round
                </div>

                {notification && <Notification>{notification}</Notification>}

                <ButtonContainer>
                    <Button onClick={handleAddTable}>Add Table</Button>
                </ButtonContainer>
                <HorizontalLine />


                <Heading level={3}>Remove Table</Heading>
                <GuidedInput
                    suggestions={allTableNames}
                    value={tableToRemove}
                    setInputValue={setTableToRemove}
                    placeholder="Select table name"
                    onChange={(e) => setTableToRemove(e.target.value)}
                />
                <ButtonContainer>
                    <Button onClick={handleRemoveTable} disabled={!tableToRemove}>
                        Remove Table
                    </Button>
                </ButtonContainer>
                <HorizontalLine />
                <Heading level={3}>Assign Guests to Table</Heading>
                <GuidedInput
                    suggestions={guestList.map(guest => guest.name)}
                    value={inputValue}
                    setInputValue={setInputValue}
                    placeholder="Search guest name"
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <ButtonContainer>
                    <Button
                        onClick={() => {
                            if (selectedGuests.includes(inputValue)) {
                                setSelectedGuests(selectedGuests.filter(guest => guest !== inputValue));
                            } else {
                                setSelectedGuests([...selectedGuests, inputValue]);
                            }
                        }}
                    >
                        {selectedGuests.includes(inputValue) ? "Remove" : "Add"}
                    </Button>
                </ButtonContainer>
                <HorizontalLine />

                <Subtitle level={3}>Main Table Guests:</Subtitle>
                {selectedGuests.map((guest, index) => (
                    <div key={index}>
                        <SpaceBetweenContainer>
                            <div style={{ marginTop: '2rem' }}>
                                {guest}</div>
                            <Button
                                onClick={() => setSelectedGuests(selectedGuests.filter(item => item !== guest))}
                            >
                                Remove
                            </Button>
                        </SpaceBetweenContainer>
                    </div>
                ))}

            </MenuContainer>

            <TableChart />
        </Container>
    );
};

export default TableChartPage;
