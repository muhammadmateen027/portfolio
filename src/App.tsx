import { ThemeProvider } from './components/ThemeProvider';
import './glass.css';
import './gradient.css';
import { MainPage } from './components/MainPage';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <MainPage />
    </ThemeProvider>
  );
}

export default App;
