import React, { useEffect, useState } from 'react';
import { Image } from '../../types';
import { GridContainer } from '../../styles/section';
import { Body } from '../../styles/typography';
import useFunctionsProxy from "../../API/FunctionHandler";
import { Container, Indicator, PhotoCard, PhotoImage, PhotoInfo } from './PhotoAlbumStyles';
import FullScreenModal from './FullScreenModal';

interface PhotoAlbumProps {
    images: Image[];
    isExpanded: boolean;
    handleApproveChange: (id: number, isApproved: boolean) => void;
    handleDeletePhoto: (id: number) => void;
    isGuest?: boolean;
}

const PhotoAlbum: React.FC<PhotoAlbumProps> = ({ images, isExpanded, handleApproveChange, handleDeletePhoto, isGuest }) => {
    const [localImages, setLocalImages] = useState<Image[]>(images.map((image) => ({ ...image })));
    const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);
    const FunctionsProxy = useFunctionsProxy();

    useEffect(() => {
        setLocalImages(images);
    }, [images]);

    const toggleFavorite = async (index: number): Promise<void> => {
        const updatedImages: Image[] = [...localImages];
        const image: Image = updatedImages[index];
        image.isFavorite = !image.isFavorite;
        setLocalImages(updatedImages);
        FunctionsProxy.updateFavourite(image.id, image.isFavorite);
    };

    const toggleApproved = async (index: number): Promise<void> => {
        const updatedImages: Image[] = [...localImages];
        const image: Image = updatedImages[index];
        image.isApproved = !image.isApproved;
        setLocalImages(updatedImages);
        handleApproveChange(image.id, image.isApproved);
        if (image.isApproved) {
            await FunctionsProxy.acceptPhoto(image.id);
        } else {
            await FunctionsProxy.discardPhoto(image.id);
        }
    };

    const deletePhoto = async (id: number) => {
        const updatedImages = localImages.filter(image => image.id !== id);
        setLocalImages(updatedImages);
        handleDeletePhoto(id);
        await FunctionsProxy.removePhoto(id);
    };

    const openFullScreen = (index: number) => {
        setCurrentImageIndex(index);
    };

    const closeFullScreen = () => {
        setCurrentImageIndex(null);
    };

    const showNextImage = () => {
        if (currentImageIndex !== null) {
            const nextIndex = (currentImageIndex + 1) % localImages.length;
            setCurrentImageIndex(nextIndex);
        }
    };

    const showPrevImage = () => {
        if (currentImageIndex !== null) {
            const prevIndex = (currentImageIndex - 1 + localImages.length) % localImages.length;
            setCurrentImageIndex(prevIndex);
        }
    };

    return (
        <Container>
            <GridContainer isExpanded={isExpanded} minWidth="15rem" padding="3rem">
                {localImages.sort((a, b) => Number(b.isVertical) - Number(a.isVertical)).map((image, index) => (
                    <PhotoCard key={image.id}>
                        <PhotoImage
                            src={image.link}
                            alt={image.name}
                            onClick={() => openFullScreen(index)}
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
            {currentImageIndex !== null && (
                <FullScreenModal
                    visible={currentImageIndex !== null}
                    imageSrc={localImages[currentImageIndex].link}
                    onClose={closeFullScreen}
                    onNext={showNextImage}
                    onPrev={showPrevImage}
                />
            )}
        </Container>
    );
};

export default PhotoAlbum;
