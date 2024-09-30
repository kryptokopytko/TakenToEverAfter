import styled from "styled-components";

export const SpaceBetweenContainer = styled.div<{ border?: boolean }>`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid
    ${({ theme, border }) => (border ? theme.secondary : "transparent")};
  padding: 0 1rem;
  align-items: center;
`;

export const GridContainer = styled.div<{ isExpanded: boolean }>`
  position: relative; 
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 3rem;
  height: ${({ isExpanded }) =>
    isExpanded ? "auto" : "50vh"}; 
  overflow-y: auto; 
  transition: height 0.3s ease; 
  background: ${({ isExpanded }) =>
    isExpanded
      ? "transparent"
      : "linear-gradient(to bottom, transparent 90%, rgba(0, 0, 0, 0.1))"};
  width: 100%;
`;

export const Card = styled.div<{ color: string }>`
  background-color: ${({ theme, color }) => theme[color]};
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.secondary};
  box-shadow: 0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
`;
