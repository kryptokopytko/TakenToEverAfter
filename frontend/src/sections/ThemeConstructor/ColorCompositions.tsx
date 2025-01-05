import React from 'react';
import ColorVariation from './ColorVariation';
import { Card } from '../../styles/card';
import { Body, Heading } from '../../styles/typography';
import { translations } from "../../translations";
import { useUser } from "../../providers/UserContext";

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
    const { language } = useUser();

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
            <ColorVariation 
                title={translations[language].contrastVariation} 
                variation={contrastVariations} 
                hslBodyColor={hslBodyColor} 
                hue={hue} 
                saturation={saturation} 
                lightness={lightness} 
            />
            <ColorVariation 
                title={translations[language].hueVariation} 
                variation={hueVariations} 
                hslBodyColor={hslBodyColor} 
                hue={hue} 
                saturation={saturation} 
                lightness={lightness} 
            />
            <ColorVariation 
                title={translations[language].lightVariation} 
                variation={lightVariations} 
                hslBodyColor={hslBodyColor} 
                hue={hue} 
                saturation={saturation} 
                lightness={lightness} 
            />
            <ColorVariation 
                title={translations[language].darkVariation} 
                variation={darkVariations} 
                hslBodyColor={hslBodyColor} 
                hue={hue} 
                saturation={saturation} 
                lightness={lightness} 
            />
            <ColorVariation 
                title={translations[language].randomVariation} 
                variation={randomVariations} 
                hslBodyColor={hslBodyColor} 
                hue={hue} 
                saturation={saturation} 
                lightness={lightness} 
            />
            <Card color='primary'>
                <Heading level={3}>{translations[language].suggestion}</Heading>
                <Body size='bold'>{translations[language].saturationInfo}</Body>
                <Body>{translations[language].vibrantColorsInfo}</Body>
                <Body size='bold'>{translations[language].greensVariation}</Body>
                <Body>{translations[language].greenInfo}</Body>
            </Card>
        </>
    );
};

export default ColorCompositions;
