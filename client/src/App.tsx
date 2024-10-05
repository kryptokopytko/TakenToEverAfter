import { ThemeProvider } from "./providers/ThemeContext";
import { createGlobalStyle } from 'styled-components';
import styled, { ThemeProvider as StyledThemeProvider } from "styled-components";
import { useTheme } from "./providers/ThemeContext";
import Navbar from "./components/layout/Navbar/Navbar";
import Footer from "./components/layout/Footer/Footer";
import GuestPage from "./pages/GuestPage";
import Home from "./pages/Home";

const AppContainer = styled.div`
  background: ${({ theme }) =>
        `linear-gradient(to right, ${theme.secondary} -2000%, 
   ${theme.light} 2000%)`};
  color: ${({ theme }) => theme.body};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: -8px;
`;

interface GlobalStylesProps {
    fontSize: number;
}

const GlobalStyles = createGlobalStyle<GlobalStylesProps>`
  :root {
    font-size: ${({ fontSize }) => fontSize}px; 
    color: ${({ theme }) => theme.text};
  }
`;
const sections = ['Home', 'Hero', 'Guest List', 'Budget', 'To Do', 'Choices', 'Photo Album', 'Table Chart', 'Theme Maker', 'Printables'];

const AppContent = () => {
    const { theme, fontSize } = useTheme();

    return (
        <StyledThemeProvider theme={theme}>
            <AppContainer>
                <GlobalStyles fontSize={fontSize} />
                <Navbar isLogged={true} names={['Smurf', 'Smurfette']} sections={sections} weddingDate="26.04.2025" />
                <Home />
                <Footer sections={sections} />

            </AppContainer>
        </StyledThemeProvider>

    );
}

const App = () => {

    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
};

export default App;