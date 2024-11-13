import React from "react";
import Button, { ButtonContainer } from "../../components/Button";
import Input from "../../components/Input";
import { Subtitle } from "../../styles/typography";
import { ColorBox, ColorRow } from "./ColorBox";
import { Card } from "../../styles/card";
import { useTheme } from "../../providers/ThemeContext";

interface ThemeDisplayProps {
    themes: Record<string, any>;
    themeKeys: string[];
    title: string;
    inputValue: Record<string, string>;
    onChange: (themeKey: string, value: string) => void;
    isSaved: boolean;
    handleSave: (themeKey: string) => void;
    handleDelete: (themeKey: string) => void;
}


const ThemeDisplay: React.FC<ThemeDisplayProps> = ({ themes, themeKeys, title, inputValue, onChange, isSaved, handleSave, handleDelete }) => {
    const { setTheme } = useTheme();

    const handleCopyTheme = (theme: Record<string, any>) => {
        const hslColors = Object.values(theme)
            .map(color => typeof color === 'string' ? color : "")
            .filter(Boolean)
            .join(", ");

        navigator.clipboard.writeText(hslColors)
            .then(() => alert("Theme colors copied to clipboard in HSL format!"))
            .catch(err => console.error("Failed to copy colors to clipboard: ", err));
    };

    return (
        <div>
            <Subtitle level={2}>{title}</Subtitle>
            <div style={{ display: 'grid', gap: '2rem' }}>
                {themeKeys.map((themeKey) => (
                    <Card color='light' key={themeKey}>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {isSaved ?
                                <Subtitle level={2}>
                                    {themeKey.charAt(0).toUpperCase() + themeKey.slice(1)}
                                </Subtitle> : <>
                                    <div style={{ marginBottom: '-1rem' }}>
                                        <Subtitle level={2}>Set a Name</Subtitle>
                                    </div>
                                    <Input
                                        value={inputValue[themeKey] || ""}
                                        onChange={(e) => onChange(themeKey, e.target.value)}
                                        placeholder="Enter theme name"
                                    /> </>}
                            <ColorRow>
                                {Object.entries(themes[themeKey])
                                    .slice(0, 5)
                                    .reverse()
                                    .map(([_, colorValue]) => {
                                        if (typeof colorValue === 'string') {
                                            return <ColorBox key={colorValue} color={colorValue} />;
                                        }
                                        return null;
                                    })}
                            </ColorRow>
                            {!isSaved ? (
                                <ButtonContainer>
                                    <Button onClick={() => setTheme(themes[themeKey])}>Pick</Button>
                                    <Button onClick={() => handleSave(themeKey)}>Save</Button>
                                </ButtonContainer>
                            ) : (
                                <ButtonContainer>
                                    <Button onClick={() => setTheme(themes[themeKey])}>Pick</Button>
                                    <Button onClick={() => handleDelete(themeKey)}>Delete</Button>
                                    <Button onClick={() => handleCopyTheme(themes[themeKey])}>Copy Theme</Button>
                                </ButtonContainer>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ThemeDisplay;
