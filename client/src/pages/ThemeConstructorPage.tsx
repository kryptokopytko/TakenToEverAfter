import React, { useState } from "react";
import { Heading } from "../styles/typography";
import ThemeConstructor from "../sections/ThemeConstructor/ThemeConstructor";
import { Container, MenuContainer } from "../styles/page";
import { useTheme } from "../providers/ThemeContext";
import ThemeDisplay from "../sections/ThemeConstructor/ThemeDisplay";
import styled from "styled-components";

const ThemeContainer = styled.div`
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    justify-content: space-around;
`;

interface ThemeConstructorPageProps { }

const ThemeConstructorPage: React.FC<ThemeConstructorPageProps> = () => {
    const { themes, setThemes } = useTheme();
    const savedThemes = Object.keys(themes).filter(themeKey => !themeKey.startsWith('custom'));
    const newThemes = Object.keys(themes).filter(themeKey => themeKey.startsWith('custom'));

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
            alert("Theme name cannot be empty.");
            return;
        }

        if (savedThemes.includes(newName)) {
            alert("Theme name must be unique.");
            return;
        }


        const newThemesCopy = { ...themes };
        const themeData = newThemesCopy[themeKey];


        delete newThemesCopy[themeKey];


        newThemesCopy[newName] = themeData;


        setThemes(newThemesCopy);


        setInputValues((prevValues) => {
            const updatedValues = { ...prevValues };
            delete updatedValues[themeKey];
            return updatedValues;
        });
    };
    const handleDelete = (themeKey: string) => {

        const newThemesCopy = { ...themes };


        if (newThemesCopy[themeKey]) {

            delete newThemesCopy[themeKey];


            setThemes(newThemesCopy);
        } else {
            alert("Theme not found.");
        }
    };


    return (
        <Container>
            <MenuContainer>
                <Heading level={2}>Manage Themes</Heading>
                <ThemeContainer>
                    <ThemeDisplay
                        themes={themes}
                        themeKeys={savedThemes}
                        title="Saved Themes:"
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
                            title="New Themes:"
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
            <ThemeConstructor />
        </Container>
    );
};

export default ThemeConstructorPage;
