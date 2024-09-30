import React from "react";
import styled from "styled-components";
import { Body, Heading } from "../themes/typography";
import Button from "./Button";

const Container = styled.div`
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

const Slider = styled.input<SliderProps>`
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



interface HslColorPickerProps {
  color: {
    hue: number;
    saturation: number;
    lightness: number;
  };
  setColor: (color: { hue: number; saturation: number; lightness: number }) => void;
}

const HslColorPicker: React.FC<HslColorPickerProps> = ({ color, setColor }) => {
  const { hue, saturation, lightness } = color;

  const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor({ ...color, hue: Number(e.target.value) });
  };

  const handleSaturationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor({ ...color, saturation: Number(e.target.value) });
  };

  const handleLightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor({ ...color, lightness: Number(e.target.value) });
  };

  const hslColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

  return (
    <Container>
      <Heading level={3}>Pick a color</Heading>

      <Body>Hue: {hue}</Body>
      <Slider
        type="range"
        min={0}
        max={360}
        value={hue}
        hue={hue}
        saturation={saturation}
        lightness={lightness}
        onChange={handleHueChange}
      />

      <Body>Saturation: {saturation === -1 ? "Dynamic" : `${saturation}%`}</Body>
      <Slider
        type="range"
        min={0}
        max={100}
        value={saturation}
        hue={hue}
        saturation={-1}
        lightness={lightness}
        onChange={handleSaturationChange}
      />

      <Body>Lightness: {lightness === -1 ? "Dynamic" : `${lightness}%`}</Body>
      <Slider
        type="range"
        min={0}
        max={100}
        value={lightness}
        hue={hue}
        saturation={saturation}
        lightness={-1}
        onChange={handleLightnessChange}
      />
      <Button hslColor={hslColor}>Copy color</Button>
    </Container>
  );
};

export default HslColorPicker;
