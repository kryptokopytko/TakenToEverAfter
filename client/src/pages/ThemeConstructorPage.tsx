import styled from "styled-components";
import { Heading } from "../styles/typography";
import ThemeConstructor from "../sections/ThemeConstructor/ThemeConstructor";

const Container = styled.div`

`;


interface ThemeConstructorPageProps {
}

const ThemeConstructorPage: React.FC<ThemeConstructorPageProps> = ({ }) => {

    return (
        <Container>
            <Heading level={1}>Stroniwo</Heading>
            <ThemeConstructor />
        </Container>
    );
};


export default ThemeConstructorPage;
