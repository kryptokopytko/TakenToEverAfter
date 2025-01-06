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
import { translations } from "../translations";

interface TableChartPageProps { }

const TableChartPage: React.FC<TableChartPageProps> = () => {
    const {
        updateRoomDimensions, roomDimensions, setRoundTables, setRectangularTables,
        addRoundTable, addRectangularTable, roundTables, rectangularTables
    } = useTable();

    const { guests, language } = useUser();

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

        if (!tableToRemove) {
            setNotification(translations[language].tableNotFound.replace("{tableName}", tableToRemove));
        } else {
            setRoundTables(updatedRoundTables);
            setRectangularTables(updatedRectangularTables);
            setNotification(translations[language].tableRemoved.replace("{tableName}", tableToRemove));
        }

        setTableToRemove("");
        setTimeout(() => setNotification(null), notificationTimeOut);
    };

    const handleAddTable = () => {
        if (allTableNames.includes(tableName.trim())) {
            setNotification(translations[language].tableNameNotUnique);
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
                setNotification(translations[language].roundTableAdded.replace("{tableName}", tableName.trim() || `#${roundTables.length + 1}`).replace("{seats}", seats.toString()));
                setRoundSeats("");
                setTableName("");
            } else {
                setNotification(translations[language].invalidSeatsForRoundTable);
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
                setNotification(translations[language].rectangularTableAdded
                    .replace("{tableName}", tableName.trim() || `#${rectangularTables.length + 1}`)
                    .replace("{width}", width.toString()).replace("{length}", length.toString()));
                setRectWidth("");
                setRectLength("");
                setTableName("");
            } else {
                setNotification(translations[language].invalidDimensionsForRectangularTable);
            }
        }
        setTimeout(() => setNotification(null), notificationTimeOut);
    };


    return (
        <Container >
            <MenuContainer>
                <Heading level={2}>{translations[language].tableChart}</Heading>

                <Subtitle level={3}>{translations[language].roomWidth}</Subtitle>
                <Input
                    value={roomWidth}
                    type="number"
                    placeholder={translations[language].roomWidthPlaceholder}
                    onChange={(e) => { setRoomWidth(e.target.value); updateRoomDimensions(e.target.value, roomLength) }}
                />

                <Subtitle level={3}>{translations[language].roomLength}</Subtitle>
                <Input
                    value={roomLength}
                    type="number"
                    placeholder={translations[language].roomLengthPlaceholder}
                    onChange={(e) => { setRoomLength(e.target.value); updateRoomDimensions(roomWidth, e.target.value) }}

                />
                
                <HorizontalLine />
                <Heading level={3}>{translations[language].addTable}</Heading>
                
                <Subtitle level={3}>{translations[language].nameOptional}</Subtitle>
                <Input
                    value={tableName}
                    placeholder={translations[language].tableNamePlaceholder}
                    onChange={(e) => setTableName(e.target.value)}
                />
                {isRound ? (
                    <>
                        <Subtitle level={3}>{translations[language].seats}</Subtitle>
                        <Input
                            value={roundSeats}
                            type="number"
                            placeholder={translations[language].seatsPlaceholder}
                            onChange={(e) => setRoundSeats(e.target.value)}
                        />
                    </>
                ) : (
                    <>
                        <Subtitle level={3}>{translations[language].width}</Subtitle>
                        <Input
                            value={rectWidth}
                            type="number"
                            placeholder={translations[language].widthPlaceholder}
                            onChange={(e) => setRectWidth(e.target.value)}
                        />
                        <Subtitle level={3}>{translations[language].length}</Subtitle>
                        <Input
                            value={rectLength}
                            type="number"
                            placeholder={translations[language].lengthPlaceholder}
                            onChange={(e) => setRectLength(e.target.value)}
                        />
                    </>
                )}

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
                    <Checkbox checked={isRound} onChange={() => setIsRound(!isRound)} />
                    {translations[language].isTableRound}
                </div>

                {notification && <Notification>{notification}</Notification>}

                <ButtonContainer>
                    <Button onClick={handleAddTable}>{translations[language].addTable}</Button>
                </ButtonContainer>
                <HorizontalLine />


                <Heading level={3}>{translations[language].removeTable}</Heading>
                <GuidedInput
                    suggestions={allTableNames}
                    value={tableToRemove}
                    setInputValue={setTableToRemove}
                    placeholder={translations[language].removeTablePlaceholder}
                    onChange={(e) => setTableToRemove(e.target.value)}
                />
                <ButtonContainer>
                    <Button onClick={handleRemoveTable} disabled={!tableToRemove}>
                        {translations[language].removeTable}
                    </Button>
                </ButtonContainer>
                <HorizontalLine />
                <Heading level={3}>{translations[language].assignGuests}</Heading>
                <GuidedInput
                    suggestions={guests.map(guest => guest.name)}
                    value={inputValue}
                    setInputValue={setInputValue}
                    placeholder={translations[language].searchGuestPlaceholder}
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
                        {selectedGuests.includes(inputValue) ? translations[language].delete : translations[language].add}
                    </Button>
                </ButtonContainer>
                <HorizontalLine />

                <Subtitle level={3}>{translations[language].mainTableGuests}:</Subtitle>
                {selectedGuests.map((guest, index) => (
                    <div key={index}>
                        <SpaceBetweenContainer>
                            <div style={{ marginTop: '2rem' }}>
                                {guest}</div>
                            <Button
                                onClick={() => setSelectedGuests(selectedGuests.filter(item => item !== guest))}
                            >
                                {translations[language].delete}
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
