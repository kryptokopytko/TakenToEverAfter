import React from "react";
import { Heading } from "../../styles/typography";
import { useTable } from "../../providers/TableContext";
import { translations } from "../../translations";
import { useUser } from "../../providers/UserContext";

interface TablesDisplayProps {
}

const TablesDisplay: React.FC<TablesDisplayProps> = ({
}) => {
    const {
        roomDimensions,
        roundTables, rectangularTables
    } = useTable();
    const { language } = useUser();

    return (
        <div>
            <Heading level={3}>{translations[language].roundTables}</Heading>
            <ul>
                {roundTables.map((table) => {
                    const circumference =
                        typeof table.seats === 'number' ? table.seats * 0.5 : 1;

                    const diameter = (circumference / Math.PI).toFixed(2);
                    const scaledDiameter = Number(diameter) / roomDimensions[0] * 100;

                    return (
                        <li key={table.id}>
                            {translations[language].nameId}: {table.id}, {translations[language].seats}: {table.seats}, 
                            {translations[language].diameter}: {diameter}m, 
                            x: {table.x}, y: {table.y}
                            <div style={{ width: `${scaledDiameter}%`, aspectRatio: "1" }}>
                            </div>
                        </li>
                    );
                })}
            </ul>

            <Heading level={3}>{translations[language].rectangularTables}</Heading>
            <ul>
                {rectangularTables.map((table) => {
                    const scaledWidth = table.width! / roomDimensions[0] * 100;

                    return (
                        <li key={table.id}>
                            {translations[language].nameId}: {table.id}, {translations[language].width}: {table.width}m, 
                            {translations[language].length}: {table.length}m, 
                            x: {table.x}, y: {table.y}
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
