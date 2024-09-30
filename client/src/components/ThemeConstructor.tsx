import styled from "styled-components";
import { Heading } from "../styles/typography";
import HslColorPicker from "./HslColorPicker/HslColorPicker";
import { Card, GridContainer } from "../styles/section";
import ColorCompositions from "./ColorCompositions";
import { useState, useEffect } from "react";
import { useTheme } from "../providers/ThemeContext";
import Button from "./Button";


const ContentContainer = styled.div`
  text-align: center;
`;

const ThemeConstructor = () => {
    const { theme } = useTheme();
    const [color, setColor] = useState<{ hue: number; saturation: number; lightness: number }>({
        hue: theme.hue,
        saturation: theme.saturation,
        lightness: theme.lightness,
    });

    useEffect(() => {
        setColor({
            hue: theme.hue,
            saturation: theme.saturation,
            lightness: theme.lightness,
        });
    }, [theme]);

    return (
        <>
            <ContentContainer>
                <Heading level={1}>Establish a theme</Heading>
                <GridContainer isExpanded={true}>
                    <Card color='light'>
                        <HslColorPicker color={color} setColor={setColor} />
                    </Card>
                    <ColorCompositions color={color} />
                </GridContainer>
                <Button> Manage Themes</Button>
            </ContentContainer>
        </>
    );
};


export default ThemeConstructor;
