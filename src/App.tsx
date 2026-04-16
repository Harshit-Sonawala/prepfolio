import { useState } from 'react';
import './App.css';
import TopBar from './components/TopBar';
import Tasks from './components/Tasks';
import Timers from './components/Timers';
import Clipboard from './components/Clipboard';
import { ThemeProvider, CssBaseline, GlobalStyles, Box } from '@mui/material';
import { darkTheme, lightTheme } from './globalMuiTheme.ts';

function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true); // start with dark theme
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ':root': {
            '--background-color': theme.palette.background.default,
            '--surface-color': theme.palette.background.paper,
            '--surface-top-color': theme.palette.surfaceTop,
            '--surface-bright-color': theme.palette.surfaceBright,
            '--onsurface-color': theme.palette.text.primary,
            '--onsurface-dark-color': theme.palette.text.secondary,
            '--primary-color': theme.palette.primary.main,
            '--secondary-color1': theme.palette.secondary.main,
            '--secondary-color2': theme.palette.secondary2,
            '--secondary-color3': theme.palette.secondary3,
            '--error-color': theme.palette.error.main,
          },
        }}
      />
      <Box 
        className="root col align-stretch gap-md"
        sx={{ 
          bgcolor: 'background.default',
          color: 'text.primary',
          minHeight: '100vh',
          transition: 'background-color 0.3s ease, color 0.3s ease'
        }}
      >
        <div className="pd-md col align-stretch gap-md">
          <TopBar isDarkMode={isDarkMode} onThemeToggle={setIsDarkMode} />
          <div className="row justify-stretch align-stretch gap-md">
            <Tasks />
            <Timers />
            <Clipboard />
          </div>
        </div>
      </Box>
    </ThemeProvider>
  );
}

export default App;
