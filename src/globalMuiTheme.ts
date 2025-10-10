import { createTheme, ThemeOptions } from '@mui/material/styles';

// Extend theme to add custom colors
declare module '@mui/material/styles' {
  interface Palette {
    surfaceTop: string;
    surfaceBright: string;
    secondaryColor2: string;
    secondaryColor3: string;
  }
  interface PaletteOptions {
    surfaceTop?: string;
    surfaceBright?: string;
    secondaryColor2?: string;
    secondaryColor3?: string;
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
      paper: mode === 'dark' ? '#222222' : '#ffffff',
    },
    text: {
      primary: mode === 'dark' ? '#f4f4f4' : '#1d1d1d',
      secondary: mode === 'dark' ? '#aaaaaa' : '#666666',
    },
    divider: mode === 'dark' ? '#3d3d3d' : '#e0e0e0',
    // Custom colors
    surfaceTop: mode === 'dark' ? '#2d2d2d' : '#fafafa',
    surfaceBright: mode === 'dark' ? '#3d3d3d' : '#e8e8e8',
    secondaryColor2: '#7e83e6',
    secondaryColor3: '#e1d550',
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: 'ProductSans',
    body1: {
      fontFamily: 'ProductSans',
      color: mode === 'dark' ? '#f4f4f4' : '#1d1d1d',
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
      color: mode === 'dark' ? '#0bddb0' : '#089d7e',
    },
    h3: {
      fontSize: '1.5rem',
      color: mode === 'dark' ? '#60daff' : '#0099cc',
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
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 20, // completely rounded pill
          textTransform: 'none', // no all caps
        },
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
  },
});

// Export dark theme (default)
export const darkTheme = createTheme(getThemeConfig('dark'));

// Export light theme for future use
export const lightTheme = createTheme(getThemeConfig('light'));
