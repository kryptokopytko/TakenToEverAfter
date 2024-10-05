import React from "react";
import styled from "styled-components";
import { Body, Heading } from "../../styles/typography";
import { Card } from "../../styles/card";
import Button from "../../components/Button";
import { useTheme } from "../../providers/ThemeContext";
import { ColorBox, ColorRow } from "./ColorBox";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

interface ColorVariationProps {
  title: string;
  variation: { hsl: string; label: string }[];
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
  title, variation, hslBodyColor, hue, saturation, lightness
}) => {
  const { setTheme } = useTheme();

  return (
    <Card color="primary">
      <Container>
        <Heading level={3}>{title}</Heading>
        <ColorRow>
          {variation.map((color, index) => (
            <div key={index}>
              <ColorBox color={color.hsl} />
              <Body hslColor={hslBodyColor}>{color.label}</Body>{" "}
            </div>
          ))}
        </ColorRow>
        <Button onClick={() => { setTheme(makeTheme(variation, hslBodyColor, hue, saturation, lightness)); }}>Pick this one</Button>
      </Container>
    </Card>
  );
};

export default ColorVariation;
