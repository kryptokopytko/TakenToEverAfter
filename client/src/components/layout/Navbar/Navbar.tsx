import React, { useState } from "react";
import { useTheme } from "../../../providers/ThemeContext";
import logo from '/icons/logo.svg';
import { Heading, Label } from "../../../styles/typography";
import { StyledLink, DateContainer, LogoContainer, ButtonsContainer, ContentContainer, BurgerMenu, MobileMenu, NavbarContainer, NamesContainer } from "./NavbarStyles";
import { DropdownMenu, RadioButton, SelectorButton, SelectorContainer } from "../../Dropdown/DropdownStyles";
import { BurgerBreakpoint } from "../../../styles/Breakpoints";

interface NavbarProps {
  names: [string, string];
  sections: string[];
  isLogged: boolean;
  weddingDate: string;
}


const Navbar: React.FC<NavbarProps> = ({ names, sections, isLogged, weddingDate }) => {
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

  const convertDateFormat = (dateString: string) => {
    const [day, month, year] = dateString.split('.');
    return `${year}-${month}-${day}`;
  };

  const calculateDaysLeft = () => {
    const today = new Date();
    const wedding = new Date(convertDateFormat(weddingDate));
    const differenceInTime = wedding.getTime() - today.getTime();
    return Math.ceil(differenceInTime / (1000 * 3600 * 24));
  };

  return (
    <NavbarContainer>
      <ContentContainer>
        <StyledLink to={'/'}>
          <LogoContainer>
            <img src={logo} alt="logo" style={{ height: "6rem" }} />
            <NamesContainer>
              {isLogged ?
                <Heading level={3} color="primary">{`${names[0]} & ${names[1]}`}</Heading>
                : <Heading level={3} color='primary'>Smurf & Smurfette</Heading>}
            </NamesContainer>
          </LogoContainer>
        </StyledLink>
        <DateContainer>
          {calculateDaysLeft() > 0 ?
            <Label size='small'>{calculateDaysLeft()} days left</Label> : <></>}
          <Label size='small'>{weddingDate} </Label>
        </DateContainer>
        <ButtonsContainer>
          <SelectorContainer>
            <SelectorButton onClick={toggleThemeDropdown}>
              <Label color="primary">Theme {isThemeOpen ? "▵" : "▿"}</Label>
            </SelectorButton>
            <DropdownMenu isOpen={isThemeOpen} breakpoint={BurgerBreakpoint}>
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
          </SelectorContainer>

          <SelectorContainer>
            <SelectorButton onClick={toggleSectionDropdown}>
              <Label color="primary">Menu {isSectionOpen ? "▵" : "▿"}</Label>
            </SelectorButton>
            <DropdownMenu isOpen={isSectionOpen}>
              {sections.map((section) => (
                <RadioButton key={section}>
                  <input type="radio" name="section" value={section} />
                  <Label color="tertiary">
                    <StyledLink to={`/${section.toLowerCase().replace(" ", "_")}`}>
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </StyledLink>
                  </Label>
                </RadioButton>
              ))}
            </DropdownMenu>
          </SelectorContainer>
          <Label color="primary" style={{ marginTop: "1.4rem" }}>{isLogged ? 'Log out' : 'Log in'}</Label>
        </ButtonsContainer>

        <BurgerMenu onClick={toggleBurgerMenu}>
          <div />
          <div />
          <div />
        </BurgerMenu>

        <MobileMenu isOpen={isBurgerOpen}>
          <span>
            <Label color="dark">{isLogged ? 'Log out' : 'Log in'}</Label>
            <SelectorContainer>
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
            </SelectorContainer>
          </span>

          <SelectorContainer>
            <Label color="dark">Select Section</Label>
            <DropdownMenu isOpen={isSectionOpen}>
              {sections.map((section) => (
                <RadioButton key={section}>
                  <input type="radio" name="section" value={section} />
                  <Label color="tertiary">
                    <StyledLink to={`/${section.toLowerCase().replace(" ", "_")}`}>
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </StyledLink>
                  </Label>
                </RadioButton>
              ))}
            </DropdownMenu>
          </SelectorContainer>
        </MobileMenu>
      </ContentContainer>
    </NavbarContainer>
  );
};

export default Navbar;
