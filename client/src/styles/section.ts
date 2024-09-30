import styled from "styled-components";

export const SpaceBetweenContainer = styled.div<{ border?: boolean }>`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid
    ${({ theme, border }) => (border ? theme.secondary : "transparent")};
  padding: 0 1rem;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const GridContainer = styled.div<{
  isExpanded: boolean;
  minWidth?: string;
  minHeight?: string;
}>`
  position: relative;
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(${({ minWidth = "20rem" }) => minWidth}, 1fr)
  );
  gap: 3rem;
  max-height: ${({ isExpanded, minHeight }) =>
    isExpanded ? "auto" : minHeight ? minHeight : "40vh"};
  overflow-y: auto;
  transition: height 0.3s ease;
  background: ${({ isExpanded }) =>
    isExpanded
      ? "transparent"
      : "linear-gradient(to bottom, transparent 90%, rgba(0, 0, 0, 0.1))"};
  width: 100%;
`;

export const Card = styled.div<{ color: string; centered?: string }>`
  background-color: ${({ theme, color }) => theme[color]};
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.secondary};
  box-shadow: 0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: ${({ centered }) => centered};
`;
