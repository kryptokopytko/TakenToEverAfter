import { Heading } from "../../styles/typography";
import Button, { ButtonContainer } from "../../components/ui/Button";
import { Container, PhotosContainer, StyledImage } from './FavouritePhotosStyles';
import React from 'react';
import { Link } from "react-router-dom";
import { useUser } from "../../providers/UserContext";
import { translations } from "../../translations";

interface FavouritePhotosProps {
  isHomePage?: boolean;
}

const FavouritePhotos: React.FC<FavouritePhotosProps> = ({ isHomePage }) => {
  const { language, photos } = useUser();
  const favoritePhotos = photos.filter(image => image.isFavorite);

  return (
    <Container>
      <Heading level={1}>{translations[language].favouritePhotos}</Heading>
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
            <Button>{translations[language].managePhotos}</Button></Link>
        </ButtonContainer>
        : <></>}
    </Container>
  );
};

export default FavouritePhotos;
