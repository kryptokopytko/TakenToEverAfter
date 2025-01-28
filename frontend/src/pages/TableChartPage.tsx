import React, { useEffect, useState } from "react";
import { Container, MenuContainer, Notification, notificationTimeOut } from "../styles/page";
import { Body, Heading, Subtitle } from "../styles/typography";
import Input from "../components/ui/Input";
import Button, { ButtonContainer } from "../components/ui/Button";
import Checkbox from "../components/ui/Checkbox";
import HorizontalLine from "../components/ui/HorizontalLine";
import TableChart from "../sections/TableChart/TableChart";
import { RoundTable, RectangularTable } from "../types";
import { useTable } from "../providers/TableContext";
import GuidedInput from "../components/ui/GuidedInput";
import { useUser } from "../providers/UserContext";
import { translations } from "../translations";

interface TableChartPageProps { }

const TableChartPage: React.FC<TableChartPageProps> = () => {
    const {
        updateRoomDimensions, roomDimensions, deleteTable,
        addRoundTable, addRectangularTable, roundTables, rectangularTables
    } = useTable();
    const { language, guests } = useUser();
    const numberOfSeats = roundTables.reduce((acc, table) => acc + table.seats, 0) + rectangularTables.reduce((acc, table) => acc + table.length * 2 + table.width * 2, 0);
    const [isRound, setIsRound] = useState(false);
    const [tableName, setTableName] = useState("");
    const [roundSeats, setRoundSeats] = useState("");
    const [rectWidth, setRectWidth] = useState("");
    const [rectLength, setRectLength] = useState("");
    const [notification, setNotification] = useState<string | null>(null);
    const [roomWidth, setRoomWidth] = useState(roomDimensions[0].toString());
    const [roomLength, setRoomLength] = useState(roomDimensions[1].toString());
    const [tableToRemove, setTableToRemove] = useState("");
    const allTableNames = [...roundTables.map((t) => t.name), ...rectangularTables.map((t) => t.name)];

    useEffect(() => {
        setRoomWidth(roomDimensions[0].toString());
        setRoomLength(roomDimensions[1].toString());
    }, [roomDimensions]);

    const placeNewTable = (
        newTableDismensions: { seats: number } | { width: number, length: number },
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
            return (maxTableLength / roomDimensions[1]) * 100 + spacing | 5;
        };

        const rowHeight = calculateRowHeight();

        if ("width" in newTableDismensions && "length" in newTableDismensions) {
            const scaledWidth = (newTableDismensions.width / roomDimensions[0]) * 100;

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
        } else if ("seats" in newTableDismensions) {
            const diameter = (newTableDismensions.seats * 0.5) / Math.PI;
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

            return { x: Math.round(currentX - scaledDiameter), y: currentY };
        }

        throw new Error("Unknown table type");
    };

    const handleRemoveTable = () => {
        const roundTableToRemove = roundTables.find((table) => table.name == tableToRemove);
        const rectangularTableToRemove = rectangularTables.find((table) => table.name == tableToRemove);

        const toRemove = roundTableToRemove || rectangularTableToRemove;
        if (!toRemove) {
            setNotification(translations[language].tableNotFound.replace("{tableName}", tableToRemove));
        } else {
            deleteTable(toRemove.id);
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
                    name: generateTableId("round", roundTables),
                    x: 0,
                    y: 0,
                    seats,
                    guests: []
                };
                const { x, y } = placeNewTable({ seats }, roomDimensions as [number, number], roundTables, rectangularTables);
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
                    name: generateTableId("rect", rectangularTables),
                    width,
                    length,
                    x: 0,
                    y: 0,
                    guests: [],
                };
                const { x, y } = placeNewTable({ width, length }, roomDimensions as [number, number], roundTables, rectangularTables);
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
                    onChange={(e) => {
                        const value = Number(e.target.value);
                        if (!isNaN(value)) {
                            setRoomWidth(e.target.value);
                            updateRoomDimensions(value, Number(roomLength));
                        }
                    }}
                />

                <Subtitle level={3}>{translations[language].roomLength}</Subtitle>
                <Input
                    value={roomLength}
                    type="number"
                    placeholder={translations[language].roomLengthPlaceholder}
                    onChange={(e) => {
                        const value = Number(e.target.value);
                        if (!isNaN(value)) {
                            setRoomLength(e.target.value);
                            updateRoomDimensions(Number(roomWidth), value);
                        }
                    }}

                />

                <HorizontalLine />
                <Heading level={3}>{translations[language].addTable}</Heading>

                <Subtitle level={3}>{translations[language].name}</Subtitle>
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


                <Heading level={3}>{translations[language].listOfTables}</Heading>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                        gap: "2rem",
                        marginTop: "2rem",
                        marginBottom: "2rem",

                    }}
                >
                    <Body size="bold" >Table Name</Body>
                    <Body size="bold" >Type</Body>
                    <Body size="bold" >Capacity</Body>

                    {roundTables.map((table) => (
                        <React.Fragment key={table.name}>
                            <div>{table.name}</div>
                            <div>Round</div>
                            <div>{table.seats}</div>
                        </React.Fragment>
                    ))}

                    {rectangularTables.map((table) => (
                        <React.Fragment key={table.name}>
                            <div>{table.name}</div>
                            <div>Rectangular</div>
                            <div>{table.length * 2 + table.width * 2}</div>
                        </React.Fragment>
                    ))}
                </div>
                <Body size='big'>Total number of seats: {numberOfSeats}</Body>
                <Body size='big'>Total number of guests: {guests.length}</Body>
            </MenuContainer>

            <TableChart />
        </Container>
    );
};

export default TableChartPage;
