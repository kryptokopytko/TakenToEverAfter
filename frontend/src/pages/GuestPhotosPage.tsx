import { Heading, Subtitle } from "../styles/typography";
import { Container, MenuContainer } from "../styles/page";
import PhotoAlbum from "../sections/PhotoAlbum/PhotoAlbum";
import { useEffect, useState } from "react";
import Button, { ButtonContainer } from "../components/ui/Button";
import { SpaceBetweenContainer } from "../styles/section";
import Input from "../components/ui/Input";
import Checkbox from "../components/ui/Checkbox";
import ImgurUploader from "../sections/PhotoAlbum/ImgurUploader";
import { translations } from "../translations";
import { useUser } from "../providers/UserContext";
import { getPreferencesByAlbumUrl } from "../API/DbApi/preferences";
import { Image, Language, Theme } from "../types";
import { addPhotoByGuest, getPhotosByAlbumUrl } from "../API/DbApi/photos";
import { useTheme } from "../providers/ThemeContext";
import { useParams } from "react-router-dom";

const PhotosPage: React.FC = () => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [photoName, setPhotoName] = useState('');
    const [photoAuthor, setPhotoAuthor] = useState('');
    const [isVertical, setIsVertical] = useState(false);
    const [newPhotos, setNewPhotos] = useState<Image[]>([]);
    const [approvedPhotos, setApprovedPhotos] = useState<Image[]>([]);
    const [areApprovedExpanded, setAreApprovedExpanded] = useState(true);
    const { language, setLanguage, setGuestPageProps } = useUser();
    const { setTheme } = useTheme();
    const { uniqueUrl } = useParams();

    useEffect(() => {
        const getPreferences = async () => {
            if (uniqueUrl) {
                try {
                    const preferences = await getPreferencesByAlbumUrl(uniqueUrl);
                    setLanguage(preferences.language as Language);
                    setTheme(preferences.theme as Theme);
                    setGuestPageProps({
                        names: {bride: preferences.names.bride, groom: preferences.names.groom},
                        date: preferences.date
                    });

                } catch (error) {
                    console.error('Error fetching preferences:', error);
                }
            }
        };

        const getApprovedPhotos = async () => {
            if (uniqueUrl) {
                try {
                    const photos = await getPhotosByAlbumUrl(uniqueUrl);
                    setApprovedPhotos(photos);
                } catch (error) {
                    console.error('Error fetching photos:', error);
                }
            }
        };

        getPreferences();
        getApprovedPhotos();
    }, [uniqueUrl]);


    const handleAddPhoto = async () => {
        if (uniqueUrl) {
            const newPhoto: Image = {
                id: Math.round(Math.random() * 10000000),
                name: photoName,
                author: photoAuthor,
                link: imageUrl || '',
                isApproved: false,
                isFavorite: false,
                isVertical: isVertical,
            };
            setNewPhotos([...newPhotos, newPhoto]);
            await addPhotoByGuest(newPhoto, uniqueUrl);
            alert("Photo successfully added, waiting for approval from newlyweds. Link to the photo: " + imageUrl)
            setPhotoName('');
            setImageUrl(null);
            setIsVertical(false);
        }
    };



    return (
        <Container color="light">
            <MenuContainer>
                <Heading level={2}>{translations[language].photos}</Heading>
                <ImgurUploader onImageUpload={setImageUrl} />

                <Subtitle level={3}>{translations[language].photoName}</Subtitle>
                <Input
                    value={photoName}
                    onChange={(e) => setPhotoName(e.target.value)}
                    placeholder={translations[language].photoName}
                />
                <Subtitle level={3}>{translations[language].author}</Subtitle>
                <Input
                    value={photoAuthor}
                    onChange={(e) => setPhotoAuthor(e.target.value)}
                    placeholder={translations[language].authorPlaceholder}
                />

                <div style={{ display: "flex", justifyContent: "center", marginTop: '2rem' }}>
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
                    <Subtitle level={1}>{translations[language].approvedPhotos}</Subtitle>
                    <Button onClick={() => setAreApprovedExpanded(!areApprovedExpanded)}>
                        {areApprovedExpanded ? translations[language].hide : translations[language].show}
                    </Button>
                </SpaceBetweenContainer>
                {areApprovedExpanded && (
                    <PhotoAlbum
                        images={approvedPhotos}
                        isExpanded={areApprovedExpanded}
                        handleApproveChange={() => { }}
                        handleDeletePhoto={() => { }}
                        isGuest={true}
                    />
                )}

            </div>
        </Container>
    );
};

export default PhotosPage;
