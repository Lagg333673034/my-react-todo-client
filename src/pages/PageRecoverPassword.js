import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {recoverPassword} from "../actions/authActions";
import {useNavigate,useParams} from 'react-router-dom';
import {LOGIN_ROUTE} from "../routes/consts";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {ThemeProvider,createTheme} from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import {inputTheme} from '../css/input';
import {buttonTheme} from '../css/button';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';

const PageUpdatePassword = ()=> {
    const dispatch = useDispatch();
    const randomUuid = useParams().randomUuid;
    const authLoading = useSelector((state)=>state.authReducer.authLoading);
    const navigate = useNavigate();
    /*------------------------------------------------------------------*/
    const [password,setPassword] = useState('');

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (e) => e.preventDefault();
    /*------------------------------------------------------------------*/
    const [loading, setLoading] = useState(false);
    const [recoverButtonDisabled, setRecoverButtonDisabled] = useState(false);
    const recoverButtonClick = () => {
        if(!recoverButtonDisabled){
            setRecoverButtonDisabled(true);
            setLoading(true);
            dispatch(recoverPassword(randomUuid,password));
        }
    };

    useEffect(() => {
        if(authLoading == false && loading == true && recoverButtonDisabled == true){
            setRecoverButtonDisabled(false);
            setLoading(false);
            navigate(LOGIN_ROUTE);
        }
    }, [authLoading]);
    /*------------------------------------------------------------------*/
    return(
        <Box className="divCenter1">
            <Box className="divCenter2">
                <Box sx={{width:'400px',margin:'0px',padding:'20px',border:'1px solid gray',borderRadius:'10px'}}>
                    <div className="titlePage">
                        <Box sx={{fontWeight:'700'}}>Восстановление пароля (Шаг 2 из 2)</Box>
                    </div>
                    <Box className="" autoComplete="off">
                        <Stack spacing={0} direction="column" sx={{width:'100%'}}>
                            <ThemeProvider theme={inputTheme}>
                                <FormControl variant="outlined">
                                    <Box sx={{width:'100%',fontSize:'1.1rem'}}>Придумайте ваш новый пароль</Box>
                                    <OutlinedInput
                                        id="userPassword"
                                        type={showPassword ? 'text' : 'password'}
                                        autocomplate="off"
                                        className="myInput"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </ThemeProvider>
                            <ThemeProvider theme={buttonTheme}>
                                <Button
                                    disabled={recoverButtonDisabled}
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={()=> recoverButtonClick()}
                                >
                                    Сменить пароль {loading ? '...' :''}
                                </Button>
                            </ThemeProvider>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
};
export default PageUpdatePassword;