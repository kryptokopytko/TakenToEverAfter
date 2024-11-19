import styled from "styled-components";
import { Heading } from "../../styles/typography";
import HslColorPicker from "./HslColorPicker/HslColorPicker";
import { GridContainer, SpaceBetweenContainer } from "../../styles/section";
import ColorCompositions from "./ColorCompositions";
import { useState, useEffect } from "react";
import { useTheme } from "../../providers/ThemeContext";
import Button from "../../components/ui/Button";
import { Card } from "../../styles/card";
import { Link } from "react-router-dom";

const ContentContainer = styled.div`
  text-align: center;
`;

interface ThemeConstructorProps {
    isHomePage?: boolean;
}

const ThemeConstructor: React.FC<ThemeConstructorProps> = ({ isHomePage }) => {
    const { theme } = useTheme();
    const [color, setColor] = useState<{ hue: number; saturation: number; lightness: number }>({
        hue: theme.hue,
        saturation: theme.saturation,
        lightness: theme.lightness,
    });
    const [isExpanded, setIsExpanded] = useState(!isHomePage);
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
        <ContentContainer>
            <SpaceBetweenContainer>
                <Heading level={1}>Establish a theme</Heading>
                {isHomePage ?
                    <Button onClick={toggleList}>
                        {isExpanded ? "Collapse List" : "Expand List"}
                    </Button> : <></>}
            </SpaceBetweenContainer>
            <GridContainer isExpanded={isExpanded} minHeight='60vh'>
                <Card color='primary'>
                    <HslColorPicker color={color} setColor={setColor} />
                </Card>
                <ColorCompositions color={color} />
            </GridContainer>
            {isHomePage ?
                <Link to="theme_constructor">
                    <Button>Manage Theme</Button></Link>
                : <></>}
        </ContentContainer>
    );
};


export default ThemeConstructor;
