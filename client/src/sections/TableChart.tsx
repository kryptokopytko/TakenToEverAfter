import styled from "styled-components";
import { Heading } from "../styles/typography";
import tables from '/pictures/tables.png';
import Button from "../components/Button";

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
  background-color: #fff;

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
  isHomePage?: boolean;
}

const TableChart: React.FC<TableChartProps> = ({ isHomePage }) => {

  return (
    <Container>
      <Heading level={2}>Table Chart</Heading>
      <PhotoContainer>
        <StyledImage src={tables} alt='table chart image' />
      </PhotoContainer>
      {isHomePage ?
        <Button>Manage Table Chart</Button> : <></>}
    </Container>
  );
};


export default TableChart;
