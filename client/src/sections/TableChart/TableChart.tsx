import React from "react";
import RoomDisplay from "./RoomDisplay";
import { Heading } from "../../styles/typography";
import Button from "../../components/ui/Button";
import { exportToPDF } from "../Printables/exportToPdf";
import { SpaceBetweenContainer } from "../../styles/section";

const TableChart: React.FC = () => {
  return (
    <div id="table-chart">
      <SpaceBetweenContainer>
        <Heading level={2}>Room</Heading>
        <div style={{ marginBottom: '2rem' }}>
          <Button onClick={() => exportToPDF("table-chart")}>
            Export to PDF
          </Button>
        </div>
      </SpaceBetweenContainer>
      <RoomDisplay />
    </div>
  );
};

export default TableChart;
