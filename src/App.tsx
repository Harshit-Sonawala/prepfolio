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
      <div className="root col align-stretch gap-md">
        <div className="pd-md col align-stretch gap-md">
          <TopBar isDarkMode={isDarkMode} onThemeToggle={setIsDarkMode} />
          <div className="row justify-stretch align-stretch gap-md">
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
