import styled from "styled-components";

export const Slider = styled.input.attrs({ type: "range" })`
  margin-left: 1rem;
  appearance: none;
  width: 200px;
  height: 6px;
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.body},
    ${({ theme }) => theme.secondary}
  );
  border-radius: 1rem;

  &::-webkit-slider-thumb {
    appearance: none;
  }

  &::-moz-range-thumb {
    appearance: none;
  }
`;
