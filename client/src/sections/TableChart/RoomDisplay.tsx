import React, { useState } from "react";
import Shape from "../../components/ui/Shape";
import { Slider } from "../../Slider";
import { useTable } from "../../providers/TableContext";

interface RoomDisplayProps { }

const RoomDisplay: React.FC<RoomDisplayProps> = () => {
    const { roomDimensions, roundTables, rectangularTables } = useTable();
    const [containerWidthPercent, setContainerWidthPercent] = useState(100);

    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setContainerWidthPercent(Number(event.target.value));
    };

    const containerStyle: React.CSSProperties = {
        width: `${containerWidthPercent}%`,
        aspectRatio: `${roomDimensions[0]} / ${roomDimensions[1]}`,
        position: "relative",
        border: "2px solid black",
        marginTop: "1rem",
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <div>
                    <label htmlFor="sizeSlider">Adjust Room Size:</label>
                    <Slider
                        type="range"
                        id="sizeSlider"
                        min="20"
                        max="100"
                        value={containerWidthPercent}
                        onChange={handleSliderChange}
                    />
                    <span>{containerWidthPercent}%</span>
                </div>
                <div style={containerStyle}>
                    {rectangularTables.map((table) => {
                        const scaledWidth = (table.width / roomDimensions[0]) * 100;
                        const scaledHeight = (table.length / roomDimensions[1]) * 100;

                        return (
                            <Shape
                                key={table.id}
                                x={`${table.x}%`}
                                y={`${table.y}%`}
                                width={`${scaledWidth}%`}
                                height={`${scaledHeight}%`}
                                label={table.id.toString()}
                            />
                        );
                    })}

                    {roundTables.map((table) => {
                        const diameter = (table.seats * 0.5) / Math.PI;
                        const scaledDiameter = (diameter / roomDimensions[0]) * 100;

                        return (
                            <Shape
                                key={table.id}
                                x={`${table.x}%`}
                                y={`${table.y}%`}
                                width={`${scaledDiameter}%`}
                                height={`${scaledDiameter}%`}
                                oval
                                label={table.id.toString()}
                            />
                        );
                    })}
                </div>
            </div>
        </div>

    );
};

export default RoomDisplay;
