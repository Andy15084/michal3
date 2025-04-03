import { createTheme } from '@mui/material/styles';

// Define the light theme palette
const lightPalette = {
  primary: {
    main: '#FF3366', // Modern pink/red
    light: '#FF6B8B',
    dark: '#CC2952',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#4ECDC4', // Teal
    light: '#7EDCD6',
    dark: '#3DA69E',
    contrastText: '#FFFFFF',
  },
  background: {
    default: '#F8F9FA', // Light gray background
    paper: '#FFFFFF', // White paper background
  },
  text: {
    primary: '#212529', // Dark gray text
    secondary: '#6C757D', // Medium gray text
  },
  error: {
    main: '#FF3366', // Same as primary for consistency
  },
  success: {
    main: '#4ECDC4', // Same as secondary for consistency
  },
};

// Define the dark theme palette
const darkPalette = {
  primary: {
    main: '#FF3366', // Keep the same pink/red
    light: '#FF6B8B',
    dark: '#CC2952',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#4ECDC4', // Keep the same teal
    light: '#7EDCD6',
    dark: '#3DA69E',
    contrastText: '#FFFFFF',
  },
  background: {
    default: '#121212', // Dark background
    paper: '#1E1E1E', // Slightly lighter paper background
  },
  text: {
    primary: '#F8F9FA', // Light text
    secondary: '#ADB5BD', // Medium light text
  },
  error: {
    main: '#FF3366', // Same as primary for consistency
  },
  success: {
    main: '#4ECDC4', // Same as secondary for consistency
  },
};

// Common theme settings
const commonSettings = {
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 40,
          height: 40,
        },
      },
    },
  },
};

// Create the themes
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    ...lightPalette,
  },
  ...commonSettings,
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    ...darkPalette,
  },
  ...commonSettings,
});