import styled, { ThemeProvider as StyledThemeProvider } from "styled-components";
import Navbar from "./components/layout/Navbar/Navbar";
import { ThemeProvider, useTheme } from "./providers/ThemeContext";
import GuestList from "./components/GuestList";
import Budget from "./components/Budget";
import ToDo from "./components/ToDo/ToDo";
import Hero from "./components/Hero/Hero";
import PhotoAlbum from "./components/PhotoAlbum/PhotoAlbum";
import Footer from "./components/layout/Footer/Footer";
import TableChart from "./components/TableChart";
import ThemeConstructor from "./components/ThemeConstructor";
import Choices from "./components/Choices";
import { createGlobalStyle } from 'styled-components';
import Printables from "./components/Printables";

const AppContainer = styled.div`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.body};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: -8px;
  margin-top: 5rem;
  
`;

const SectionsContainer = styled.div`
width: 100%;
  & > * {
    padding: 3rem;
    width: calc(100% - 6rem);
  }
   & > *:nth-child(even) {
    background-color: ${({ theme }) => theme.light}; 
  }

  & > *:nth-child(odd) {
    background-color: ${({ theme }) => theme.primary}; 
  }
`

const GlobalStyles = createGlobalStyle`
  :root {
    font-size: clamp(10px, 1.25vw + 5px, 20px); 
    color: ${({ theme }) => theme.text};

  }

`;

const AppContent = () => {
  const { theme } = useTheme();

  return (


    <StyledThemeProvider theme={theme}>
      <GlobalStyles />
      <AppContainer>
        <Navbar isLogged={true} names={['Smurf', 'Smurfette']} sections={['Home', 'Hero', 'Guest List', 'Budget', 'To Do', 'Choices', 'Photo Album', 'TableChart', 'Theme Constructor']} />
        <SectionsContainer>
          <Hero />
          <GuestList />
          <Budget />
          <ToDo />
          <Choices />
          <PhotoAlbum />
          <TableChart />
          <ThemeConstructor />
          <Printables />
        </SectionsContainer>
        <Footer />
      </AppContainer>
    </StyledThemeProvider>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
