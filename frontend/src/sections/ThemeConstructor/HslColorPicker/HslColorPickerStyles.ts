import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

interface SliderProps {
  hue: number;
  saturation: number;
  lightness: number;
}

export const Slider = styled.input<SliderProps>`
  width: 100%;
  margin: 10px 0;
  appearance: none;
  height: 10px;
  border-radius: 5px;
  background: ${(props) => {
    const { hue, saturation, lightness } = props;

    if (saturation === -1) {
      return `linear-gradient(to right, hsl(${hue}, 0%, ${lightness}%), hsl(${hue}, 100%, ${lightness}%))`;
    }

    if (lightness === -1) {
      return `linear-gradient(to right, hsl(${hue}, ${saturation}%, 0%), hsl(${hue}, ${saturation}%, 50%), hsl(${hue}, ${saturation}%, 100%))`;
    }

    return `linear-gradient(to right, 
      hsl(0, ${saturation}%, ${lightness}%), 
      hsl(60, ${saturation}%, ${lightness}%), 
      hsl(120, ${saturation}%, ${lightness}%), 
      hsl(180, ${saturation}%, ${lightness}%), 
      hsl(240, ${saturation}%, ${lightness}%), 
      hsl(300, ${saturation}%, ${lightness}%), 
      hsl(360, ${saturation}%, ${lightness}%)
    )`;
  }};
  outline: none;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    background-color: ${({ theme }) => theme.white};
    border-radius: 50%;
    border: 2px solid ${({ theme }) => theme.body};
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background-color: ${({ theme }) => theme.white};
    border-radius: 50%;
    border: 2px solid ${({ theme }) => theme.body};
    cursor: pointer;
  }
`;
Slider.shouldForwardProp = (prop) => !["hue", "saturation", "lightness"].includes(prop);
