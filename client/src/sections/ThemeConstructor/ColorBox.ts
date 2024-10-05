import styled from "styled-components";

export const ColorBox = styled.div<{ color: string }>`
  width: 3.5rem;
  height: 3.5rem;
  background-color: ${(props) => props.color};
`;

export const ColorRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
