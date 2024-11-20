import React, { useState } from "react";
import { Heading, Subtitle } from "../styles/typography";
import { Container, MenuContainer } from "../styles/page";
import Button, { ButtonContainer } from "../components/Button";
import Input from "../components/Input";
import { SpaceBetweenContainer } from "../styles/section";
import { addPhotoToApi } from "../dummyDBApi"; 
import PhotoAlbum from "../sections/PhotoAlbum/PhotoAlbum";
import {
    CustomCheckboxLabel,
    CustomCheckboxWrapper,
    StyledCheckbox,
    HiddenCheckbox
} from './../styles/Checkbox';
import { exampleImages } from "../dummyData"; 

const GuestPhotosPage: React.FC = () => {
    const [photoName, setPhotoName] = useState('');
    const [photoLink, setPhotoLink] = useState('');
    const [isVertical, setIsVertical] = useState(false);
    const [photos, setPhotos] = useState(exampleImages);
    const [areApprovedExpanded, setAreApprovedExpanded] = useState(true);
    const [areYourExpanded, setareYourExpanded] = useState(true);
    const guestName = new URLSearchParams(location.search).get('guest');

    const handleAddPhoto = () => {
        const newPhoto = {
            id: Math.round(Math.random() * 10000000),
            name: photoName,
            author: guestName || '',
            link: photoLink,
            isApproved: false,
            isFavorite: false,
            isVertical: isVertical,
        };
        setPhotos((prevPhotos) => [...prevPhotos, newPhoto]);
        addPhotoToApi(newPhoto); 
        setPhotoName('');
        setPhotoLink('');
        setIsVertical(false);
        console.log(newPhoto)
    };

    const handleApproveChange = (id: number, isApproved: boolean) => {
        setPhotos((prevPhotos) =>
            prevPhotos.map((photo) =>
                photo.id === id ? { ...photo, isApproved } : photo
            )
        );
    };

    const handleDeletePhoto = (id: number) => {
        setPhotos((prevPhotos) => prevPhotos.filter(photo => photo.id !== id));
    };

    const approvedPhotos = photos.filter(photo => photo.isApproved);
    const yourPhotos = photos.filter(photo => photo.author === guestName);

    return (
        <Container color='light'>
            <MenuContainer>
                <Heading level={2}>Upload Photos</Heading>

                <Subtitle level={3}>Photo Name</Subtitle>
                <Input
                    value={photoName}
                    onChange={(e) => setPhotoName(e.target.value)}
                    placeholder="Enter photo name"
                />


                <Subtitle level={3}>Photo Link</Subtitle>
                <div style={{ marginBottom: '1.5rem' }}>
                    <Input
                        value={photoLink}
                        onChange={(e) => setPhotoLink(e.target.value)}
                        placeholder="Enter photo URL"
                    />
                </div>

                <CustomCheckboxWrapper>
                    <CustomCheckboxLabel>
                        <HiddenCheckbox
                            type="checkbox"
                            checked={isVertical}
                            onChange={(e) => setIsVertical(e.target.checked)}
                        />
                        <StyledCheckbox checked={isVertical}>
                            <svg viewBox="8 4 10 14" width="18" height="18">
                                <polyline points="4 6 10 17 22 3 11 12" />
                            </svg>
                        </StyledCheckbox>
                        Is the photo vertical?
                    </CustomCheckboxLabel>
                </CustomCheckboxWrapper>

                <ButtonContainer>
                    <Button onClick={handleAddPhoto}>Add Photo</Button>
                </ButtonContainer>
            </MenuContainer>

            <div>
                <SpaceBetweenContainer>
                    <Subtitle level={1}>Your Photos</Subtitle>
                    <Button onClick={() => setareYourExpanded(!areYourExpanded)}>
                        {areYourExpanded ? "Collapse List" : "Expand List"}
                    </Button>
                </SpaceBetweenContainer>
                <PhotoAlbum
                    isGuest={true}

                    images={yourPhotos}
                    isExpanded={areYourExpanded}
                    handleApproveChange={handleApproveChange}
                    handleDeletePhoto={handleDeletePhoto}
                />
                
                <SpaceBetweenContainer>
                    <Subtitle level={1}>Approved Photos</Subtitle>
                    <Button onClick={() => setAreApprovedExpanded(!areApprovedExpanded)}>
                        {areApprovedExpanded ? "Collapse List" : "Expand List"}
                    </Button>
                </SpaceBetweenContainer>
                <PhotoAlbum
                    isGuest={true}
                    images={approvedPhotos}
                    isExpanded={areApprovedExpanded}
                    handleApproveChange={handleApproveChange}
                    handleDeletePhoto={handleDeletePhoto}
                />

                

            </div>
        </Container>
    );
};

export default GuestPhotosPage;
