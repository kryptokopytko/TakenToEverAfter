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
import useFunctionsProxy from "../../API/FunctionHandler";
import { useTable } from "../../providers/TableContext";
import { getTables } from "../../API/DbApi/seating";

interface TableChartProps {
  isHomePage?: boolean;
}

const TableChart: React.FC<TableChartProps> = ({ isHomePage }) => {
  const { language, isLogged } = useUser();
  const FunctionProxy = useFunctionsProxy();
  const { saveTableLayout, setRectangularTables, setRoundTables } = useTable();

  const handleAssigningPeople = async () => {
    await FunctionProxy.assignPeopleToTables();
    if (isLogged) {
      const { rectangularTables, circularTables } = await getTables();
      setRectangularTables(rectangularTables);
      setRoundTables(circularTables);
    }
  }

  return (
    <div id="table-chart">
      <SpaceBetweenContainer>
        <Heading level={2}>{translations[language].room}</Heading>
        <div style={{ marginBottom: '2rem' }}>

          <ButtonsContainer>
            <Button onClick={() => saveTableLayout()}>
              {translations[language].saveLayout}
            </Button>
            <Button onClick={() => handleAssigningPeople()}>
              {translations[language].assignPeopleToTable}
            </Button>
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
