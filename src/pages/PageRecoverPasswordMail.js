import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {recoverPasswordEmail} from "../actions/authActions";
import {PROJECTS_ROUTE,LOGIN_ROUTE} from "../routes/consts";

import BtnLoader from '../components/loader/btnLoader';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {ThemeProvider,createTheme} from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import {inputTheme} from '../css/input';
import {buttonTheme} from '../css/button';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Link from '@mui/material/Link';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';

import Alert from '@mui/material/Alert';

const PageUpdatePasswordMail = ()=> {
    const dispatch = useDispatch();
    const isAuth = useSelector((state)=>state.authReducer.isAuth);
    const authUser = useSelector((state)=>state.authReducer.authUser);

    let messageMsg = useSelector((state)=>state.messageReducer.msg);
    let messageType = useSelector((state)=>state.messageReducer.type);
    /*------------------------------------------------------------------*/
    useEffect(()=>{
        dispatch({type:"MESSAGE_MSG",payload: ""});
        dispatch({type:"MESSAGE_TYPE",payload: ""});
    },[]);
    /*------------------------------------------------------------------*/
    const navigate = useNavigate();
    useEffect(()=>{
        if(isAuth && authUser && authUser.email){
            navigate(PROJECTS_ROUTE);
        }
    },[isAuth,authUser]);
    /*------------------------------------------------------------------*/
    const [email,setEmail] = useState('');
    /*------------------------------------------------------------------*/
    const [loading, setLoading] = useState(false);

    const [recoverButtonDisabled, setRecoverButtonDisabled] = useState(false);
    const recoverButtonClick = () => {
        if(!recoverButtonDisabled){
            setRecoverButtonDisabled(true);
            setLoading(true);
            dispatch(recoverPasswordEmail(email));

            dispatch({type:"MESSAGE_MSG",payload: "email has been sent"});
            dispatch({type:"MESSAGE_TYPE",payload: "success"});
        }
    };

    useEffect(()=>{
        if(loading || recoverButtonDisabled){
            const timer = setTimeout(() => {
                setRecoverButtonDisabled(false);
                setLoading(false);

                dispatch({type:"MESSAGE_MSG",payload: ""});
                dispatch({type:"MESSAGE_TYPE",payload: ""});
            }, 10000);
            return () => clearTimeout(timer);
        }
    },[loading,recoverButtonDisabled]);
    /*------------------------------------------------------------------*/
    return(
        <Box className="divCenter1">
            <Box className="divCenter2">
                <Box sx={{width:'400px',margin:'0px',padding:'20px',border:'1px solid gray',borderRadius:'10px'}}>
                    <Box className="titlePage" sx={{display:'block',fontSize:'1.5rem'}}>
                        <Box sx={{width:'100%'}}>
                            <TrendingFlatIcon sx={{fontSize:'1.0rem', rotate:'180deg'}}/>
                            <Link
                                href="#" underline="hover"
                                onClick={()=>navigate(`${LOGIN_ROUTE}`)}
                                sx={{fontSize:'1.2rem'}}
                            >
                                Авторизация
                            </Link>
                        </Box>
                        <Box sx={{width:'100%',fontSize:'1.2rem',fontWeight:'700',marginTop: '10px'}}>
                            Восстановление пароля (Шаг 1 из 2)
                        </Box>
                    </Box>
                    <Box className="" autoComplete="off">
                        <Stack spacing={0} direction="column" sx={{width:'100%'}}>
                            <ThemeProvider theme={inputTheme}>
                                <FormControl variant="outlined">
                                    <Box sx={{width:'100%',fontSize:'1.1rem'}}>Введите ваш Email</Box>
                                    <OutlinedInput
                                        type="text"
                                        autocomplate="off"
                                        className="myInput"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
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
                                    Отправить письмо&nbsp;{loading ? <BtnLoader /> :''}
                                </Button>
                            </ThemeProvider>
                        </Stack>
                    </Box>
                    {messageMsg ? <Box><br/><Alert severity={messageType}>{messageMsg}</Alert></Box> : ""}
                </Box>
            </Box>
        </Box>
    )
};
export default PageUpdatePasswordMail;