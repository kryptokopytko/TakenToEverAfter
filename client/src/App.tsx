import { ThemeProvider } from "./providers/ThemeContext";
import { createGlobalStyle } from 'styled-components';
import styled, { ThemeProvider as StyledThemeProvider } from "styled-components";
import { useTheme } from "./providers/ThemeContext";
import Navbar from "./components/layout/Navbar/Navbar";
import Footer from "./components/layout/Footer/Footer";
import GuestPage from "./pages/GuestPage";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { guests } from './dummyData';
import { fontStyles } from "./styles/typography";
import TableChartPage from "./pages/TableChartPage";
import BudgetPage from "./pages/BudgetPage";
import ThemeConstructorPage from "./pages/ThemeConstructorPage";
import PhotosPage from "./pages/PhotosPage";
import ChoicesPage from "./pages/ChoicesPage";
import PrintablesPage from "./pages/PrintablesPage";
import ToDoPage from "./pages/ToDoPage";

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
    color: ${({ theme }) => theme.body};
    font-family: ${fontStyles.bodyFont};
  }
`;

const sections = ['Home', 'Guest List', 'Budget', 'To Do', 'Choices', 'Photo Album', 'Table Chart', 'Theme Constructor', 'Printables'];

export const PageContainer = styled.div`
  width: 100%;
  position: relative; 
  display: flex;
  justify-content: center;
  margin-top: 5rem;

  & > * {
    width: 100%;
  }
`;

const AppContent = () => {
  const { theme, fontSize } = useTheme();
  return (
    <StyledThemeProvider theme={theme}>
      <AppContainer>
        <GlobalStyles fontSize={fontSize} />
        <Navbar
          isLogged={true}
          names={['Smurf', 'Smurfette']}
          sections={sections}
          weddingDate="06.12.2024"
        />
        <PageContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/table_chart" element={<TableChartPage />} />
            <Route path="/budget" element={<BudgetPage />} />
            <Route path="/theme_constructor" element={<ThemeConstructorPage />} />
            <Route path="/photo_album" element={<PhotosPage />} />
            <Route path="/choices" element={<ChoicesPage />} />
            <Route path="/printables" element={<PrintablesPage />} />
            <Route path="/guest_list" element={<GuestPage />} />
            <Route path="/to_do" element={<ToDoPage />} />
          </Routes>
        </PageContainer>
        <Footer sections={sections} />
      </AppContainer>
    </StyledThemeProvider>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
};

export default App;
