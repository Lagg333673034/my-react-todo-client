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
    });
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
    });
export const buttonIconTaskTheme = createTheme({
        components: {
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        border:'2px solid #898989fa',
                        backgroundColor:'#ffeea1',
                        padding:'5px',
                        margin:'5px',
                    }
                }
            }
        }
    });
export const buttonIconTaskHoverTheme = {
    "&:hover": {
        border:'2px solid blue',
        backgroundColor:'#c6edbe',
    },
};
export const buttonIconTaskSettingsTheme = createTheme({
        components: {
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        border:'2px solid #80808057',
                        backgroundColor:'#00000021',
                        padding:'1px',
                        margin:'0px',
                    }
                }
            }
        }
    });
export const buttonIconSmallTheme = createTheme({
        components: {
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        border:'1px solid #898989fa',
                        backgroundColor:'white',
                        padding:'1px',
                        margin:'1px',
                        borderRadius:'20%',
                    }
                }
            }
        }
    });
export const buttonIconSmallHoverTheme = {
    "&:hover": {
        backgroundColor:'#c6edbe',
    },
};
