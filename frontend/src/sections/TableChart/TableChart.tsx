import React from "react";
import RoomDisplay from "./RoomDisplay";
import { Heading } from "../../styles/typography";
import Button from "../../components/ui/Button";
import { exportToPDF } from "../Printables/exportToPdf";
import { SpaceBetweenContainer } from "../../styles/section";
import { translations } from "../../translations";
import { useUser } from "../../providers/UserContext";
import { ButtonsContainer } from "../../components/layout/Navbar/NavbarStyles";
import { Link } from "react-router-dom";

interface TableChartProps {
  isHomePage?: boolean;
}

const TableChart: React.FC<TableChartProps> = ({ isHomePage }) => {
  const { language } = useUser();

  return (
    <div id="table-chart">
      <SpaceBetweenContainer>
        <Heading level={2}>{translations[language].room}</Heading>
        <div style={{ marginBottom: '2rem' }}>

          <ButtonsContainer>
            <Button>{translations[language].assignPeopleToTable}</Button>
            <Button onClick={() => exportToPDF("table-chart")}>
              {translations[language].exportToPDF}
            </Button>
            {!isHomePage ||
              <Link to="table_chart">
                <Button>{translations[language].manageTables}</Button>
              </Link>
            }
          </ButtonsContainer>
        </div>
      </SpaceBetweenContainer>
      <RoomDisplay {...(isHomePage && { isHomePage })} />
    </div>
  );
};

export default TableChart;
