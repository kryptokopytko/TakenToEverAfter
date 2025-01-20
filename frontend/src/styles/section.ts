import styled from "styled-components";

export const margin = "3rem";

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
SpaceBetweenContainer.shouldForwardProp = (prop) => prop !== "border";

export const GridContainer = styled.div<{
  isExpanded: boolean;
  minWidth?: string;
  minHeight?: string;
  padding?: string;
}>`
  padding: ${({ padding }) => padding};
  position: relative;
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(${({ minWidth = "20rem" }) => minWidth}, 1fr)
  );
  gap: 3rem;
  margin: 2rem 0;
  width: ${({ padding }) => (padding ? `calc(100% - 2 * ${padding})` : "100%")};

  max-height: ${({ isExpanded, minHeight }) =>
    isExpanded ? "auto" : minHeight ? minHeight : "40vh"};
  overflow-y: auto;
  transition: max-height 0.3s ease;
  background: ${({ isExpanded }) =>
    isExpanded
      ? "transparent"
      : "linear-gradient(to bottom, transparent 90%, rgba(0, 0, 0, 0.1))"};

  > * {
    max-width: 100%;
    min-width: 0;
    overflow-wrap: break-word;
  }
`;
GridContainer.shouldForwardProp = (prop) => !["isExpanded", "minWidth", "minHeight", "padding"].includes(prop); 
