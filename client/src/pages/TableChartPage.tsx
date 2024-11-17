import React, { useState } from "react";
import { Container, MenuContainer, Notification, notificationTimeOut } from "../styles/page";
import { Heading, Subtitle } from "../styles/typography";
import Input from "../components/Input";
import Button, { ButtonContainer } from "../components/Button";
import Checkbox from "../components/Checkbox";
import { useUser } from "../providers/UserContext";
import TableChart from "../sections/TableChart";
import HorizontalLine from "../components/HorizontalLine";

interface TableChartPageProps { }

const TableChartPage: React.FC<TableChartPageProps> = () => {
    const {
        roomWidth, setRoomWidth, roomLength, setRoomLength,
        addRoundTable, addRectangularTable, roundTables, rectangularTables,
    } = useUser();

    const [isRound, setIsRound] = useState(false);
    const [tableName, setTableName] = useState("");
    const [roundSeats, setRoundSeats] = useState("");
    const [rectWidth, setRectWidth] = useState("");
    const [rectLength, setRectLength] = useState("");
    const [notification, setNotification] = useState<string | null>(null);

    const handleAddTable = () => {
        const generateTableId = (prefix: string, existingTables: any[]) =>
            tableName.trim() || `${prefix}-${existingTables.length + 1}`;

        if (isRound) {
            const seats = parseInt(roundSeats, 10);
            if (!isNaN(seats) && seats > 0) {
                const newTable = { id: generateTableId("round", roundTables), seats };
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
                const newTable = { id: generateTableId("rect", rectangularTables), width, length };
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
                <Heading level={3}>Room Dimensions</Heading>
                <Subtitle level={3}>Width</Subtitle>

                <Input
                    value={roomWidth}
                    type="number"
                    placeholder="Room width in meters"
                    onChange={(e) => setRoomWidth(e.target.value)}
                />
                <Subtitle level={3}>Length</Subtitle>

                <Input
                    value={roomLength}
                    type="number"
                    placeholder="Room length in meters"
                    onChange={(e) => setRoomLength(e.target.value)}
                />
            </MenuContainer>

            <TableChart
            />
        </Container>
    );
};

export default TableChartPage;
