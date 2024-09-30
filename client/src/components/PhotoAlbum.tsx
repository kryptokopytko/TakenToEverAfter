import styled from "styled-components";
import { Heading } from "../themes/typography";
import dancing1 from "/pictures/dancing1.png";
import flowers from "/pictures/flowers.png";
import car from "/pictures/car.png";
import Button, { ButtonContainer } from "./Button";


const Container = styled.div`
width: 100vw;
  display: flex;
  flex-direction: column;
`;

const HeadingContainer = styled.div`
padding: 0 3rem;
`;


const PhotosContainer = styled.div`
  padding: 0 2rem;
  display: flex;
  gap: 3rem;
  overflow: auto;
`;



const StyledImage = styled.img`
  max-width: 60vw; 
  max-height: 60vh;
  height: auto; 
  margin: 1rem 0; 
  border-radius: 8px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
  transition: transform 0.2s; 
padding: 1rem;
background-color: #fff;
  &:hover {
    z-index: 1;
    transform: scale(1.05); 
  }
`;

const PhotoAlbum = () => {
  return (
    <Container>
      <HeadingContainer>
        <Heading level={1}>Photos</Heading>
      </HeadingContainer>
      <PhotosContainer>
        <StyledImage src={dancing1} alt="Dancing 1" />
        <StyledImage src={flowers} alt="Dancing 2" />
        <StyledImage src={car} alt="Car" />
      </PhotosContainer>
      <ButtonContainer>
        <Button>Add Yours</Button>
        <Button>Manage Photos</Button>
      </ButtonContainer>
    </Container>
  );
};

export default PhotoAlbum;
