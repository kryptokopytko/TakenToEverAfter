import React, { useState } from "react";
import { useTheme } from "../../../providers/ThemeContext";
import logo from '/icons/logo.svg';
import { Heading, Label } from "../../../styles/typography";
import { StyledLink, DateContainer, LogoContainer, ButtonsContainer, ContentContainer, BurgerMenu, MobileMenu, NavbarContainer, NamesContainer } from "./NavbarStyles";
import { useUser } from "../../../providers/UserContext";
import { sectionLinks, sections } from "../sections";
import Button from "../../ui/Button";
import DropdownSelector from "../../ui/Dropdown/Dropdown";
import { logout } from "../../../API/DbApi/DBApi";
import { useNavigate } from "react-router-dom";
import { translations } from "../../../translations";
import useFunctionsProxy from "../../../API/FunctionHandler";

const Navbar: React.FC = () => {
  const { setIsLogged, account, accountDetails, isLogged, language, setLanguage, viewLocation, guestPageProps } = useUser();
  const { setTheme, theme, themes } = useTheme();
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const FunctionsProxy = useFunctionsProxy();

  const handleThemeChange = async (selected: string | string[]) => {
    const selectedKey = Array.isArray(selected) ? selected[0] : selected;
    const selectedTheme = themes[selectedKey as keyof typeof themes];
    if (selectedTheme) {
      setTheme(selectedTheme);
      await FunctionsProxy.pickTheme(selectedKey);
    }
  };

  const handleLanguageChange = () => {
    setLanguage(language === "english" ? "polish" : "english");
  };

  const navigate = useNavigate();
  const handleLoginChange = async () => {
    if (isLogged) {
      try {
        await logout();
        setIsLogged(false);
      } catch (e) { }
    } else {
      navigate('/login');
    }
  }

  const toggleBurgerMenu = () => {
    setIsBurgerOpen(prev => !prev);
  };

  const convertDateFormat = (dateString: string) => {
    const [day, month, year] = dateString.split('.');
    return `${year}-${month}-${day}`;
  };

  const newDate = guestPageProps? guestPageProps.date : accountDetails.weddingDate;

  const calculateDaysLeft = () => {
    const today = new Date();
    const wedding = new Date(convertDateFormat(newDate!));
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
              <Heading level={3} color="primary">
                {`${guestPageProps? guestPageProps.names.bride : account.brideName} & 
                ${guestPageProps? guestPageProps.names.groom : account.groomName}`}
              </Heading>
            </NamesContainer>
          </LogoContainer>
        </StyledLink>
        {newDate && (<DateContainer>
          {calculateDaysLeft() > 0 ?
            <Label size='small' color='primary'>{calculateDaysLeft() + " " + translations[language].daysLeft}</Label> : <></>
          }
          <Label size='small' color='primary'>{newDate} </Label>
        </DateContainer>)}
        <ButtonsContainer>

          <DropdownSelector
            color='primary'
            title={translations[language].theme}
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
              label: section[language].name,
              value: section.english.name,
            }))}
            onOptionSelect={(selected) => {
              const section = sections.find(sec => sec.english.name === selected);
              if (section) {
                window.location.href = `/${section.english.name.toLowerCase().replace(" ", "_")}`;
              }
            }}
            initialSelectedOption={sectionLinks.find((item) => item.link === viewLocation)?.name ?? 'Home'}

          />

          <div style={{ marginTop: '-1.5rem' }}>
            <Button onClick={handleLanguageChange} variant="transparent">
              <Label color="primary">{translations[language].changeLanguage}</Label>
            </Button>
            <Button onClick={handleLoginChange} variant="transparent">
              <Label color="primary">{isLogged ? translations[language].logout : translations[language].login}</Label>
            </Button>
          </div>
        </ButtonsContainer>

        <BurgerMenu onClick={toggleBurgerMenu}>
          <div />
          <div />
          <div />
        </BurgerMenu>

        <MobileMenu isOpen={isBurgerOpen}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', paddingTop: '10vh' }}>
            <div>
              <div style={{ marginLeft: '-1.6rem' }}>
                <div>
                  <Button onClick={handleLoginChange} variant="transparent">
                    <Label color="tertiary">{isLogged ? translations[language].logout : translations[language].login}</Label>
                  </Button>
                </div>
                <Button onClick={handleLanguageChange} variant="transparent">
                  <Label color="tertiary">{translations[language].changeLanguage}</Label>
                </Button>
              </div>
              <DropdownSelector
                title="Theme"
                options={Object.keys(themes).map(themeKey => ({
                  label: themeKey.charAt(0).toUpperCase() + themeKey.slice(1),
                  value: themeKey,
                }))}
                initialSelectedOption={Object.keys(themes).find(key => themes[key] === theme)}
                onOptionSelect={(selected) => handleThemeChange(selected as string)}
              />
            </div>
            <DropdownSelector
              title="Menu"
              options={sections.map(section => ({
                label: section[language].name,
                value: section.english.name,
              }))}
              onOptionSelect={(selected) => {
                const section = sections.find(sec => sec.english.name === selected);
                if (section) {
                  window.location.href = `/${section.english.name.toLowerCase().replace(" ", "_")}`;
                }
              }}
              initialSelectedOption={sectionLinks.find((item) => item.link === viewLocation)?.name ?? 'Home'}

            />
          </div>
        </MobileMenu>
      </ContentContainer>
    </NavbarContainer>
  );
};

export default Navbar;
