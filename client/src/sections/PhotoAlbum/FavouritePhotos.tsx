import { Heading } from "../../styles/typography";
import Button, { ButtonContainer } from "../../components/Button";
import { Container, PhotosContainer, StyledImage } from './FavouritePhotosStyles';
import { exampleImages } from "../../dummyData";
import React from 'react';

interface FavouritePhotosProps {
  isHomePage?: boolean;
}

const FavouritePhotos: React.FC<FavouritePhotosProps> = ({ isHomePage }) => {

  const favoritePhotos = exampleImages.filter(image => image.isFavorite);

  return (
    <Container>
      <Heading level={1}>Favourite Photos</Heading>
      <div style={{ height: '60vh', marginBottom: '3rem' }}>
        <PhotosContainer>
          {favoritePhotos.map(image => (
            <StyledImage key={image.id} src={image.link} alt={image.name} />
          ))}
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

export default FavouritePhotos;
