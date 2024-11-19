import { ThemeProvider } from "./providers/ThemeContext";
import { createGlobalStyle } from 'styled-components';
import styled, { ThemeProvider as StyledThemeProvider } from "styled-components";
import { useTheme } from "./providers/ThemeContext";
import Navbar from "./components/layout/Navbar/Navbar";
import Footer from "./components/layout/Footer/Footer";
import GuestPage from "./pages/GuestPage";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { fontStyles } from "./styles/typography";
import TableChartPage from "./pages/TableChartPage";
import BudgetPage from "./pages/BudgetPage";
import ThemeConstructorPage from "./pages/ThemeConstructorPage";
import PhotosPage from "./pages/PhotosPage";
import ChoicesPage from "./pages/ChoicesPage";
import PrintablesPage from "./pages/InvitationsPage";
import ToDoPage from "./pages/ToDoPage";
import LoginPage from "./pages/Login";
import RegistrationPage from "./pages/RegistrationPage";
import GuestResponsePage from "./pages/GuestResponsePage";
import GuestPhotosPage from "./pages/GuestPhotosPage";
import { UserProvider, useUser } from "./providers/UserContext";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PersonalityQuizPage from "./pages/PersonalityQuizPage";
import { TableProvider } from "./providers/TableContext";

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
  const location = useLocation();
  const { setViewLocation } = useUser();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    setViewLocation(location.pathname);
  }, [location]);

  return (
    <StyledThemeProvider theme={theme}>
      <AppContainer>
        <GlobalStyles fontSize={fontSize} />
        <DndProvider backend={HTML5Backend}>
          <Navbar />
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
              <Route path="/login" element={<LoginPage />} />
              <Route path="/registration" element={<RegistrationPage />} />
              <Route path="/guest_response" element={<GuestResponsePage />} />
              <Route path="/guest_photos" element={<GuestPhotosPage />} />
              <Route path="/toxic_personality_quiz" element={<PersonalityQuizPage />} />

            </Routes>
          </PageContainer>
          <Footer />
        </DndProvider>
      </AppContainer>
    </StyledThemeProvider>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <TableProvider>
          <Router>
            <AppContent />
          </Router>
        </TableProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
