import React from "react";
import { Heading } from "../../styles/typography";
import { useTable } from "../../providers/TableContext";

interface TablesDisplayProps {
}

const TablesDisplay: React.FC<TablesDisplayProps> = ({
}) => {
    const {
        roomDimensions,
        roundTables, rectangularTables
    } = useTable();
    return (
        <div>
            <Heading level={3}>Round Tables</Heading>
            <ul>
                {roundTables.map((table) => {
                    const circumference =
                        typeof table.seats === 'number' ? table.seats * 0.5 : 1;

                    const diameter = (circumference / Math.PI).toFixed(2);
                    const scaledDiameter = Number(diameter) / roomDimensions[0] * 100;

                    return (
                        <li key={table.id}>
                            Name/ID: {table.id}, Seats: {table.seats}, Diameter: {diameter}m
                            x: {table.x},  y: {table.y}

                            <div style={{ width: `${scaledDiameter}%`, aspectRatio: "1" }}>
                            </div>
                        </li>
                    );
                })}
            </ul>

            <Heading level={3}>Rectangular Tables</Heading>
            <ul>
                {rectangularTables.map((table) => {
                    const scaledWidth = table.width! / roomDimensions[0] * 100;

                    return (
                        <li key={table.id}>
                            Name/ID: {table.id}, Width: {table.width}m, Length: {table.length}m,
                            x: {table.x},  y: {table.y}
                            <div
                                style={{
                                    width: `${scaledWidth}%`,
                                    aspectRatio: `${table.width} / ${table.length}`,
                                }}
                            >
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default TablesDisplay;
