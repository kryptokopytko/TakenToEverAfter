import React, { useState, useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import TableShape from "../../components/ui/TableShape";
import { useTable } from "../../providers/TableContext";
import Button, {ButtonContainer} from "../../components/ui/Button";
import { translations } from "../../translations";
import { useUser } from "../../providers/UserContext";
import { Link } from "react-router-dom";

export const Board = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${({ theme }) => theme.dark};
`;

const RoomDisplay: React.FC<{ isHomePage?: boolean }> = ({ isHomePage }) => {
    const { roomDimensions, roundTables, rectangularTables, updateTablePosition } = useTable();
    const { language } = useUser();
    const boardRef = useRef<HTMLDivElement>(null);
    const [boardWidth, setBoardWidth] = useState(0);
    const [boardHeight, setBoardHeight] = useState(0);
    const [showNames, setShowNames] = useState(false);

    const diameter = (seats: number) => (seats * 2) / Math.PI;

    useLayoutEffect(() => {
        const handleResize = () => {
            if (boardRef.current) {
                const containerWidth = boardRef.current.offsetWidth;
                const containerHeight = (containerWidth * roomDimensions[1]) / roomDimensions[0];
                setBoardWidth(containerWidth);
                setBoardHeight(containerHeight);
            }
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [roomDimensions]);

    const updateTableShapePosition = (id: number, x: number, y: number) => {
        const newX = Math.min(Math.max(x * 1000 / boardWidth, 0), 1000);
        const newY = Math.min(Math.max(y * 1000 / boardHeight, 0), 1000);

        updateTablePosition(id, newX, newY);
    };

    return (
        <>

            <Board ref={boardRef} style={{ height: `${boardHeight}px` }}>


                {roundTables.map((table) => (
                    <TableShape
                        key={table.id}
                        id={table.id}
                        x={(table.x / 1000) * boardWidth}
                        y={(table.y / 1000) * boardHeight}
                        updatePosition={updateTableShapePosition}
                        height={diameter(table.seats) / 4 / roomDimensions[1] * boardHeight}
                        width={diameter(table.seats) / 4 / roomDimensions[0] * boardWidth}
                        isOval={true}
                        guests={showNames ? table.guests : []}
                    >
                        {table.id}
                    </TableShape>
                ))}


                {rectangularTables.map((table) => (
                    <TableShape
                        key={table.id}
                        id={table.id}
                        x={(table.x / 1000) * boardWidth}
                        y={(table.y / 1000) * boardHeight}
                        updatePosition={updateTableShapePosition}
                        height={table.length / 2 / roomDimensions[1] * boardHeight}
                        width={table.width / 2 / roomDimensions[0] * boardWidth}
                        isOval={false}
                        guests={showNames ? table.guests : []}
                    >
                        {table.id}
                    </TableShape>
                ))}
            </Board>
            {isHomePage ? <ButtonContainer>
                    <Link to="table_chart">
                        <Button>{translations[language].manageTables}</Button>
                    </Link>
                    <Button onClick={() => setShowNames((prev) => !prev)}>
                        {showNames ? translations[language].hideNames : translations[language].showNames}
                    </Button>
                </ButtonContainer> : <></>}
        </>

    );
};

export default RoomDisplay;
