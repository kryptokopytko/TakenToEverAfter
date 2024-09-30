import styled from "styled-components";
import { Heading } from "../themes/typography";
import HslColorPicker from "./HslColorPicker";
import { Card, GridContainer } from "../themes/section";
import ColorCompositions from "./ColorCompositions";
import { useState, useEffect } from "react";
import { useTheme } from "../providers/ThemeContext";
import Button from "./Button";

const Container = styled.div`
  width: 100%;
`;

const ContentContainer = styled.div`
  margin: 3rem;
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
        <Container>
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
        </Container>
    );
};


export default ThemeConstructor;
