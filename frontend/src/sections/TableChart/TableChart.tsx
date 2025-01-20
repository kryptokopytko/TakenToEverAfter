import React from "react";
import RoomDisplay from "./RoomDisplay";
import { Heading } from "../../styles/typography";
import Button from "../../components/ui/Button";
import { exportToPDF } from "../Printables/exportToPdf";
import { SpaceBetweenContainer } from "../../styles/section";
import { translations } from "../../translations";
import { useUser } from "../../providers/UserContext";

const TableChart: React.FC = () => {
  const {language} = useUser();

  return (
    <div id="table-chart">
      <SpaceBetweenContainer>
        <Heading level={2}>{translations[language].room}</Heading>
        <div style={{ marginBottom: '2rem' }}>
          <Button onClick={() => exportToPDF("table-chart")}>
            {translations[language].exportToPDF}
          </Button>
        </div>
      </SpaceBetweenContainer>
      <RoomDisplay />
    </div>
  );
};

export default TableChart;
