import React, { useState } from "react";
import { useTheme } from "../../../providers/ThemeContext";
import logo from '/icons/logo.svg';
import { Heading, Label } from "../../../styles/typography";
import { LogoContainer, ButtonsContainer, ThemeSelectorContainer, SelectorButton, ContentContainer, RadioButton, DropdownMenu, BurgerMenu, MobileMenu, NavbarContainer, NamesContainer } from "./NavbarStyles";

interface NavbarProps {
  names: [string, string];
  sections: string[];
  isLogged: boolean;
  weddingDate: string;
  daysLeft: number;
}

const Navbar: React.FC<NavbarProps> = ({ names, sections, isLogged, weddingDate, daysLeft }) => {
  const { setTheme, theme, themes } = useTheme();
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isSectionOpen, setIsSectionOpen] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedThemeKey = event.target.value;
    const selectedTheme = themes[selectedThemeKey as keyof typeof themes];
    if (selectedTheme) {
      setTheme(selectedTheme);
      setIsThemeOpen(false);
    }
  };

  const toggleThemeDropdown = () => {
    setIsThemeOpen(prev => !prev);
    setIsSectionOpen(false);
  };

  const toggleSectionDropdown = () => {
    setIsSectionOpen(prev => !prev);
    setIsThemeOpen(false);
  };

  const toggleBurgerMenu = () => {
    setIsBurgerOpen(prev => !prev);
  };

  return (
    <NavbarContainer>
      <ContentContainer>
        <LogoContainer>
          <img src={logo} alt="logo" style={{ height: "6rem", marginTop: "1.1rem" }} />
          <NamesContainer>
            <Heading level={3} color="primary">{`${names[0]} & ${names[1]}`}</Heading>
          </NamesContainer>
        </LogoContainer>
        <Label size='small' >{daysLeft} days left</Label>
        <Label size='small'>{weddingDate} </Label>
        <ButtonsContainer>
          <ThemeSelectorContainer>
            <SelectorButton onClick={toggleThemeDropdown}>
              <Label color="primary">Select Theme {isThemeOpen ? "▵" : "▿"}</Label>
            </SelectorButton>
            <DropdownMenu isOpen={isThemeOpen}>
              {Object.keys(themes).map((themeKey) => (
                <RadioButton key={themeKey}>
                  <input
                    type="radio"
                    value={themeKey}
                    name="theme"
                    checked={theme === themes[themeKey as keyof typeof themes]}
                    onChange={handleThemeChange}
                  />
                  <Label color="tertiary">{themeKey.charAt(0).toUpperCase() + themeKey.slice(1)}</Label>
                </RadioButton>
              ))}
            </DropdownMenu>
          </ThemeSelectorContainer>

          <ThemeSelectorContainer>
            <SelectorButton onClick={toggleSectionDropdown}>
              <Label color="primary">Select Section {isSectionOpen ? "▵" : "▿"}</Label>
            </SelectorButton>
            <DropdownMenu isOpen={isSectionOpen}>
              {sections.map((section) => (
                <RadioButton key={section}>
                  <input type="radio" name="section" value={section} />
                  <Label color="tertiary">{section.charAt(0).toUpperCase() + section.slice(1)}</Label>
                </RadioButton>
              ))}
            </DropdownMenu>
          </ThemeSelectorContainer>
          <Label color="primary" style={{ marginTop: "2.2rem" }}>{isLogged ? 'Wyloguj' : 'Zaloguj'}</Label>
        </ButtonsContainer>

        <BurgerMenu onClick={toggleBurgerMenu}>
          <div />
          <div />
          <div />
        </BurgerMenu>

        <MobileMenu isOpen={isBurgerOpen}>
          <span>
            <Label color="dark">{isLogged ? 'Wyloguj' : 'Zaloguj'}</Label>
            <ThemeSelectorContainer>
              <Label color="dark">Select Theme</Label>
              <DropdownMenu isOpen={isThemeOpen}>
                {Object.keys(themes).map((themeKey) => (
                  <RadioButton key={themeKey}>
                    <input
                      type="radio"
                      value={themeKey}
                      name="theme"
                      checked={theme === themes[themeKey as keyof typeof themes]}
                      onChange={handleThemeChange}
                    />
                    <Label color="tertiary">{themeKey.charAt(0).toUpperCase() + themeKey.slice(1)}</Label>
                  </RadioButton>
                ))}
              </DropdownMenu>
            </ThemeSelectorContainer>
          </span>

          <ThemeSelectorContainer>
            <Label color="dark">Select Section</Label>
            <DropdownMenu isOpen={isSectionOpen}>
              {sections.map((section) => (
                <RadioButton key={section}>
                  <input type="radio" name="section" value={section} />
                  <Label color="tertiary">{section.charAt(0).toUpperCase() + section.slice(1)}</Label>
                </RadioButton>
              ))}
            </DropdownMenu>
          </ThemeSelectorContainer>
        </MobileMenu>
      </ContentContainer>
    </NavbarContainer>
  );
};

export default Navbar;
