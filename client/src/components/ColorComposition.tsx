import React from 'react';
import styled from 'styled-components';
import { Body, Heading } from '../themes/typography';
import { Card } from '../themes/section';
import Button from './Button';

interface ColorCompositionProps {
    color: { hue: number; saturation: number; lightness: number };
}



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


function getRandomFromRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateArithmeticProgression(value: number, length: number, diff: number): number[] {
    return Array.from({ length }, (_, index) => value + index * diff);
}



function randomCompositionLightness(num: number) {
    const ranges = [
        { min: 20, max: 35 },
        { min: 43, max: 60 },
        { min: 70, max: 80 },
        { min: 89, max: 90 },
        { min: 97, max: 99 }
    ];

    return ranges.map(({ min, max }) => {
        return num >= min && num <= max ? num : getRandomFromRange(min, max);
    });
}

const ColorComposition: React.FC<ColorCompositionProps> = ({ color }) => {
    const { hue, saturation, lightness } = color;

    const lightVariations = [40, 65, 80, 93, 98].map((light) => ({
        hsl: `hsl(${hue}, ${saturation}%, ${light}%)`,
        label: `L: ${light}%`,
    }));

    const randomVariations = randomCompositionLightness(lightness).map((light) => ({
        hsl: `hsl(${hue}, ${saturation}%, ${light}%)`,
        label: `L: ${light}%`,
    }));

    const darkVariations = [20, 38, 70, 89, 98].map((light) => ({
        hsl: `hsl(${hue}, ${saturation}%, ${light}%)`,
        label: `L: ${light}%`,
    }));

    const baseColorsForHueVariation = generateArithmeticProgression(hue - 30, 5, 15).map((hueVal) => (
        { hue: hueVal, saturation: saturation, lightness: lightness }
    ));
    const lightColorsForHueVariation = baseColorsForHueVariation.map((color) => ({ hue: color.hue, saturation: color.saturation, lightness: color.lightness / 4 + 60 }))

    const hueVariations = baseColorsForHueVariation.map((color) => ({
        hsl: `hsl(${color.hue}, ${color.saturation}%, ${color.lightness}%)`,
        label: `${color.hue}`,
    }));

    const lighthueVariations = lightColorsForHueVariation.map((color) => ({
        hsl: `hsl(${color.hue}, ${color.saturation}%, ${color.lightness}%)`,
        label: `${color.hue}`,
    }));
    const hslBodyColor = `hsl(${hue}, ${saturation}%, 5%)`;
    return (
        <>
            <Card color='light'>
                <Container>
                    <Heading level={3}>Light Variation</Heading>
                    <ColorRow>
                        {lightVariations.map((color, index) => (
                            <div key={index}>
                                <ColorBox color={color.hsl} />
                                <Body hslColor={hslBodyColor}>{color.label}</Body>
                            </div>
                        ))}
                    </ColorRow>
                    <Button>Pick this one</Button>
                </Container>

            </Card>
            <Card color='light'>
                <Container>

                    <Heading level={3}>Dark Variation</Heading>
                    <ColorRow>
                        {darkVariations.map((color, index) => (
                            <div key={index}>
                                <ColorBox color={color.hsl} />
                                <Body hslColor={hslBodyColor}>{color.label}</Body>
                            </div>
                        ))}
                    </ColorRow>
                    <Button>Pick this one</Button>

                </Container>

            </Card>
            <Card color='light'>
                <Container>

                    <Heading level={3}>Random Variation</Heading>
                    <ColorRow>
                        {randomVariations.map((color, index) => (
                            <div key={index}>
                                <ColorBox color={color.hsl} />
                                <Body hslColor={hslBodyColor}>{color.label}</Body>
                            </div>
                        ))}
                    </ColorRow>
                    <Button>Pick this one</Button>
                </Container>

            </Card>
            <Card color='light'>
                <Container >

                    <Heading level={3}>Hue Variation</Heading>
                    <ColorRow>
                        {hueVariations.map((color, index) => (
                            <div key={index}>
                                <ColorBox color={color.hsl} />
                            </div>
                        ))}
                    </ColorRow>
                    <ColorRow>
                        {lighthueVariations.map((color, index) => (
                            <div key={index}>
                                <ColorBox color={color.hsl} />
                                <Body hslColor={hslBodyColor}>H: {Math.round(Number(color.label))}°</Body>
                            </div>
                        ))}
                    </ColorRow>
                    <Button>Pick this one</Button>

                </Container>

            </Card >
        </>
    );
};

export default ColorComposition;
