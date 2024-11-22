import styled from "styled-components";

export const PhotoCard = styled.div`
  background-color: ${({ theme }) => theme.primary};
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  transition: transform 0.3s;
  cursor: pointer;
  max-width: 40rem;
  max-height: 50rem;
  width: auto;
  height: auto;
  display: block;
  margin: 0 auto;

  box-shadow: 0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.1);
  &:hover {
    transform: scale(1.05);
  }
`;

export const PhotoImage = styled.img`
  width: 100%;
  object-fit: cover;
`;

export const PhotoInfo = styled.div`
  text-align: center;
`;

export const Container = styled.div`
  margin: 0 -3rem;
`;

export const Indicator = styled.span<{ isChecked?: boolean; isLeft?: boolean }>`
  position: absolute;
  padding: 0.5rem;
  top: 8px;
  right: 8px;
  left: ${(props) => (props.isLeft ? "8px" : "none")};
  height: 1.5rem;
  width: 1.5rem;
  text-align: center;
  color: ${({ theme, isChecked }) => (isChecked ? theme.tertiary : "grey")};
  cursor: pointer;
  background-color: white;
  border-radius: 6rem;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.15);
  }
`;

export const FullScreenModal = styled.div<{ visible: boolean }>`
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

export const FullScreenImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  cursor: pointer;
`;
