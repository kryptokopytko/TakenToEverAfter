import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Image } from '../../types';
import { GridContainer } from '../../styles/section';
import { Body } from '../../styles/typography';
import { updateApprovedStatus, updateFavoriteStatus } from '../../dummyDBApi';

interface PhotoAlbumProps {
    images: Image[];
    isExpanded: boolean;
    handleApproveChange: (id: number, isApproved: boolean) => void;
    handleDeletePhoto: (id: number) => void;
    isGuest?: boolean;
}

const PhotoCard = styled.div`
    background-color: ${({ theme }) => theme.primary};
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    transition: transform 0.3s;
    cursor: pointer;
      max-width: 40rem;
    max-height: 50rem;
    width: auto;
    height: auto;
    display: block;
    margin: 0 auto;

    box-shadow: 0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.1);
    &:hover {
        transform: scale(1.05);
    }
`;

const PhotoImage = styled.img`
    width: 100%;
    object-fit: cover;
`;

const PhotoInfo = styled.div`
    text-align: center;
`;

const Container = styled.div`
    margin: 0 -3rem;
`;

const Indicator = styled.span<{ isChecked?: boolean, isLeft?: boolean }>`
    position: absolute;
    padding: 0.5rem;
    top: 8px;
    right: 8px;
    left: ${(props) => (props.isLeft ? '8px' : 'none')};
    height: 1.5rem;
    width: 1.5rem;
    text-align: center;
    color: ${({ theme, isChecked }) => (isChecked ? theme.tertiary : 'grey')};
    cursor: pointer;
    background-color: white;
    border-radius: 6rem;
    transition: transform 0.3s;
    &:hover {
         transform: scale(1.15);
    }
`;



const FullScreenModal = styled.div<{ visible: boolean }>`
    display: ${(props) => (props.visible ? 'flex' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
    justify-content: center;
    align-items: center;
    z-index: 999;
`;

const FullScreenImage = styled.img`
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
    cursor: pointer;
`;

const PhotoAlbum: React.FC<PhotoAlbumProps> = ({ images, isExpanded, handleApproveChange, handleDeletePhoto, isGuest }) => {
    const [localImages, setLocalImages] = useState<Image[]>(images.map((image) => ({ ...image })));
    const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);

    useEffect(() => {
        setLocalImages(images);
    }, [images]);

    const toggleFavorite = async (index: number): Promise<void> => {
        const updatedImages: Image[] = [...localImages];
        const image: Image = updatedImages[index];
        image.isFavorite = !image.isFavorite;
        setLocalImages(updatedImages);
        updateFavoriteStatus(image.id, image.isFavorite);
    };

    const toggleApproved = async (index: number): Promise<void> => {
        const updatedImages: Image[] = [...localImages];
        const image: Image = updatedImages[index];
        image.isApproved = !image.isApproved;
        setLocalImages(updatedImages);
        handleApproveChange(image.id, image.isApproved);
        updateApprovedStatus(image.id, image.isApproved);
    };

    const deletePhoto = (id: number) => {
        const updatedImages = localImages.filter(image => image.id !== id);
        setLocalImages(updatedImages);
        handleDeletePhoto(id);
    };

    const openFullScreen = (link: string) => {
        setFullScreenImage(link);
    };

    const closeFullScreen = () => {
        setFullScreenImage(null);
    };

    return (
        <Container>
            <GridContainer isExpanded={isExpanded} minWidth="15rem" padding="3rem">
                {localImages.sort((a, b) => Number(b.isVertical) - Number(a.isVertical)).map((image, index) => (
                    <PhotoCard key={image.id}>
                        <PhotoImage
                            src={image.link}
                            alt={image.name}
                            onClick={() => openFullScreen(image.link)}
                        />
                        <PhotoInfo>
                            <Body>{image.name}</Body>
                            <Body size="small">by {image.author}</Body>
                        </PhotoInfo>
                        {isGuest ? <></> : <>
                            <Indicator
                                isChecked={image.isApproved}
                                isLeft={true}
                                onClick={() => toggleApproved(index)}
                            >
                                {!image.isApproved ? '✔' : '✖'}
                            </Indicator>
                            <Indicator
                                isChecked={image.isFavorite}
                                onClick={() => { if (image.isApproved) toggleFavorite(index); else deletePhoto(image.id) }}
                            >
                                {image.isApproved ?
                                    image.isFavorite ? '⭐' : '☆' :
                                    '🗑️'}

                            </Indicator>
                        </>}
                    </PhotoCard>
                ))}
            </GridContainer>
            <FullScreenModal visible={!!fullScreenImage} onClick={closeFullScreen}>
                <FullScreenImage src={fullScreenImage || ''} onClick={closeFullScreen} />
            </FullScreenModal>
        </Container>
    );
};

export default PhotoAlbum;
