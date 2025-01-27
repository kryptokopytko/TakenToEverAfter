import React, { useState } from 'react';
import ImageUpload from './ImageUpload';

interface ImgurUploaderProps {
    onImageUpload: (imageUrl: string) => void;
}

const ImgurUploader: React.FC<ImgurUploaderProps> = ({ onImageUpload }) => {
    const [uploading, setUploading] = useState(false);
    const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const imgurAuthorization = import.meta.env.VITE_IMGUR_AUTHORIZATION;

    const uploadToImgur = async (imageBase64: string) => {
        setUploading(true);
        setError(null);
        setUploadedUrl(null);

        try {
            const base64Image = imageBase64.split(',')[1];

            const response = await fetch('https://api.imgur.com/3/image', {
                method: 'POST',
                headers: {
                    'Authorization': imgurAuthorization,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image: base64Image,
                    type: 'base64',
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.data.error || 'Failed to upload image');
            }

            setUploadedUrl(data.data.link);
            onImageUpload(data.data.link);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const handleImageUpload = (imageUrl: string) => {
        uploadToImgur(imageUrl);
    };

    return (
        <>
            <ImageUpload onImageUpload={handleImageUpload} />

            {uploading && 'Uploading image to Imgur...'}

            {error && `Error: ${error}`}

            {uploadedUrl && <>{uploadedUrl}</>}
        </>
    );
};

export default ImgurUploader;
