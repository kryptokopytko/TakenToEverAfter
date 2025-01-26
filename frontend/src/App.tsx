import { ThemeProvider } from "./providers/ThemeContext";
import { createGlobalStyle } from 'styled-components';
import styled, { ThemeProvider as StyledThemeProvider } from "styled-components";
import { useTheme } from "./providers/ThemeContext";
import Navbar from "./components/layout/Navbar/Navbar";
import Footer from "./components/layout/Footer/Footer";
import GuestPage from "./pages/GuestPage";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TableProvider } from "./providers/TableContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { checkSession, getTasks, getGuestsInfo, getExpenses, getUserPreferences, getPhotos, getQuestionnaire } from "./API/DbApi/DBApi";
import Example from "./exampleData";
import { initialFontSize, initialThemes } from "./styles/theme";


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
  const { 
    isLogged, language, setIsLogged, setLanguage, setViewLocation, setAccount, setAccountDetails, setWeddingDetails, setTaskCards,
    setGuests, setTags, setInvitations, setExpenseCards, setChoices, setPhotos, setCouples, setQuestions, setAnswers,
   } = useUser();

   const { setTheme, setThemes, setFontSize } = useTheme();

  const setExampleData = () => {
    setAccount(Example.account[language]);
    setAccountDetails(Example.accountDetails);
    setWeddingDetails(Example.weddingDetails[language]);
    setTaskCards(Example.taskCards[language]); 
    setGuests(Example.guests[language]);
    setCouples([]);
    setTags(Example.tags[language]);
    setInvitations(Example.invitations);
    setExpenseCards(Example.expenses[language]);
    setChoices(Example.choices[language]);
    setPhotos(Example.images[language]);
    setFontSize(initialFontSize);
    setThemes(initialThemes);
    setTheme(initialThemes.nude);
    setQuestions(Example.questions[language]);
    setAnswers(Example.answers[language]);
  }

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await checkSession();
      if (sessionData.isAuthenticated) {
        setIsLogged(true);
        setAccount(sessionData.account);
        setAccountDetails(sessionData.accountDetails);
        setWeddingDetails(null);
        
        const guestsInfo = await getGuestsInfo();
        setGuests(guestsInfo.guests);
        setTags(guestsInfo.tags);
        setInvitations(guestsInfo.invitations);
        setCouples(guestsInfo.couples);
        
        const taskCards = await getTasks();
        setTaskCards(taskCards);

        const { expenseCards, choices } = await getExpenses();
        setExpenseCards(expenseCards);
        setChoices(choices);

        const photos = await getPhotos();
        setPhotos(photos);

        const {preferences, themes} = await getUserPreferences();
        setFontSize(preferences.fontSize);
        setThemes(themes);
        setTheme(preferences.colorTheme || initialThemes.nude);
        setLanguage(preferences.language);

        const { questions, answers } = await getQuestionnaire();
        setQuestions(questions);
        setAnswers(answers);
      } else {
        setIsLogged(false);
        setLanguage("english");
        setExampleData();
    }
  };

    fetchSession();
  }, [isLogged]);


  useEffect(() => {
    if (!isLogged) {
      setExampleData();
    }
  }, [language]);

  useEffect(() => {
    window.scrollTo(0, 0);
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
              <Route path="/guest_response/:uniqueUrl" element={<GuestResponsePage />} />
              <Route path="/guest_photos/:uniqueUrl" element={<GuestPhotosPage />} />
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
    <GoogleOAuthProvider clientId="106599807053-1b18mgl3ck79v53reuuti0a2gb0o9ssk.apps.googleusercontent.com">
      <ThemeProvider>
        <UserProvider>
          <TableProvider>
            <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
              <AppContent />
            </Router>
          </TableProvider>
        </UserProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
