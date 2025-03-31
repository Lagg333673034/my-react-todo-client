import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {login} from "../actions/authActions";
import {refresh} from "../actions/authActions";
import {useNavigate} from 'react-router-dom';
import {PROJECTS_ROUTE,RECOVER_PASSWORD_MAIL_ROUTE,REGISTRATION_ROUTE} from "../routes/consts";
import BtnLoader from '../components/loader/btnLoader';
import Loader from '../components/loader/loader';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
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
import { Chip, Avatar } from '@mui/material';


import Alert from '@mui/material/Alert';

const PageLogin = ()=> {
    const dispatch = useDispatch();
    const isAuth = useSelector((state)=>state.authReducer.isAuth);
    const authUser = useSelector((state)=>state.authReducer.authUser);
    const authLoading = useSelector((state)=>state.authReducer.authLoading);
    const tokenLoading = useSelector((state)=>state.authReducer.tokenLoading);

    let messageMsg = useSelector((state)=>state.messageReducer.msg);
    let messageType = useSelector((state)=>state.messageReducer.type);
    /*------------------------------------------------------------------*/
    useEffect(()=>{
        dispatch({type:"MESSAGE_MSG",payload: ""});
        dispatch({type:"MESSAGE_TYPE",payload: ""});
    },[]);
    /*------------------------------------------------------------------*/
    //console.log("isAuth(PageLogin)=="+isAuth);
    //console.log("authUser(PageLogin)=="+authUser.email);
    //console.log("token(PageLogin)=="+localStorage.getItem('token'));
    /*------------------------------------------------------------------*/
    const navigate = useNavigate();
    useEffect(()=>{
        if(isAuth && authUser && authUser.email){
            navigate(PROJECTS_ROUTE);
        }
    },[isAuth,authUser]);
    /*------------------------------------------------------------------*/
    useEffect(()=>{
        if(localStorage.getItem('token')){
            dispatch(refresh());
        }
    },[]);
    /*------------------------------------------------------------------*/
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (e) => e.preventDefault();
    /*------------------------------------------------------------------*/
    const [loading, setLoading] = useState(false);
    const [loginButtonDisabled, setLoginButtonDisabled] = useState(false);

    const loginButtonClick = () => {
        if(!loginButtonDisabled){
            setLoginButtonDisabled(true);
            setLoading(true);
            dispatch(login(email,password));
        }
    };
    useEffect(()=>{
        if(loading || loginButtonDisabled){
            const timer = setTimeout(() => {
                setLoginButtonDisabled(false);
                setLoading(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    },[loading,loginButtonDisabled]);
    /*------------------------------------------------------------------*/
    if(tokenLoading){
        return (
            <Box className="divCenter1">
                <Box className="divCenter2">
                    <Loader />
                </Box>
            </Box>
        )
    }
    return(
        <Box className="divCenter1">
            <Box className="divCenter2">
                <Box sx={{width:'400px',margin:'0px',padding:'20px',border:'1px solid gray',borderRadius:'10px'}}>
                    <div className="titlePage">
                        <Box sx={{fontWeight:'700'}}>Авторизация&nbsp;</Box>
                        <Box>
                            <SyncAltIcon sx={{fontSize:'0.6rem'}}/>&nbsp;
                            <Link
                                href="#" underline="hover"
                                onClick={()=>navigate(`${REGISTRATION_ROUTE}`)}
                                sx={{fontSize:'0.9rem'}}
                            >
                                Регистрация
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
                                        className="myInput"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </FormControl>
                                <FormControl variant="outlined">
                                    <Grid sx={{fontSize:'1.1rem'}} container direction="row" justifyContent="center" alignItems="center">
                                        <Grid item xs="auto">
                                            Пароль
                                        </Grid>
                                        <Grid item xs></Grid>
                                        <Grid item xs="auto">
                                            <Link
                                                href="#"
                                                underline="hover"
                                                onClick={()=>navigate(`${RECOVER_PASSWORD_MAIL_ROUTE}`)}>
                                                Забыли пароль?
                                            </Link>
                                        </Grid>
                                    </Grid>
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
                                    disabled={loginButtonDisabled}
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={()=> loginButtonClick()}
                                >
                                    Войти&nbsp;{loading ? <BtnLoader /> :''}
                                </Button>
                            </ThemeProvider>

                            <Box sx={{ width: "100%", marginTop:'20px',padding:'0px',fontSize:'1.0rem' }}>
                                или используйте следующие данные<br/>
                                Email and Password: <Chip size="small" label="guest@guest.ru"/>
                            </Box>
                            
                        </Stack>
                    </Box>
                    {messageMsg ? <Box><br/><Alert severity={messageType}>{messageMsg}</Alert></Box> : ""}
                </Box>
            </Box>
        </Box>
    )
};
export default PageLogin;