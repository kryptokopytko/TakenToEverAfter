import React, { useState } from "react";
import { Body, Heading } from "../../../styles/typography";
import Button from "../../../components/ui/Button";
import { Slider, Container } from "./HslColorPickerStyles";
import Input from "../../../components/ui/Input";


const hexToHSL = (hex: string) => {

  hex = hex.replace(/^#/, '');
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return {
    hue: Math.round(h * 360),
    saturation: Math.round(s * 100),
    lightness: Math.round(l * 100)
  };
};


const parseHSL = (hslString: string) => {
  const hslRegex = /hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/;
  const match = hslString.match(hslRegex);

  if (match) {
    return {
      hue: parseInt(match[1], 10),
      saturation: parseInt(match[2], 10),
      lightness: parseInt(match[3], 10)
    };
  }
  return null;
};

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
  const [inputColor, setInputColor] = useState('');

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

  const handleInputColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputColor(value);


    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      const hsl = hexToHSL(value);
      setColor(hsl);
    }

    else if (/^hsl\(\d+,\s*\d+%,\s*\d+%\)$/.test(value)) {
      const hsl = parseHSL(value);
      if (hsl) {
        setColor(hsl);
      }
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

      <div style={{ marginTop: '1.5rem' }}>
        <Input
          value={inputColor}
          placeholder="Paste color (hex or HSL)"
          onChange={handleInputColorChange}
        />
      </div>

      <Button onClick={handleCopyColor} hslColor={hslColor}>Copy color</Button>
    </Container>
  );
};

export default HslColorPicker;
