import {ThemeProvider,createTheme} from '@mui/material/styles';
import './input.css';

export const inputTheme = createTheme({
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        width:'100%',
                        margin:'10px 0 10px 0',
                    }
                }
            },
            MuiFormControl: {
                styleOverrides: {
                    root: {
                        width:'100%',
                        margin:'10px 0 10px 0',
                    }
                }
            }
        }
    }
);
