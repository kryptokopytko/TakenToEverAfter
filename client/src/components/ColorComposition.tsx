import React from 'react';
import ColorVariation from './ColorVariation';
import { Card } from '../themes/section';
import { Body, Heading } from '../themes/typography';

interface ColorCompositionProps {
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

    return ranges.map(({ min, max }) => {
        return num >= min && num <= max ? num : getRandomFromRange(min, max);
    });
}

const generateLightnessVariations = (hue: number, saturation: number, lightnessArray: number[]) => {
    return lightnessArray.map((light) => ({
        hsl: `hsl(${hue}, ${saturation}%, ${light}%)`,
        label: `L: ${light}%`,
    }));
};

const ColorComposition: React.FC<ColorCompositionProps> = ({ color }) => {
    const { hue, saturation, lightness } = color;

    const lightVariations = generateLightnessVariations(hue, saturation, [20, 38, 70, 89, 98]);
    const randomVariations = generateLightnessVariations(hue, saturation, randomCompositionLightness(75));
    const darkVariations = generateLightnessVariations(hue, saturation, [10, 34, 60, 85, 95]);

    const baseColorsForHueVariation = generateArithmeticProgression(hue - 30, 5, 15).map((hueVal) => (
        { hue: hueVal, saturation: saturation, lightness: lightness }
    ));

    const hueVariations = baseColorsForHueVariation.map((color) => ({
        hsl: `hsl(${color.hue}, ${color.saturation}%, ${color.lightness}%)`,
        label: `H: ${Math.round(Number(color.hue))}°`,
    }));

    const hslBodyColor = `hsl(${hue}, ${saturation}%, 5%)`;

    return (
        <>
            <ColorVariation title="Light Variation" variations={lightVariations} hslBodyColor={hslBodyColor} hue={hue} saturation={saturation} lightness={lightness} />
            <ColorVariation title="Dark Variation" variations={darkVariations} hslBodyColor={hslBodyColor} hue={hue} saturation={saturation} lightness={lightness} />
            <ColorVariation title="Random Variation" variations={randomVariations} hslBodyColor={hslBodyColor} hue={hue} saturation={saturation} lightness={lightness} />
            <ColorVariation title="Hue Variation" variations={hueVariations} hslBodyColor={hslBodyColor} hue={hue} saturation={saturation} lightness={lightness} />
            <Card color='light'>
                <Heading level={3}> Suggestions</Heading>
                <Body size='bold'>Stay between 30-75% saturation,</Body>
                <Body >vibrant colors tire eyes,<br /> desaturated ones are grey</Body>
                <Body size='bold'>Avoid hue variation</Body>
                <Body >for now</Body>

            </Card>
        </>
    );
};

export default ColorComposition;
