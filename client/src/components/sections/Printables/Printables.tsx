import styled from "styled-components";
import { Heading } from "../../../styles/typography";
import tables from '/pictures/tables.png';
import Button, { ButtonContainer } from "../../Button";
import { exportToPDF } from "./exportToPdf";
import { SpaceBetweenContainer } from "../../../styles/section";

const Container = styled.div`
    text-align: center;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const PhotoContainer = styled.div`
    max-width: 35rem;

  background-color: ${({ theme }) => theme.primary};
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
  transition: transform 0.2s; 
  border-radius: 0.5rem;

  &:hover {
    z-index: 1;
    transform: scale(1.05); 
  }
  & > * {
    max-width: 90%;
  }
`;
interface PrintablesProps {
  manageSectionButton?: boolean;
}

const Printables: React.FC<PrintablesProps> = ({ manageSectionButton }) => {

  return (
    <>

      <SpaceBetweenContainer>
        <Heading level={2}>Prints</Heading>
        {manageSectionButton ?
          <Button>Manage Prints</Button> : <></>}
      </SpaceBetweenContainer>
      <Container>
        <PhotoContainer>
          <img src={tables} alt='table chart image' />
        </PhotoContainer>

        <ButtonContainer>
          <Button onClick={() => exportToPDF("budget")}>Download PDF of Budget</Button>
          <Button onClick={() => exportToPDF("todo-list")}>Download PDF of To Do List</Button>
          <Button onClick={() => exportToPDF("guest-list")}>Download PDF of Guest List</Button>

        </ButtonContainer>
      </Container>
    </>
  );
};


export default Printables;
