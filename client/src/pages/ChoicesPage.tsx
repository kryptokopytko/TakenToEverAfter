import styled from "styled-components";
import { Heading } from "../styles/typography";
import Choices from "../sections/Choices";

const Container = styled.div`

`;


interface ChoicesPageProps {
}

const ChoicesPage: React.FC<ChoicesPageProps> = ({ }) => {

    return (
        <Container>
            <Heading level={1}>Stroniwo</Heading>
            <Choices />
        </Container>
    );
};


export default ChoicesPage;
