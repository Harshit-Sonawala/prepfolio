import { useState } from 'react';
import './App.css';
import TopBar from './components/TopBar';
import Tasks from './components/Tasks';
import Timers from './components/Timers';
import Clipboard from './components/Clipboard';
import { ThemeProvider } from '@mui/material';
import { darkTheme, lightTheme } from './globalMuiTheme.ts';

function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true); // start with dark theme

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <div className="root">
        <div className="main col gap-md align-stretch">
          <TopBar isDarkMode={isDarkMode} onThemeToggle={setIsDarkMode} />
          <div className="row flex-1 gap-md align-stretch">
            <Tasks />
            <Timers />
            <Clipboard />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
