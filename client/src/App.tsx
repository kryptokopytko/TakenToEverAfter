import { ThemeProvider } from "./providers/ThemeContext";
import Home from "./components/sections/Home";
import { createGlobalStyle } from 'styled-components';
import styled, { ThemeProvider as StyledThemeProvider } from "styled-components";
import { useTheme } from "./providers/ThemeContext";

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

const AppContent = () => {
    const { theme, fontSize } = useTheme();

    return (
        <StyledThemeProvider theme={theme}>
            <AppContainer>
                <GlobalStyles fontSize={fontSize} />
                <Home />
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