import { createTheme, ThemeOptions } from '@mui/material/styles';

// Extend theme to add custom colors
declare module '@mui/material/styles' {
  interface Palette {
    surfaceTop: string;
    surfaceBright: string;
    primary2: string;
    secondary2: string;
    secondary3: string;
  }
  interface PaletteOptions {
    surfaceTop?: string;
    surfaceBright?: string;
    primary2?: string;
    secondary2?: string;
    secondary3?: string;
  }
}

type ThemeMode = 'dark' | 'light';

const getThemeConfig = (mode: ThemeMode): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: mode === 'dark' ? '#60daff' : '#0099cc',
    },
    secondary: {
      main: mode === 'dark' ? '#0bddb0' : '#089d7e',
    },
    error: {
      main: '#e54f35',
    },
    warning: {
      main: '#e1d550',
    },
    background: {
      default: mode === 'dark' ? '#1d1d1d' : '#f5f5f5',
      paper: mode === 'dark' ? '#222222' : '#f4f4f4',
    },
    text: {
      primary: mode === 'dark' ? '#f4f4f4' : '#1d1d1d',
      secondary: mode === 'dark' ? '#aaaaaa' : '#666666',
    },
    divider: mode === 'dark' ? '#3d3d3d' : '#e0e0e0',
    // Custom colors
    surfaceTop: mode === 'dark' ? '#2d2d2d' : '#ececec',
    surfaceBright: mode === 'dark' ? '#3d3d3d' : '#dfdfdf',
    primary2: mode === 'dark' ? '#004d80' : '#b3e5fc',
    secondary2: mode === 'dark' ? '#7e83e6' : '#5c6bc0',
    secondary3: mode === 'dark' ? '#e1d550' : '#fbc02d',
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: 'ProductSans',
    body1: {
      fontFamily: 'ProductSans',
      fontSize: '1rem',
      color: mode === 'dark' ? '#f4f4f4' : '#1d1d1d',
    },
    body2: {
      fontFamily: 'ProductSans',
      fontSize: '1rem',
      color: mode === 'dark' ? '#aaaaaa' : '#666666',
    },
    h1: {
      fontFamily: 'TTNormsPro',
      fontSize: '2.2rem',
      fontWeight: 600,
      color: mode === 'dark' ? '#60daff' : '#0099cc',
    },
    h2: {
      fontFamily: 'TTNormsPro',
      fontSize: '1.8rem',
      fontWeight: 600,
      color: mode === 'dark' ? '#f4f4f4' : '#1d1d1d',
    },
    h3: {
      fontFamily: 'ProductSans',
      fontSize: '1.4rem',
      // fontWeight: 600,
      // letterSpacing: '0.1rem',
      color: mode === 'dark' ? '#f4f4f4' : '#1d1d1d',
    },
  },
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          display: 'flex',
          flexFlow: 'column',
          justifyContent: 'stretch',
          alignItems: 'stretch',
          padding: '1rem',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          margin: 0,
          borderRadius: 20, // completely rounded pill
          textTransform: 'none', // no all caps
          fontFamily: 'Inter',
        },
        containedPrimary: ({ theme }) => ({
          backgroundColor: theme.palette.primary2,
          color: theme.palette.primary.main,
          '&:hover': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary2,
          },
        }),
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.secondary.main,
        }),
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          padding: 8,
          margin: 0,
        },
        track: {
          borderRadius: 22 / 2,
          '&::before, &::after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
          },
          '&::before': {
            left: 12,
          },
          '&::after': {
            right: 12,
          },
        },
        thumb: {
          boxShadow: 'none',
          width: 16,
          height: 16,
          margin: 2,
        },
      },
    },
    MuiFilledInput: {
      defaultProps: {
        disableUnderline: true,
      },
      styleOverrides: {
        root: {
          border: 'none',
          borderRadius: '10px',
          margin: 0,
        },
      },
    },
  },
});

// Export dark theme (default)
export const darkTheme = createTheme(getThemeConfig('dark'));

// Export light theme for future use
export const lightTheme = createTheme(getThemeConfig('light'));
