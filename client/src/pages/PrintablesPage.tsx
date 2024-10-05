import styled from "styled-components";
import { Heading } from "../styles/typography";
import Printables from "../sections/Printables/Printables";

const Container = styled.div`

`;


interface PrintablesPageProps {
}

const PrintablesPage: React.FC<PrintablesPageProps> = ({ }) => {

    return (
        <Container>
            <Heading level={1}>Stroniwo</Heading>
            <Printables />
        </Container>
    );
};


export default PrintablesPage;
