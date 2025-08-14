import { createTheme } from '@mui/material/styles'

// Paleta neutra con un verde muy suave
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#2e7d32' }, // verde sobrio
    secondary: { main: '#00897b' },
    background: {
      default: '#f7fbf8', // blanco con tendencia verdosa muy clara
      paper: '#ffffff'
    }
  },
  shape: { borderRadius: 12 },
  components: {
    MuiPaper: { styleOverrides: { root: { borderRadius: 12 } } },
    MuiButton: { styleOverrides: { root: { textTransform: 'none', borderRadius: 10 } } }
  }
})

export default theme
