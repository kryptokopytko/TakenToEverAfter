import styled from "styled-components";
import { Heading } from "../styles/typography";
import PhotoAlbum from "../sections/PhotoAlbum/PhotoAlbum";

const Container = styled.div`

`;


interface PhotosPageProps {
}

const PhotosPage: React.FC<PhotosPageProps> = ({ }) => {

    return (
        <Container>
            <Heading level={1}>Stroniwo</Heading>
            <PhotoAlbum />
        </Container>
    );
};


export default PhotosPage;
