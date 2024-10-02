import styled from "styled-components";
import { Heading } from "../../styles/typography";
import tables from '/pictures/tables.png';
import Button, { ButtonContainer } from "../Button";
import { SpaceBetweenContainer } from "../../styles/section";

const Container = styled.div`
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
interface TableChartProps {
  manageSectionButton?: boolean;
}

const TableChart: React.FC<TableChartProps> = ({ manageSectionButton }) => {

  return (
    <Container>
      <Heading level={2}>Table Chart</Heading>
      <PhotoContainer>
        <StyledImage src={tables} alt='table chart image' />
      </PhotoContainer>
      {manageSectionButton ?
        <Button>Manage Table Chart</Button> : <></>}
    </Container>
  );
};


export default TableChart;