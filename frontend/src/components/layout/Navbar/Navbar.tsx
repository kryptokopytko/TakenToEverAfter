import React, { useState } from "react";
import { useTheme } from "../../../providers/ThemeContext";
import logo from '/icons/logo.svg';
import { Heading, Label } from "../../../styles/typography";
import { StyledLink, DateContainer, LogoContainer, ButtonsContainer, ContentContainer, BurgerMenu, MobileMenu, NavbarContainer, NamesContainer } from "./NavbarStyles";
import { useUser } from "../../../providers/UserContext";
import { sectionLinks, sections } from "../sections";
import Button from "../../ui/Button";
import DropdownSelector from "../../ui/Dropdown/Dropdown";

const Navbar: React.FC = () => {

  const { setIsLogged, names, isLogged, weddingDate, language, setLanguage, viewLocation } = useUser();

  const { setTheme, theme, themes } = useTheme();

  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const handleThemeChange = (selected: string | string[]) => {
    const selectedKey = Array.isArray(selected) ? selected[0] : selected;
    const selectedTheme = themes[selectedKey as keyof typeof themes];
    if (selectedTheme) {
      setTheme(selectedTheme);
    }
  };


  const handleLanguageChange = () => {
    setLanguage(language === "english" ? "polish" : "english");
  };

  const handleLoginChange = () => {
    setIsLogged(!isLogged);
  }



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
                <Heading level={3} color="primary">{`${names[0]} & ${names[1]}`}</Heading> :
                <Heading level={3} color='primary'>Smurf & Smurfette</Heading>}
            </NamesContainer>
          </LogoContainer>
        </StyledLink>
        <DateContainer>
          {calculateDaysLeft() > 0 ?
            <Label size='small' color='primary'>{calculateDaysLeft()} days left</Label> : <></>}
          <Label size='small' color='primary'>{weddingDate} </Label>
        </DateContainer>
        <ButtonsContainer>

          <DropdownSelector
            color='primary'
            title="Theme"
            options={Object.keys(themes).map(themeKey => ({
              label: themeKey.charAt(0).toUpperCase() + themeKey.slice(1),
              value: themeKey,
            }))}
            initialSelectedOption={Object.keys(themes).find(key => themes[key] === theme)}
            onOptionSelect={handleThemeChange}
          />



          <DropdownSelector
            title="Menu"
            color='primary'

            options={sections.map(section => ({
              label: section.name.charAt(0).toUpperCase() + section.name.slice(1),
              value: section.name,
            }))}
            onOptionSelect={(selected) => {
              const section = sections.find(sec => sec.name === selected);
              if (section) {
                window.location.href = `/${section.name.toLowerCase().replace(" ", "_")}`;
              }
            }}
            initialSelectedOption={sectionLinks.find((item) => item.link === viewLocation)?.name ?? 'Home'}

          />

          <div style={{ marginTop: '-1.5rem' }}>
            <Button onClick={handleLanguageChange} variant="transparent">
              <Label color="primary">{language === "english" ? "Change to Polish" : "Change to English"}</Label>
            </Button>
            <Button onClick={handleLoginChange} variant="transparent">
              <Label color="primary">{isLogged ? 'Log out' : 'Log in'}</Label>
            </Button>
          </div>
        </ButtonsContainer>

        <BurgerMenu onClick={toggleBurgerMenu}>
          <div />
          <div />
          <div />
        </BurgerMenu>

        <MobileMenu isOpen={isBurgerOpen}>
          <span>
            <div>
              <Button onClick={handleLoginChange} variant="transparent">
                <Label color="tertiary">{isLogged ? 'Log out' : 'Log in'}</Label>
              </Button>
            </div>
            <Button onClick={handleLanguageChange} variant="transparent">
              <Label color="tertiary">{language === "english" ? "Change to Polish" : "Change to English"}</Label>
            </Button>

            <DropdownSelector
              title="Theme"
              options={Object.keys(themes).map(themeKey => ({
                label: themeKey.charAt(0).toUpperCase() + themeKey.slice(1),
                value: themeKey,
              }))}
              initialSelectedOption={Object.keys(themes).find(key => themes[key] === theme)}
              onOptionSelect={(selected) => handleThemeChange(selected as string)}
            />
          </span>
          <DropdownSelector
            title="Menu"
            options={sections.map(section => ({
              label: section.name.charAt(0).toUpperCase() + section.name.slice(1),
              value: section.name,
            }))}
            onOptionSelect={(selected) => {
              const section = sections.find(sec => sec.name === selected);
              if (section) {
                window.location.href = `/${section.name.toLowerCase().replace(" ", "_")}`;
              }
            }}
            initialSelectedOption={sectionLinks.find((item) => item.link === viewLocation)?.name ?? 'Home'}

          />
        </MobileMenu>
      </ContentContainer>
    </NavbarContainer>
  );
};

export default Navbar;
