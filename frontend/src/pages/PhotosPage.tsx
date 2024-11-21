import { Heading, Subtitle } from "../styles/typography";
import { Container, MenuContainer } from "../styles/page";
import FavouritePhotos from "../sections/PhotoAlbum/FavouritePhotos";
import PhotoAlbum from "../sections/PhotoAlbum/PhotoAlbum";
import { exampleImages } from "../dummyData";
import { useState } from "react";
import Button, { ButtonContainer } from "../components/ui/Button";
import { SpaceBetweenContainer } from "../styles/section";
import Input from "../components/ui/Input";
import { addPhotoToApi } from "../dummyDBApi";
import Checkbox from "../components/ui/Checkbox";


interface PhotosPageProps { }

const PhotosPage: React.FC<PhotosPageProps> = () => {
    const [areApprovedExpanded, setAreApprovedExpanded] = useState(true);
    const [arePendingExpanded, setArePendingExpanded] = useState(true);
    const [photoName, setPhotoName] = useState('');
    const [photoAuthor, setPhotoAuthor] = useState('');
    const [photoLink, setPhotoLink] = useState('');
    const [isVertical, setIsVertical] = useState(false);
    const [photos, setPhotos] = useState(exampleImages);

    const handleAddPhoto = () => {
        const newImage = {
            name: photoName,
            author: photoAuthor,
            link: photoLink,
            isApproved: false,
            isFavorite: false,
            isVertical: isVertical,
            id: Math.round(Math.random() * 10000000)
        };
        setPhotos((prevPhotos) => [...prevPhotos, newImage]);
        addPhotoToApi(newImage);
        setPhotoName('');
        setPhotoAuthor('');
        setPhotoLink('');
        setIsVertical(false);
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

    const approvedImages = photos.filter(image => image.isApproved);
    const pendingImages = photos.filter(image => !image.isApproved);

    return (
        <Container color='light'>
            <MenuContainer>
                <Heading level={2}>Photo</Heading>
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
                <Subtitle level={3}>Photo Link</Subtitle>
                <div style={{ marginBottom: '1.5rem' }}>
                    <Input
                        value={photoLink}
                        onChange={(e) => setPhotoLink(e.target.value)}
                        placeholder="Enter photo URL"
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
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
                    <Button onClick={() => setAreApprovedExpanded(!areApprovedExpanded)}> {areApprovedExpanded ? "Collapse List" : "Expand List"}</Button>
                </SpaceBetweenContainer>
                <PhotoAlbum
                    images={approvedImages}
                    isExpanded={areApprovedExpanded}
                    handleApproveChange={handleApproveChange}
                    handleDeletePhoto={handleDeletePhoto}
                />
                <SpaceBetweenContainer>
                    <Subtitle level={1}>Pending Photos</Subtitle>
                    <Button onClick={() => setArePendingExpanded(!arePendingExpanded)}> {arePendingExpanded ? "Collapse List" : "Expand List"}</Button>
                </SpaceBetweenContainer>
                <PhotoAlbum
                    images={pendingImages}
                    isExpanded={arePendingExpanded}
                    handleApproveChange={handleApproveChange}
                    handleDeletePhoto={handleDeletePhoto}
                />
            </div>
        </Container >
    );
};

export default PhotosPage;
