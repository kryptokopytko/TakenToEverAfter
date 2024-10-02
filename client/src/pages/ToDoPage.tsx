import styled from "styled-components";
import { Heading } from "../styles/typography";
import ToDo from "../sections/ToDo/ToDo";

const Container = styled.div`

`;


interface ToDoPageProps {
}

const ToDoPage: React.FC<ToDoPageProps> = ({ }) => {

    return (
        <Container>
            <Heading level={1}>Stroniwo</Heading>
            <ToDo />
        </Container>
    );
};


export default ToDoPage;
