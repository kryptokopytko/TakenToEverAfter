import { Body, Heading, Subtitle } from "../styles/typography";
import { Container, MenuContainer } from "../styles/page";
import FavouritePhotos from "../sections/PhotoAlbum/FavouritePhotos";
import PhotoAlbum from "../sections/PhotoAlbum/PhotoAlbum";
import { useEffect, useState } from "react";
import Button, { ButtonContainer } from "../components/ui/Button";
import { SpaceBetweenContainer } from "../styles/section";
import Input from "../components/ui/Input";
import useFunctionsProxy from "../API/FunctionHandler";
import Checkbox from "../components/ui/Checkbox";
import ImgurUploader from "../sections/PhotoAlbum/ImgurUploader";
import { translations } from "../translations";
import { useUser } from "../providers/UserContext";
import { generateQRCode } from "../QRCodeGenerator";

const PhotosPage: React.FC = () => {
    const [areApprovedExpanded, setAreApprovedExpanded] = useState(true);
    const [arePendingExpanded, setArePendingExpanded] = useState(true);
    const [photoName, setPhotoName] = useState("");
    const [photoAuthor, setPhotoAuthor] = useState("");
    const [isVertical, setIsVertical] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const FunctionsProxy = useFunctionsProxy();
    const { language, photos, setPhotos, accountDetails } = useUser();
    const [QRCode, setQRCode] = useState<string | null>(null);

    const networkAddress = __NETWORK_ADDRESS__;
    const port = window.location.port;
    const guestPhotosUploadLink = `http://${networkAddress}:${port}/guest_photos/${accountDetails.photoAlbumUrl}`;

    useEffect(() => {
        const gen = async () => {
            const code = await generateQRCode(guestPhotosUploadLink);
            setQRCode(code);
        };

        gen();
    }, [accountDetails]);

    const handleAddPhoto = async () => {
        try {
            if (!photoName.trim() || !imageUrl) {
                alert(translations[language].alertProvidePhotoDetails);
                return;
            }

            const newImage = {
                name: photoName,
                author: photoAuthor,
                link: imageUrl,
                isApproved: false,
                isFavorite: false,
                isVertical: isVertical,
                id: Math.round(Math.random() * 10000000),
            };

            setPhotos([...photos, newImage]);
            FunctionsProxy.addPhoto(newImage);

            setPhotoName("");
            setPhotoAuthor("");
            setIsVertical(false);
            setImageUrl(null);

            alert(translations[language].alertPhotoUploadSuccess.replace("{url}", imageUrl));
        } catch (error) {
            const errorMessage = (error as Error).message || "?";
            alert(translations[language].alertPhotoUploadFail.replace("{error}", errorMessage));
        }
    };

    const handleApproveChange = (id: number, isApproved: boolean) => {
        setPhotos(
            photos.map((photo) =>
                photo.id === id ? { ...photo, isApproved } : photo
            )
        );
    };

    const handleDeletePhoto = (id: number) => {
        setPhotos(photos.filter((photo) => photo.id !== id));
    };

    const approvedImages = photos.filter((image) => image.isApproved);
    const pendingImages = photos.filter((image) => !image.isApproved);

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
                {QRCode &&
                    <div style={{ marginTop: '2rem' }}>
                        <Heading level={4}>{translations[language].photoQR}</Heading>
                        <img src={QRCode} alt="QR Code" style={{ maxWidth: "100%", height: "auto" }} />
                        <a href={guestPhotosUploadLink}>
                            <Body>
                                {guestPhotosUploadLink}
                            </Body>
                        </a>
                    </div>
                }
            </MenuContainer>

            <div>
                <FavouritePhotos />
                <SpaceBetweenContainer>
                    <Subtitle level={1}>{translations[language].approvedPhotos}</Subtitle>
                    <Button onClick={() => setAreApprovedExpanded(!areApprovedExpanded)}>
                        {areApprovedExpanded ? translations[language].hide : translations[language].show}
                    </Button>
                </SpaceBetweenContainer>
                {areApprovedExpanded && (
                    <PhotoAlbum
                        images={approvedImages}
                        isExpanded={areApprovedExpanded}
                        handleApproveChange={handleApproveChange}
                        handleDeletePhoto={handleDeletePhoto}
                        isGuest={false}
                    />
                )}

                <SpaceBetweenContainer>
                    <Subtitle level={1}>{translations[language].pendingPhotos}</Subtitle>
                    <Button onClick={() => setArePendingExpanded(!arePendingExpanded)}>
                        {arePendingExpanded ? translations[language].hide : translations[language].show}
                    </Button>
                </SpaceBetweenContainer>
                {arePendingExpanded && (
                    <PhotoAlbum
                        images={pendingImages}
                        isExpanded={arePendingExpanded}
                        handleApproveChange={handleApproveChange}
                        handleDeletePhoto={handleDeletePhoto}
                        isGuest={false}
                    />
                )}
            </div>
        </Container>
    );
};

export default PhotosPage;
