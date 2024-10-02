import styled from "styled-components";
import { Heading } from "../../../styles/typography";
import HslColorPicker from "./HslColorPicker/HslColorPicker";
import { GridContainer, SpaceBetweenContainer } from "../../../styles/section";
import ColorCompositions from "./ColorCompositions";
import { useState, useEffect } from "react";
import { useTheme } from "../../../providers/ThemeContext";
import Button from "../../Button";
import { Card } from "../../../styles/card";

const ContentContainer = styled.div`
  text-align: center;
`;

interface ThemeConstructorProps {
    manageSectionButton?: boolean;
}

const ThemeConstructor: React.FC<ThemeConstructorProps> = ({ manageSectionButton }) => {
    const { theme } = useTheme();
    const [color, setColor] = useState<{ hue: number; saturation: number; lightness: number }>({
        hue: theme.hue,
        saturation: theme.saturation,
        lightness: theme.lightness,
    });
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleList = () => {
        setIsExpanded((prev) => !prev);
    };

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
                <SpaceBetweenContainer>
                    <Heading level={1}>Establish a theme</Heading>
                    <Button onClick={toggleList}>
                        {isExpanded ? "Collapse List" : "Expand List"}
                    </Button>
                </SpaceBetweenContainer>
                <GridContainer isExpanded={isExpanded} minHeight='60vh'>
                    <Card color='primary'>
                        <HslColorPicker color={color} setColor={setColor} />
                    </Card>
                    <ColorCompositions color={color} />
                </GridContainer>
                {manageSectionButton ?
                    <Button>Manage Theme</Button>
                    : <></>}
            </ContentContainer>
        </>
    );
};


export default ThemeConstructor;