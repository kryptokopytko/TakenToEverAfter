import styled, { ThemeProvider as StyledThemeProvider } from "styled-components";
import Navbar from "./components/Navbar";
import { ThemeProvider, useTheme } from "./providers/ThemeContext";
import GuestList from "./components/GuestList";
import Budget from "./components/Budget";
import ToDo from "./components/ToDo";
import Hero from "./components/Hero";
import PhotoAlbum from "./components/PhotoAlbum";
import Footer from "./components/Footer";
import TableChart from "./components/TableChart";
import ThemeConstructor from "./components/ThemeConstructor";
import Choices from "./components/Choices";

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



const AppContent = () => {
  const { theme } = useTheme();

  return (


    <StyledThemeProvider theme={theme}>
      <AppContainer>
        <Navbar />

        <Hero />
        <GuestList />
        <Budget />
        <ToDo />
        <Choices />
        <PhotoAlbum />
        <TableChart />
        <ThemeConstructor />
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
