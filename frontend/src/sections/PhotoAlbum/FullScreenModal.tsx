import React, { useEffect } from 'react';
import styled from 'styled-components';

interface FullScreenModalProps {
    visible: boolean;
    imageSrc: string | null;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
}

const FullScreenModalContainer = styled.div<{ visible: boolean }>`
    display: ${(props) => (props.visible ? "flex" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
    justify-content: center;
    align-items: center;
    z-index: 999;
`;
FullScreenModalContainer.shouldForwardProp = (prop) => !["visible"].includes(prop); 

const FullScreenImage = styled.img`
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
    cursor: pointer;
`;

const NavigationButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(255, 255, 255, 0.7);
    border: none;
    padding: 1rem;
    cursor: pointer;
    font-size: 1.5rem;
    border-radius: 50%;
    z-index: 1000;
    &:hover {
        background-color: white;
    }
`;

const PrevButton = styled(NavigationButton)`
    left: 2rem;
`;

const NextButton = styled(NavigationButton)`
    right: 2rem;
`;

const FullScreenModal: React.FC<FullScreenModalProps> = ({ visible, imageSrc, onClose, onNext, onPrev }) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowRight') {
                onNext();
            } else if (event.key === 'ArrowLeft') {
                onPrev();
            } else if (event.key === 'Escape') {
                onClose();
            }
        };

        if (visible) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [visible, onNext, onPrev, onClose]);

    return (
        <FullScreenModalContainer visible={visible} onClick={onClose}>
            {imageSrc && <FullScreenImage src={imageSrc} alt="Full screen view" />}
            <PrevButton onClick={(e) => { e.stopPropagation(); onPrev(); }}>❮</PrevButton>
            <NextButton onClick={(e) => { e.stopPropagation(); onNext(); }}>❯</NextButton>
        </FullScreenModalContainer>
    );
};

export default FullScreenModal;
