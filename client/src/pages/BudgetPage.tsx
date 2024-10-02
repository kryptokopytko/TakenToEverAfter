import styled from "styled-components";
import { Heading } from "../styles/typography";
import Budget from "../sections/Budget";

const Container = styled.div`

`;


interface BudgetPageProps {
}

const BudgetPage: React.FC<BudgetPageProps> = ({ }) => {

    return (
        <Container>
            <Heading level={1}>Stroniwo</Heading>
            <Budget />
        </Container>
    );
};


export default BudgetPage;
