import React from 'react';
import ColorVariation from './ColorVariation';
import { Card } from '../../styles/card';
import { Body, Heading } from '../../styles/typography';

interface ColorCompositionsProps {
    color: { hue: number; saturation: number; lightness: number };
}

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

    const result = ranges.map(({ min, max }) => num >= min && num <= max ? num : getRandomFromRange(min, max));
    if (Math.random() > 0.5)
        [result[1], result[2]] = [result[2], result[1]];
    return result;
}

const generateLightnessVariations = (hue: number, saturation: number, lightnessArray: number[]) => {
    return lightnessArray.map((light) => ({
        hsl: `hsl(${hue}, ${saturation}%, ${light}%)`,
        label: `L: ${light}%`,
    }));
};

const ColorCompositions: React.FC<ColorCompositionsProps> = ({ color }) => {
    const { hue, saturation, lightness } = color;

    const lightVariations = generateLightnessVariations(hue, saturation, [30, 48, 70, 89, 98]);
    const randomVariations = generateLightnessVariations(hue, saturation, randomCompositionLightness(75));
    const darkVariations = generateLightnessVariations(hue, saturation, [20, 60, 44, 85, 95]);
    const contrastVariations = generateLightnessVariations(hue, saturation, [24, 34, 50, 85, 95]);

    const baseColorsForHueVariation = generateArithmeticProgression(hue - 30, 5, 15).map((hueVal, index) => (
        { hue: hueVal, saturation: saturation, lightness: [40, 50, 60, 90, 98][index] }
    ));

    const hueVariations = baseColorsForHueVariation.map((color) => ({
        hsl: `hsl(${color.hue}, ${color.saturation}%, ${color.lightness}%)`,
        label: `H: ${Math.round(Number(color.hue))}°`,
    }));

    const hslBodyColor = `hsl(${hue}, ${saturation}%, 5%)`;

    return (
        <>
            <ColorVariation title="Contrast Variation" variation={contrastVariations} hslBodyColor={hslBodyColor} hue={hue} saturation={saturation} lightness={lightness} />
            <ColorVariation title="Hue Variation" variation={hueVariations} hslBodyColor={hslBodyColor} hue={hue} saturation={saturation} lightness={lightness} />

            <ColorVariation title="Light Variation" variation={lightVariations} hslBodyColor={hslBodyColor} hue={hue} saturation={saturation} lightness={lightness} />
            <ColorVariation title="Dark Variation" variation={darkVariations} hslBodyColor={hslBodyColor} hue={hue} saturation={saturation} lightness={lightness} />
            <ColorVariation title="Random Variation" variation={randomVariations} hslBodyColor={hslBodyColor} hue={hue} saturation={saturation} lightness={lightness} />
            <Card color='primary'>
                <Heading level={3}>Suggestion</Heading>
                <Body size='bold'>Aim for a saturation between 30-75%</Body>
                <Body>Vibrant colors can be tiring for the eyes,<br /> while desaturated colors may appear dull</Body>
                <Body size='bold'>For greens use Contrast or Hue Variation</Body>
                <Body>The human eye is most sensitive to shades of green, use more contrasting combinations </Body>


            </Card>
        </>
    );
};

export default ColorCompositions;
