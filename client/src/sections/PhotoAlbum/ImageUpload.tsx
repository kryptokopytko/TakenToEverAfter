import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Subtitle } from "../../styles/typography";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImagePreview = styled.img`
  width: 100%;
  border-radius: 0.5rem;
  object-fit: contain;
  max-height: 300px;
`;

const UploadBox = styled.div<{ isDragging: boolean }>`
  border: 2px dashed ${(props) => (props.isDragging ? "#444" : "#888")};
  background-color: ${(props) => (props.isDragging ? "#f9f9f9" : "transparent")};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  margin-bottom: 1rem;
  cursor: pointer;
  text-align: center;

  &:hover {
    border-color: #444;
  }
`;

const UploadHint = styled.p`
  font-size: 1rem;
  color: #555;
  margin: 1rem;
`;

interface ImageUploadProps {
    onImageUpload: (imageUrl: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
    const [image, setImage] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const uploadRef = useRef<HTMLDivElement>(null);

    const handlePaste = (e: ClipboardEvent) => {
        if (e.clipboardData?.files.length) {
            const file = e.clipboardData.files[0];
            processImage(file);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files.length) {
            const file = e.dataTransfer.files[0];
            processImage(file);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleUploadClick = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = (event: Event) => {
            const file = (event.target as HTMLInputElement)?.files?.[0];
            if (file) {
                processImage(file);
            }
        };
        input.click();
    };

    const processImage = (file: File) => {
        if (!file.type.startsWith("image/")) {
            alert("Please upload a valid image file.");
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.result && typeof reader.result === "string") {
                setImage(reader.result);
                onImageUpload(reader.result); 
            }
        };
        reader.onerror = () => {
            alert("Failed to load image. Please try again.");
        };
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        const ref = uploadRef.current;
        if (ref) {
            ref.addEventListener("paste", handlePaste as EventListener);
        }
        return () => {
            if (ref) {
                ref.removeEventListener("paste", handlePaste as EventListener);
            }
        };
    });

    return (
        <Container>
            <Subtitle level={3}>Upload Photo</Subtitle>
            {image ? (
                <ImagePreview src={image} alt="Uploaded" />
            ) : (
                <UploadBox
                    ref={uploadRef}
                    tabIndex={0}
                    isDragging={isDragging}
                    onClick={handleUploadClick}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                >
                    <UploadHint>
                        Drag & drop your image here, click to select, or paste (Ctrl+V)
                    </UploadHint>
                </UploadBox>
            )}
        </Container>
    );
};

export default ImageUpload;
