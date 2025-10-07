import { createTheme } from '@mui/material';
import { blue } from '@mui/material/colors';

export const globalMuiTheme = createTheme({
  cssVariables: false,
  palette: {
    primary: {
      main: '#60daff',
    },
    secondary: {
      main: '#0bddb0',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 0, // All Paper components default to 0
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 20, // Pill-shaped buttons
          backgroundColor: '#3d3d3d',
          color: '#f4f4f4',
          '&:hover': {
            backgroundColor: '#60daff',
          },
        },
        startIcon: {
          color: '#60daff',
        },
        endIcon: {
          color: '#60daff',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#60daff',
        },
      },
    },
  },
});
