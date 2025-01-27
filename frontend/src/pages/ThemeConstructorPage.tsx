import React, { useState } from "react";
import { Heading } from "../styles/typography";
import ThemeConstructor from "../sections/ThemeConstructor/ThemeConstructor";
import { Container, MenuContainer } from "../styles/page";
import { useTheme } from "../providers/ThemeContext";
import ThemeDisplay from "../sections/ThemeConstructor/ThemeDisplay";
import styled from "styled-components";
import useFunctionsProxy from "../API/FunctionHandler";
import { translations } from "../translations";
import { useUser } from "../providers/UserContext";

const ThemeContainer = styled.div`
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    justify-content: space-around;
`;

interface ThemeConstructorPageProps { }

const ThemeConstructorPage: React.FC<ThemeConstructorPageProps> = () => {
    const FunctionsProxy = useFunctionsProxy();
    const { theme, themes, setThemes } = useTheme();
    const savedThemes = Object.keys(themes).filter(themeKey => !themeKey.startsWith('custom'));
    const newThemes = Object.keys(themes).filter(themeKey => themeKey.startsWith('custom'));
    const { language } = useUser();
    const [inputValues, setInputValues] = useState<Record<string, string>>({});

    const handleInputChange = (themeKey: string, value: string) => {
        setInputValues((prevValues) => ({
            ...prevValues,
            [themeKey]: value,
        }));
    };

    const handleSave = (themeKey: string) => {
        const newName = inputValues[themeKey]?.trim();
        if (!newName) {
            alert(translations[language].themeNameEmpty);
            return;
        }

        if (savedThemes.includes(newName)) {
            alert(translations[language].themeNameUnique);
            return;
        }


        const newThemesCopy = { ...themes };
        const themeData = newThemesCopy[themeKey];

        FunctionsProxy.addNewTheme(newName, themeData);

        const { [themeKey]: removed, ...restOfThemes } = themes;
        setThemes(
            { ...restOfThemes, [newName]: themeData }
        );


        setInputValues((prevValues) => {
            const updatedValues = { ...prevValues };
            delete updatedValues[themeKey];
            return updatedValues;
        });
    };
    const handleDelete = (themeKey: string) => {

        FunctionsProxy.deleteTheme(themeKey);

        const newThemesCopy = { ...themes };


        if (newThemesCopy[themeKey]) {

            delete newThemesCopy[themeKey];


            setThemes(newThemesCopy);
        } else {
            alert(translations[language].themeNotFound);
        }
    };


    return (
        <Container>
            <MenuContainer>
                <Heading level={2}>{translations[language].manageThemes}</Heading>
                <ThemeContainer>
                    <ThemeDisplay
                        themes={themes}
                        themeKeys={savedThemes}
                        title={translations[language].savedThemes + ":"}
                        inputValue={{}}
                        onChange={() => { }}
                        isSaved={true}
                        handleSave={() => { }}
                        handleDelete={handleDelete}
                    />
                    {newThemes.length ? (
                        <ThemeDisplay
                            themes={themes}
                            themeKeys={newThemes}
                            title={translations[language].newThemes + ":"}
                            inputValue={inputValues}
                            onChange={handleInputChange}
                            isSaved={false}
                            handleSave={handleSave}
                            handleDelete={() => { }}
                        />
                    ) : (
                        <></>
                    )}
                </ThemeContainer>
            </MenuContainer>
            <div style={{ backgroundColor: theme.light }}>
                <ThemeConstructor />
            </div>
        </Container>
    );
};

export default ThemeConstructorPage;
