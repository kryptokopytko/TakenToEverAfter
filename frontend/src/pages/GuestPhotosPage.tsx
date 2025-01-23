import React, { useEffect, useState } from "react";
import { Heading, Subtitle } from "../styles/typography";
import { Container, MenuContainer } from "../styles/page";
import Button, { ButtonContainer } from "../components/ui/Button";
import Input from "../components/ui/Input";
import { SpaceBetweenContainer } from "../styles/section";
import PhotoAlbum from "../sections/PhotoAlbum/PhotoAlbum";
import Example from "../exampleData";
import Checkbox from "../components/ui/Checkbox";
import { translations } from "../translations";
import { useUser } from "../providers/UserContext";
import { useParams } from "react-router-dom";
import { useTheme } from "../providers/ThemeContext";
import { getPreferencesByAlbumUrl } from "../API/DbApi/preferences";
import { Language, Theme } from "../types";
import { addPhotoByGuest } from "../API/DbApi/photos";

const GuestPhotosPage: React.FC = () => {
    const [photoName, setPhotoName] = useState('');
    const [photoLink, setPhotoLink] = useState('');
    const [isVertical, setIsVertical] = useState(false);
    const [photos, setPhotos] = useState(Example.images);
    const [areApprovedExpanded, setAreApprovedExpanded] = useState(true);
    const [areYourExpanded, setareYourExpanded] = useState(true);
    const guestName = new URLSearchParams(location.search).get('guest');
    const { language, setLanguage } = useUser();
    const { setTheme } = useTheme();
    const { uniqueUrl } = useParams();


    useEffect(() => {
        const getPreferences = async () => {
            if (uniqueUrl) {
                try {
                    const preferences = await getPreferencesByAlbumUrl(uniqueUrl);
                    setLanguage(preferences.language as Language);
                    setTheme(preferences.theme as Theme);
                } catch (error) {
                    console.error('Error fetching preferences:', error);
                }
            }
        };
    
        getPreferences();
    }, [uniqueUrl]);

    const handleAddPhoto = async () => {
        if (uniqueUrl) {
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
            await addPhotoByGuest(newPhoto, uniqueUrl);
            setPhotoName('');
            setPhotoLink('');
            setIsVertical(false);
        }
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
                <Heading level={2}>{translations[language].uploadPhotos}</Heading>

                <Subtitle level={3}>{translations[language].photoName}</Subtitle>
                <Input
                    value={photoName}
                    onChange={(e) => setPhotoName(e.target.value)}
                    placeholder={translations[language].photoName}
                />


                <Subtitle level={3}>{translations[language].photoLink}</Subtitle>
                <div style={{ marginBottom: '1.5rem' }}>
                    <Input
                        value={photoLink}
                        onChange={(e) => setPhotoLink(e.target.value)}
                        placeholder={translations[language].photoLink}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Checkbox
                        checked={isVertical}
                        onChange={() => setIsVertical(!isVertical)}
                    />
                    {translations[language].isVertical}
                </div>
                <ButtonContainer>
                    <Button onClick={handleAddPhoto}>{translations[language].addPhoto}</Button>
                </ButtonContainer>
            </MenuContainer>

            <div>
                <SpaceBetweenContainer>
                    <Subtitle level={1}>{translations[language].yourPhotos}</Subtitle>
                    <Button onClick={() => setareYourExpanded(!areYourExpanded)}>
                        {areYourExpanded ? translations[language].collapseList : translations[language].expandList}
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
                    <Subtitle level={1}>{translations[language].approvedPhotos}</Subtitle>
                    <Button onClick={() => setAreApprovedExpanded(!areApprovedExpanded)}>
                        {areApprovedExpanded ? translations[language].collapseList : translations[language].expandList}
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
