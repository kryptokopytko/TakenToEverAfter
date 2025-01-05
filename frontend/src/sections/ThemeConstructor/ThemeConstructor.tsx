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
import { translations } from "../../translations";
import { useUser } from "../../providers/UserContext";

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
    const { language } = useUser();
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
                <Heading level={1}>{translations[language].establishTheme}</Heading>
                {isHomePage ?
                    <Button onClick={toggleList}>
                        {isExpanded ? translations[language].collapseList : translations[language].expandList}
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
                    <Button>{translations[language].manageTheme}</Button></Link>
                : <></>}
        </ContentContainer>
    );
};


export default ThemeConstructor;
