import { Heading } from "../../styles/typography";
import dancing1 from "/pictures/dancing1.png";
import flowers from "/pictures/flowers.png";
import car from "/pictures/car.png";
import Button, { ButtonContainer } from "../../components/Button";
import { Container, PhotosContainer, StyledImage } from './PhotoAlbumStyles'

interface PhotoAlbumProps {
  isHomePage?: boolean;
}

const PhotoAlbum: React.FC<PhotoAlbumProps> = ({ isHomePage }) => {
  return (
    <Container>
      <Heading level={1}>Photos</Heading>
      <div style={{ height: '60vh' }}>
        <PhotosContainer>
          <StyledImage src={dancing1} alt="Dancing 1" />
          <StyledImage src={flowers} alt="Dancing 2" />
          <StyledImage src={car} alt="Car" />
        </PhotosContainer>
      </div>
      {isHomePage ?
        <ButtonContainer>
          <Button>Manage Photos</Button>
        </ButtonContainer>
        : <></>}
    </Container>
  );
};

export default PhotoAlbum;
