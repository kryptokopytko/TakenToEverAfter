import styled, { ThemeProvider as StyledThemeProvider } from "styled-components";
import Navbar from "./components/layout/Navbar/Navbar";
import { ThemeProvider, useTheme } from "./providers/ThemeContext";
import GuestList from "./components/sections/GuestList";
import Budget from "./components/sections/Budget";
import ToDo from "./components/sections/ToDo/ToDo";
import Hero from "./components/sections/Hero/Hero";
import PhotoAlbum from "./components/sections/PhotoAlbum/PhotoAlbum";
import Footer from "./components/layout/Footer/Footer";
import TableChart from "./components/sections/TableChart";
import ThemeConstructor from "./components/sections/ThemeConstructor/ThemeConstructor";
import Choices from "./components/sections/Choices";
import { createGlobalStyle } from 'styled-components';
import Printables from "./components/sections/Printables/Printables";

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
        <Navbar isLogged={true} names={['Smurf', 'Smurfette']} sections={['Home', 'Hero', 'Guest List', 'Budget', 'To Do', 'Choices', 'Photo Album', 'TableChart', 'Theme Constructor']} weddingDate="26.04.25" daysLeft={233} />
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
