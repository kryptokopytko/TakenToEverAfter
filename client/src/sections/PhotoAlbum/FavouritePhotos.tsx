import { Heading } from "../../styles/typography";
import Button, { ButtonContainer } from "../../components/ui/Button";
import { Container, PhotosContainer, StyledImage } from './FavouritePhotosStyles';
import { exampleImages } from "../../dummyData";
import React from 'react';
import { Link } from "react-router-dom";

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
          <Link to="photo_album">
            <Button>Manage Photos</Button></Link>
        </ButtonContainer>
        : <></>}
    </Container>
  );
};

export default FavouritePhotos;
