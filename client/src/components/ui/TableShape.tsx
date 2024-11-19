import React, { useRef } from "react";
import styled from "styled-components";


interface TableShapeProps {
    id: string;
    x: number;
    y: number;
    height: number;
    width: number;
    isOval: boolean;
    updatePosition: (id: string, x: number, y: number) => void;
    children: string;
}


const StyledTableShape = styled.div<TableShapeProps>`
  position: absolute;
  cursor: pointer;
  height: ${(props) => `${props.height}px`};  
  width: ${(props) => `${props.width}px`};    
  border-radius: ${(props) => (props.isOval ? "50%" : "0")};  
  border: 2px solid ${({ theme }) => theme.secondary};
  background-color:  ${({ theme }) => theme.light};
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TableShape: React.FC<TableShapeProps> = ({ id, x, y, height, width, isOval, updatePosition, children }) => {
    const isDragging = useRef(false);
    const offset = useRef({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true;
        offset.current = {
            x: e.clientX - x,
            y: e.clientY - y,
        };
        document.body.style.userSelect = "none";
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging.current) {
            updatePosition(
                id,
                e.clientX - offset.current.x,
                e.clientY - offset.current.y
            );
        }
    };

    const handleMouseUp = () => {
        isDragging.current = false;
        document.body.style.userSelect = "";
    };

    React.useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [id, x, y]);

    return (
        <StyledTableShape
            onMouseDown={handleMouseDown}
            style={{
                left: `${x}px`,
                top: `${y}px`,
            }}
            height={height}
            width={width}
            isOval={isOval}
            id={id}
            x={x}
            y={y}
            updatePosition={updatePosition}
        >
            {children}
        </StyledTableShape>
    );
};

export default TableShape;
