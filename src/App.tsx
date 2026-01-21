import { ThemeProvider, ThemeToggle } from './components/ThemeProvider/ThemeProvider';
import './glass.css';
import './gradient.css';
import { MainPage } from './components/MainPage/MainPage';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <ThemeToggle />
      <MainPage />
    </ThemeProvider>
  );
}

export default App;
