import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {registration} from "../actions/authActions";
import {useNavigate} from 'react-router-dom';
import {PROJECTS_ROUTE,LOGIN_ROUTE} from "../routes/consts";

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
import Link from '@mui/material/Link';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import OutlinedInput from '@mui/material/OutlinedInput';

const PageRegistration = ()=> {
    const dispatch = useDispatch();
    const isAuth = useSelector((state)=>state.authReducer.isAuth);
    const authUser = useSelector((state)=>state.authReducer.authUser);
    /*------------------------------------------------------------------*/
    const navigate = useNavigate();
    useEffect(()=>{
        if(isAuth && authUser && authUser.email){
            navigate(PROJECTS_ROUTE);
        }
    },[isAuth,authUser]);
    /*------------------------------------------------------------------*/
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (e) => e.preventDefault();
    /*------------------------------------------------------------------*/
    const [loading, setLoading] = useState(false);
    const [registrationButtonDisabled, setRegistrationButtonDisabled] = useState(false);
    const registrationButtonClick = () => {
        if(!registrationButtonDisabled){
            setRegistrationButtonDisabled(true);
            setLoading(true);
            dispatch(registration(email,password));
            //console.log("=="+email+"=="+password);
        }
    };
    useEffect(()=>{
        if(loading || registrationButtonDisabled){
            const timer = setTimeout(() => {
                setRegistrationButtonDisabled(false);
                setLoading(false);
            }, 10000);
            return () => clearTimeout(timer);
        }
    },[loading,registrationButtonDisabled]);
    /*------------------------------------------------------------------*/
    return(
        <Box className="divCenter1">
            <Box className="divCenter2">
                <Box sx={{width:'400px',margin:'0px',padding:'20px',border:'1px solid gray',borderRadius:'10px'}}>
                    <div className="titlePage">
                        <Box sx={{fontWeight:'700'}}>Регистрация&nbsp;</Box>
                        <Box>
                            <SyncAltIcon sx={{fontSize:'0.6rem'}}/>&nbsp;
                            <Link
                                href="#" underline="hover"
                                onClick={()=>navigate(`${LOGIN_ROUTE}`)}
                                sx={{fontSize:'0.9rem'}}
                            >
                                Авторизация
                            </Link>
                        </Box>
                    </div>
                    <Box className="" autoComplete="off">
                        <Stack spacing={0} direction="column" sx={{width:'100%'}}>
                            <ThemeProvider theme={inputTheme}>
                                <FormControl variant="outlined">
                                    <Box sx={{width:'100%',fontSize:'1.1rem'}}>Email</Box>
                                    <OutlinedInput
                                        type="text"
                                        autocomplate="off"
                                        className="myInput"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </FormControl>
                                <FormControl variant="outlined">
                                    <Box sx={{width:'100%',fontSize:'1.1rem'}}>Пароль</Box>
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
                                    disabled={registrationButtonDisabled}
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={()=>registrationButtonClick()}
                                >
                                    Зарегистрироваться {loading ? '...' :''}
                                </Button>
                            </ThemeProvider>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
};
export default PageRegistration;