import React from "react";
import styled from "styled-components";
import { useTheme } from "../providers/ThemeContext";
import { violetTheme, nudeTheme } from "../themes/theme";
import logo from '/icons/logo.svg';
import { Heading, Label } from "../themes/typography";

const NavbarContainer = styled.nav`
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.body};
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
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
  const { setTheme, theme } = useTheme();

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTheme = event.target.value;

    switch (selectedTheme) {
      case "violet":
        setTheme(violetTheme);
        break;
      default:
        setTheme(nudeTheme);
    }
  };

  return (
    <NavbarContainer>
      <ContentContainer>
        <LogoContainer>
          <img src={logo} alt='logo' style={{ height: '7rem' }} />
          <Heading level={3} color={'white'}>Imie1 & Imie2</Heading>
        </LogoContainer>
        <ThemeSelector>
          <RadioButton>
            <input
              type="radio"
              value="violet"
              name="theme"
              checked={theme === violetTheme}
              onChange={handleThemeChange}
            />
            <Label color='white'>Violet</Label>
          </RadioButton>
          <RadioButton>
            <input
              type="radio"
              value="nude"
              name="theme"
              checked={theme === nudeTheme}
              onChange={handleThemeChange}
            />
            <Label color='white'>Nude</Label>
          </RadioButton>
        </ThemeSelector>
      </ContentContainer>
    </NavbarContainer>
  );
};

export default Navbar;
