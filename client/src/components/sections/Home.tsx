import styled, { ThemeProvider as StyledThemeProvider } from "styled-components";
import Navbar from "../layout/Navbar/Navbar";
import { useTheme } from "../../providers/ThemeContext";
import GuestList from "./GuestList";
import Budget from "./Budget";
import ToDo from "./ToDo/ToDo";
import Hero from "./Hero/Hero";
import PhotoAlbum from "./PhotoAlbum/PhotoAlbum";
import Footer from "../layout/Footer/Footer";
import TableChart from "./TableChart";
import ThemeConstructor from "./ThemeConstructor/ThemeConstructor";
import Choices from "./Choices";
import { createGlobalStyle } from 'styled-components';
import Printables from "./Printables/Printables";

const HomeContainer = styled.div`
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
const sections = ['Home', 'Hero', 'Guest List', 'Budget', 'To Do', 'Choices', 'Photo Album', 'TableChart', 'Theme Constructor'];

const Home = () => {
  const { theme } = useTheme();

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyles />
      <HomeContainer>
        <Navbar isLogged={true} names={['Smurf', 'Smurfette']} sections={sections} weddingDate="26.04.2025" />
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
        <Footer sections={sections} />
      </HomeContainer>
    </StyledThemeProvider>
  );
};

export default Home;
