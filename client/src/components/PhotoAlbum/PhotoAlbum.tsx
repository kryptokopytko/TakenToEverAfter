import { Heading } from "../../styles/typography";
import dancing1 from "/pictures/dancing1.png";
import flowers from "/pictures/flowers.png";
import car from "/pictures/car.png";
import Button, { ButtonContainer } from "../Button";
import { Container, PhotosContainer, StyledImage, HeadingContainer } from './PhotoAlbumStyles'
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
