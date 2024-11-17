import React from "react";
import { Heading } from "../styles/typography";
import { useUser } from "../providers/UserContext";
import Shape from "../components/Shape";

const TableChart: React.FC = () => {
  const { roomWidth, roomLength, roundTables, rectangularTables } = useUser();
  const numericRoomWidth = Number(roomWidth);
  const numericRoomLength = Number(roomLength);


  
  const containerStyle = {
    width: '100%',
    aspectRatio: `${numericRoomWidth} / ${numericRoomLength}`,
  };

  return (
    <div>
      <Heading level={3}>Room Dimensions</Heading>
      <p>
        Width: {numericRoomWidth || "Not specified"}, Length:{" "}
        {numericRoomLength || "Not specified"}
      </p>

      <Heading level={3}>Round Tables</Heading>
      <ul>
        {roundTables.map((table) => (
          <li key={table.id}>
            Name/ID: {table.id}, Seats: {table.seats}
          </li>
        ))}
      </ul>

      <Heading level={3}>Rectangular Tables</Heading>
      <ul>
        {rectangularTables.map((table) => (
          <li key={table.id}>
            <p>
              Name/ID: {table.id}, Width: {table.width}, Length: {table.length}
            </p>
          </li>
        ))}
      </ul>

      <Heading level={3}>Room Shape</Heading>
      Sala:
      <div style={containerStyle}>
        <Shape color="dark" />
      </div>

      <Heading level={3}>Example Table</Heading>
      Przykładowy stół:
      <Shape width="20rem" height="10rem" oval={true} />
    </div>
  );
};

export default TableChart;