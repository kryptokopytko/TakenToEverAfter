import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../../../providers/ThemeContext";
import logo from '/icons/logo.svg';
import { Heading, Label } from "../../../themes/typography";
import { LogoContainer, ButtonsContainer, ThemeSelectorContainer, SelectorButton, ContentContainer, RadioButton, DropdownMenu, BurgerMenu, MobileMenu, NavbarContainer } from "./NavbarStyles";

interface NavbarProps {
  names: [string, string];
  sections: string[];
  isLogged: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ names, sections, isLogged }) => {
  const { setTheme, theme, themes } = useTheme();
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isSectionOpen, setIsSectionOpen] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const themeDropdownRef = useRef<HTMLDivElement>(null);
  const sectionDropdownRef = useRef<HTMLDivElement>(null);

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedThemeKey = event.target.value;
    const selectedTheme = themes[selectedThemeKey as keyof typeof themes];
    if (selectedTheme) {
      setTheme(selectedTheme);
      setIsThemeOpen(false);
    }
  };

  const toggleThemeDropdown = () => {
    setIsThemeOpen(!isThemeOpen);
  };

  const toggleSectionDropdown = () => {
    setIsSectionOpen(!isSectionOpen);
  };

  const toggleBurgerMenu = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      themeDropdownRef.current &&
      !themeDropdownRef.current.contains(event.target as Node)
    ) {
      setIsThemeOpen(false);
    }
    if (
      sectionDropdownRef.current &&
      !sectionDropdownRef.current.contains(event.target as Node)
    ) {
      setIsSectionOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <NavbarContainer>
      <ContentContainer>
        <LogoContainer>
          <img src={logo} alt="logo" style={{ height: "6rem", marginTop: "1.1rem" }} />


          <Heading level={3} color="primary">{`${names[0]} & ${names[1]}`}</Heading>
        </LogoContainer>


        <ButtonsContainer>

          <ThemeSelectorContainer ref={themeDropdownRef}>
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


          <ThemeSelectorContainer ref={sectionDropdownRef}>
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
          <Label color="primary">
            {isLogged ? 'Wyloguj' : 'Zaloguj'}
          </Label>
        </ButtonsContainer>


        <BurgerMenu onClick={toggleBurgerMenu}>
          <div />
          <div />
          <div />
        </BurgerMenu>


        <MobileMenu isOpen={isBurgerOpen}>

          <div>
            <Label color="dark">
              {isLogged ? 'Wyloguj' : 'Zaloguj'}
            </Label>
            <ThemeSelectorContainer ref={themeDropdownRef}>
              <Label color="dark">Select Theme </Label>
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
          </div>

          <ThemeSelectorContainer ref={sectionDropdownRef}>
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
