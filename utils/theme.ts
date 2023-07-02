import { Roboto } from 'next/font/google';
import { createTheme,responsiveFontSizes } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// Create a theme instance.
let theme = createTheme({
 
 
  palette: {
    primary: {
      main: '#FF7999',
    },
    secondary: {
      light: "#EDF7FA",
      main: '#00A8CC',
    },
    error: {
      main: red.A400,
    },

  },
  components:{
   
    MuiContainer:{
      styleOverrides:{
        
          maxWidthSm: {
            maxWidth: "680px",
            '@media(min-width: 600px)':{
              maxWidth: '680px',
            }
          },
          maxWidthMd: {
            maxWidth: "860px",
            '@media(min-width: 900px)':{
              maxWidth: '860px',
            }

          },
      },
      defaultProps: {
          maxWidth: "md"
      },
      variants: []
    },
    MuiLink:{
      defaultProps:{
      underline: "hover"
      },
      styleOverrides:{
          root: {
            color: 'black',
            '&:hover,&.active':{
              color: "#FF7999"
            }
          }
      }
    },
    MuiListItemText:{
      styleOverrides:{
        root: {
          color: 'black',
          '&:hover,&.active':{
            color: "#FF7999"
          }
        }
    }
    },
    MuiButton:{
      variants:[
        {
          props: {variant: 'contained',color:'primary'},
          style:{
            color: 'white'
          }
        }

      ]
    },
    MuiDivider:{
      styleOverrides:{
        root: {
          borderColor: 'black',
          
        }
    }
    }

  },
  typography: {
    fontFamily: "Heebo, sans-serif",
   
  },
});

theme = responsiveFontSizes(theme);

export default theme;
