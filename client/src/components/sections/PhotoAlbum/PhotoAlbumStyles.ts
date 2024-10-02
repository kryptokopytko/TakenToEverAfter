import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PhotosContainer = styled.div`
  display: flex;
  gap: 3rem;
  overflow: auto;
  width: calc(100vw - 6rem);
  position: absolute;
  left: 0;
  padding: 0 3rem;
`;

export const StyledImage = styled.img`
  max-width: 60vw;
  max-height: 60vh;
  height: auto;
  margin: 1rem 0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
  padding: 1rem;
  background-color: #fff;
  &:hover {
    z-index: 1;
    transform: scale(1.05);
  }
`;
