import styled from "styled-components";
import { Heading } from "../styles/typography";
import TableChart from "../sections/TableChart";

const Container = styled.div`

`;


interface TableChartPageProps {
}

const TableChartPage: React.FC<TableChartPageProps> = ({ }) => {

    return (
        <Container>
            <Heading level={1}>Stroniwo</Heading>
            <TableChart />
        </Container>
    );
};


export default TableChartPage;
