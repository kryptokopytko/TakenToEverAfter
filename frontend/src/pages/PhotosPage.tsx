import { Heading, Subtitle } from "../styles/typography";
import { Container, MenuContainer } from "../styles/page";
import FavouritePhotos from "../sections/PhotoAlbum/FavouritePhotos";
import PhotoAlbum from "../sections/PhotoAlbum/PhotoAlbum";
import { exampleImages } from "../exampleData";
import { useState } from "react";
import Button, { ButtonContainer } from "../components/ui/Button";
import { SpaceBetweenContainer } from "../styles/section";
import Input from "../components/ui/Input";
import { addPhotoToApi } from "../DBApi";
import Checkbox from "../components/ui/Checkbox";
import ImgurUploader from "../sections/PhotoAlbum/ImgurUploader";

const PhotosPage: React.FC = () => {
    const [areApprovedExpanded, setAreApprovedExpanded] = useState(true);
    const [arePendingExpanded, setArePendingExpanded] = useState(true);
    const [photoName, setPhotoName] = useState("");
    const [photoAuthor, setPhotoAuthor] = useState("");
    const [isVertical, setIsVertical] = useState(false);
    const [photos, setPhotos] = useState(exampleImages);
    const [imageUrl, setImageUrl] = useState<string | null>(null); // Store the image URL

    const handleAddPhoto = async () => {
        try {
            if (!photoName.trim() || !imageUrl) {
                alert("Please provide a photo name and upload an image.");
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

            setPhotos((prevPhotos) => [...prevPhotos, newImage]);
            addPhotoToApi(newImage);

            setPhotoName("");
            setPhotoAuthor("");
            setIsVertical(false);
            setImageUrl(null);

            alert(`Photo uploaded successfully! You can view it here: ${imageUrl}`);
        } catch (error) {
            alert("Failed to upload image: " + error);
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
        setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo.id !== id));
    };

    const approvedImages = photos.filter((image) => image.isApproved);
    const pendingImages = photos.filter((image) => !image.isApproved);

    return (
        <Container color="light">
            <MenuContainer>
                <Heading level={2}>Photos</Heading>
                <ImgurUploader onImageUpload={setImageUrl} /> {/* Pass function to handle image URL */}

                <Subtitle level={3}>Photo Name</Subtitle>
                <Input
                    value={photoName}
                    onChange={(e) => setPhotoName(e.target.value)}
                    placeholder="Enter photo name"
                />
                <Subtitle level={3}>Author (optional)</Subtitle>
                <Input
                    value={photoAuthor}
                    onChange={(e) => setPhotoAuthor(e.target.value)}
                    placeholder="Enter author name"
                />

                <div style={{ display: "flex", justifyContent: "center", marginTop: '2rem' }}>
                    <Checkbox
                        checked={isVertical}
                        onChange={() => setIsVertical(!isVertical)}
                    />
                    Is vertical?
                </div>
                <ButtonContainer>
                    <Button onClick={handleAddPhoto}>Add Photo</Button>
                </ButtonContainer>
            </MenuContainer>

            <div>
                <FavouritePhotos />
                <SpaceBetweenContainer>
                    <Subtitle level={1}>Approved Photos</Subtitle>
                    <Button onClick={() => setAreApprovedExpanded(!areApprovedExpanded)}>
                        {areApprovedExpanded ? "Hide" : "Show"}
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
                    <Subtitle level={1}>Pending Photos</Subtitle>
                    <Button onClick={() => setArePendingExpanded(!arePendingExpanded)}>
                        {arePendingExpanded ? "Hide" : "Show"}
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
