import React from "react";
import styled from "styled-components";
import { Body, Heading } from "../themes/typography"; 
import { Card } from "../themes/section"; 
import Button from "./Button"; 
import { useTheme } from "../providers/ThemeContext";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

const ColorRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const ColorBox = styled.div<{ color: string }>`
  width: 3.5rem;
  height: 3.5rem;
  background-color: ${(props) => props.color};
`;

interface ColorVariationProps {
  title: string;
  variations: { hsl: string; label: string }[]; 
  hslBodyColor: string; 
  hue: number;
  saturation: number;
  lightness: number;
}

function makeTheme(variations: { hsl: string; label: string }[], hslBodyColor: string, hue: number, saturation: number, lightness: number) {
  return {
    primary: variations[4].hsl,
    light: variations[3].hsl,
    secondary: variations[2].hsl,
    dark: variations[1].hsl,
    tertiary: variations[0].hsl,
    body: hslBodyColor,
    hue: hue,
    saturation: saturation,
    lightness: lightness,
  };
}

const ColorVariation: React.FC<ColorVariationProps> = ({
  title, variations, hslBodyColor, hue, saturation, lightness
}) => {
  const { setTheme } = useTheme();

  return (
    <Card color="light">
      <Container>
        <Heading level={3}>{title}</Heading>
        <ColorRow>
          {variations.map((color, index) => (
            <div key={index}>
              <ColorBox color={color.hsl} /> {}
              <Body hslColor={hslBodyColor}>{color.label}</Body>{" "}
              {}
            </div>
          ))}
        </ColorRow>
        <Button onClick={() => { setTheme(makeTheme(variations, hslBodyColor, hue, saturation, lightness)); }}>Pick this one</Button> {}
      </Container>
    </Card>
  );
};

export default ColorVariation;
