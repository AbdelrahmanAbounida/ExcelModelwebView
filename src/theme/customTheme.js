import { createTheme } from '@mui/material/styles';
import { teal } from '@mui/material/colors';
export const CustomTheme = createTheme({
  palette: {
    primary: {
      light: '#0beacd',
      main: '#0bb09a',
      dark: teal[500]
    },
    secondary:{
        main:'#F5F5F5',
        dark:"#25292a"
    },
    info:{
        main:'#ce181e'
    },
    error:{
      light:"#ef5350",
      main:"#d32f2f",
      dark:"#b61717"
    },
    success:{
      light:"#4caf50",
      main:"#2e7d32",
      dark:"#1b5e20",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    "fontFamily": `"Montserrat","Roboto",  "Arial", sans-serif`,
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
   }

});
