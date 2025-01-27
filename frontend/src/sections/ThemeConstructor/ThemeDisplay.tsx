import React from "react";
import Button, { ButtonContainer } from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { Subtitle } from "../../styles/typography";
import { ColorBox, ColorRow } from "./ColorBox";
import { Card } from "../../styles/card";
import { useTheme } from "../../providers/ThemeContext";
import { translations } from "../../translations";
import { useUser } from "../../providers/UserContext";
import useFunctionsProxy from "../../API/FunctionHandler";

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
    const { language } = useUser();
    const FunctionsProxy = useFunctionsProxy();

    const handleCopyTheme = (theme: Record<string, any>) => {
        const hslColors = Object.values(theme)
            .map(color => typeof color === 'string' ? color : "")
            .filter(Boolean)
            .join(", ");

        navigator.clipboard.writeText(hslColors)
            .then(() => alert(translations[language].themeColorsCopied))
            .catch(err => console.error("Failed to copy colors to clipboard: ", err));
    };

    const pickTheme = async (themeKey: string) => {
        setTheme(themes[themeKey]);
        await FunctionsProxy.pickTheme(themeKey);
    }

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
                                        <Subtitle level={2}>{translations[language].setName}</Subtitle>
                                    </div>
                                    <Input
                                        value={inputValue[themeKey] || ""}
                                        onChange={(e) => onChange(themeKey, e.target.value)}
                                        placeholder={translations[language].enterThemeName}
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
                                    <Button onClick={() => pickTheme(themeKey)}>{translations[language].pickThis}</Button>
                                    <Button onClick={() => handleSave(themeKey)}>{translations[language].save}</Button>
                                </ButtonContainer>
                            ) : (
                                <ButtonContainer>
                                    <Button onClick={() => pickTheme(themeKey)}>{translations[language].pick}</Button>
                                    <Button onClick={() => handleDelete(themeKey)}>{translations[language].delete}</Button>
                                    <Button onClick={() => handleCopyTheme(themes[themeKey])}>{translations[language].copyTheme}</Button>
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
