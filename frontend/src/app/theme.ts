import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF884B',
      dark: '#dc5800',
    },
    secondary: {
      main: '#1D1C1A',
    },
    info: {
      main: '#3498DB',
    },
    success: {
      main: '#07BC0C',
    },
    warning: {
      main: '#F1C40F',
    },
    error: {
      main: '#E74C3C',
    },
    text: {
      primary: '#1D1C1A',
    },
  },
});

export default theme;