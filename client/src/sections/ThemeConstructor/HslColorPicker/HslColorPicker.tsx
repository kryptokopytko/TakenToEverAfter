import React from "react";
import { Body, Heading } from "../../../styles/typography";
import Button from "../../../components/Button";
import { Slider, Container } from "./HslColorPickerStyles";

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

  const handleCopyColor = async () => {
    try {
      await navigator.clipboard.writeText(hslColor);
      alert(`Copied the color: ${hslColor}`);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

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
      <Button onClick={handleCopyColor} hslColor={hslColor}>Copy color</Button>
    </Container>
  );
};

export default HslColorPicker;
