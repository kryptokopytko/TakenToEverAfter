import { ThemeProvider } from "./providers/ThemeContext";
import Home from "./components/sections/Home";

const App = () => {
    return (
        <ThemeProvider>
            <Home />
        </ThemeProvider>
    );
};

export default App;