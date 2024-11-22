import styled from "styled-components";

export const Description = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.primary};
  border-radius: 0.5rem;
  border: 2px solid ${({ theme }) => theme.secondary};
  transition: opacity 0.3s ease;
  padding: 1rem;
  top: 0;
  opacity: 0;
  z-index: 10;
  &:hover {
    opacity: 100%;
  }
`;
