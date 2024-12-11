import React, { useRef, useMemo } from "react";
import styled from "styled-components";

interface TableShapeProps {
    id: string;
    x: number;
    y: number;
    height: number;
    width: number;
    isOval: boolean;
    updatePosition: (id: string, x: number, y: number) => void;
    children: React.ReactNode;
    guests: string[];
}

const GuestContainer = styled.div<{ radius: number; isOval: boolean }>`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;
GuestContainer.shouldForwardProp = (prop) => prop !== "isOval";

const GuestBadge = styled.span`
  position: absolute;
  color: ${({ theme }) => theme.body};
  padding: 2px 6px;
  border-radius: 12px;
  transform: translate(-50%, -50%);
  max-width: 5rem
`;

const StyledTableShape = styled.div<TableShapeProps>`
  position: absolute;
  cursor: pointer;
  height: ${(props) => `${props.height}px`};
  width: ${(props) => `${props.width}px`};
  border-radius: ${(props) => (props.isOval ? "50%" : "0")};
  border: 2px solid ${({ theme }) => theme.secondary};
  background-color: ${({ theme }) => theme.light};
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;
StyledTableShape.shouldForwardProp = (prop) => prop !== "isOval" && prop !== "updatePosition";

const TableShape: React.FC<TableShapeProps> = ({
    id, x, y, guests, height, width, isOval, updatePosition, children
}) => {
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

    
    const guestPositions = useMemo(() => {
        if (isOval) {
            
            const radius = Math.min(width, height) / 2;
            return guests.map((guest, index) => {
                const angle = (2 * Math.PI * index) / guests.length;
                const distanceFromCenter = radius * 1.3 + 40;
                const left = radius + distanceFromCenter * Math.cos(angle);
                const top = radius + distanceFromCenter * Math.sin(angle);
                return { guest, left, top };
            });
        } else {
            
            return guests.map((guest, index) => {
                const totalGuests = guests.length;
                const perimeter = 2 * (width + height);
                const segmentLength = perimeter / totalGuests;

                let currentDistance = index * segmentLength;
                let left = 0, top = 0;

                if (currentDistance < width) {
                    
                    left = currentDistance;
                    top = -30;
                } else if (currentDistance < width + height) {
                    
                    left = width + 60;
                    top = currentDistance - width;
                } else if (currentDistance < 2 * width + height) {
                    
                    left = width - (currentDistance - width - height);
                    top = height + 30;
                } else {
                    
                    left = -60;
                    top = height - (currentDistance - 2 * width - height);
                }

                return { guest, left, top };
            });
        }
    }, [guests, width, height, isOval]);

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
            guests={guests}
            updatePosition={updatePosition}
        >
            {children}
            <GuestContainer radius={Math.min(width, height) / 2} isOval={isOval}>
                {guestPositions.map(({ guest, left, top }) => (
                    <GuestBadge
                        key={guest}
                        style={{
                            left: `${left}px`,
                            top: `${top}px`
                        }}
                    >
                        {guest}
                    </GuestBadge>
                ))}
            </GuestContainer>
        </StyledTableShape>
    );
};

export default TableShape;