import React from "react";
import styled from "styled-components";
import { useTheme } from "../providers/ThemeContext";
import logo from '/icons/logo.svg';
import { Heading, Label } from "../themes/typography";

const NavbarContainer = styled.nav`
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.body};
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  height: 5rem;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  height: 100%;
`;

const ThemeSelector = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const LogoContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const RadioButton = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  input {
    appearance: none;
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid ${({ theme }) => theme.dark};
    border-radius: 50%;
    cursor: pointer;
    outline: none;
    position: relative;
    background-color: transparent;
    transition: background-color 0.3s, border-color 0.3s;
  }

  input:checked {
    border-color: ${({ theme }) => theme.dark};
  }

  input:checked::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.dark};
    transform: translate(-50%, -50%);
  }
`;

const Navbar = () => {
  const { setTheme, theme, themes } = useTheme();

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedThemeKey = event.target.value;
    const selectedTheme = themes[selectedThemeKey as keyof typeof themes];
    if (selectedTheme) {
      setTheme(selectedTheme);
    }
  };
  return (
    <NavbarContainer>
      <ContentContainer>
        <LogoContainer>
          <img src={logo} alt='logo' style={{ height: '6rem', marginTop: '1.1rem' }} />
          <Heading level={3} color={'primary'}>Imie1 & Imie2</Heading>
        </LogoContainer>
        <ThemeSelector>
          {Object.keys(themes).map((themeKey) => (
            <RadioButton key={themeKey}>
              <input
                type="radio"
                value={themeKey}
                name="theme"
                checked={theme === themes[themeKey as keyof typeof themes]}
                onChange={handleThemeChange}
              />
              <Label color='primary'>{themeKey.charAt(0).toUpperCase() + themeKey.slice(1)}</Label>
            </RadioButton>
          ))}
        </ThemeSelector>
      </ContentContainer>
    </NavbarContainer>
  );
};

export default Navbar;
