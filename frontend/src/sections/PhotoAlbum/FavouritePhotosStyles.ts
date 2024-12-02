import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  margin: 0 -3rem;
  width: calc(100% + 6rem);
`;

export const PhotosContainer = styled.div`
  display: flex;
  gap: 3rem;
  overflow: auto;
  width: calc(100% - 6rem);
  position: absolute;
  left: 0;
  padding: 0 3rem;
`;

export const StyledImage = styled.img`
  max-height: 50vh;
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
