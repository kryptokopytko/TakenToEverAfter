import styled from "styled-components";
import { Heading } from "../../../styles/typography";
import tables from '/pictures/tables.png';
import Button, { ButtonContainer } from "../../Button";
import { exportToPDF } from "./exportToPdf";

const Container = styled.div`
    padding: 2rem 0;
    text-align: center;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;
const PhotoContainer = styled.div`
  width: 70vw;
  max-width: 40rem;
  background-color: ${({ theme }) => theme.primary};
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
  transition: transform 0.2s; 
  border-radius: 0.5rem;

  &:hover {
    z-index: 1;
    transform: scale(1.05); 
  }
`;
const StyledImage = styled.img`
  width: 60vw; 
  height: auto; 
  margin: 1rem 0; 
  max-width: 90%;

`;

const Printables = () => {

  return (
    <Container>
      <Heading level={2}>Print</Heading>
      <PhotoContainer>
        <StyledImage src={tables} alt='table chart image' />
      </PhotoContainer>
      <ButtonContainer>
        <Button>Manage Prints</Button>
        <Button onClick={() => exportToPDF("budget")}>Download PDF of Budget</Button>
        <Button onClick={() => exportToPDF("todo-list")}>Download PDF of To Do List</Button>
        <Button onClick={() => exportToPDF("guest-list")}>Download PDF of Guest List</Button>

      </ButtonContainer>
    </Container>
  );
};


export default Printables;
