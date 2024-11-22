import styled from "styled-components";

export const Description = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.primary};
  border-radius: 0.5rem;
  border: 2px solid ${({ theme }) => theme.secondary};
  padding: 1rem;
  width: calc(100% - 1rem);
  min-height: 4rem;
  z-index: 10;
  top: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;
  opacity: inherit;
  transform: translateY(70%);
`;

export const DescriptionContainer = styled.div<{
  move?: number;
  rmove?: number;
}>`
  position: absolute;
  top: -1rem;
  min-height: 4rem;
  width: calc(100% - ${({ move, rmove }) => (move ? -move : rmove ? 9 : 0)}rem);

  left: ${({ move }) => (move ? `calc(-0.5rem - ${move}rem)` : "-0.5rem")};
  right: ${({ rmove }) => (rmove ? `calc(-0.5rem - ${rmove}rem)` : "-0.5rem")};
  opacity: 0;

  &:hover {
    opacity: 100%;
  }
`;
