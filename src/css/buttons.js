import {ThemeProvider,createTheme} from '@mui/material/styles';

export const buttonTheme = createTheme({
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        fontSize: '0.8em',
                        alignItems:'flex-start',
                    }
                }
            }
        }
    }
);
export const buttonIconProjectTheme = createTheme({
        components: {
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        border:'1px solid #80808057',
                        backgroundColor:'transparent',
                    }
                }
            }
        }
    }
);
export const buttonIconTaskTheme = createTheme({
        components: {
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        border:'1px solid #80808057',
                        backgroundColor:'transparent',
                        padding:'5px',
                        margin:'5px',
                    }
                }
            }
        }
    }
);