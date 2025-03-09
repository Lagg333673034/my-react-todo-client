import React from 'react';
import './Navbar.css';
import {useDispatch,useSelector} from 'react-redux';
import {useNavigate} from "react-router-dom";
import {
    PROJECTS_ROUTE,
    LOGIN_ROUTE,
    MANAGE_USERS_ROUTE
} from "../../routes/consts";
import {logout} from "../../actions/authActions";

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import HomeIcon from '@mui/icons-material/Home';
import HelpCenterTwoToneIcon from '@mui/icons-material/HelpCenterTwoTone';
import {ThemeProvider,createTheme} from '@mui/material/styles';
import {buttonTheme} from '../../css/button';
import WebsiteInfo from '../modal/websiteInfo';

import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
//import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';


function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const websiteInfoModalVisible = useSelector((state)=>state.websiteReducer.websiteInfoModalVisible);
    /*------------------------------------------------------------------*/
    const isAuth = useSelector((state)=>state.authReducer.isAuth);
    const authUser = useSelector((state)=>state.authReducer.authUser);
    const authLoading = useSelector((state)=>state.authReducer.authLoading);
    const tokenLoading = useSelector((state)=>state.authReducer.tokenLoading);
    //console.log(authUser.role);
    /*--------------------------------------------------------------------------*/
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    /*------------------------------------------------------------------*/
    return (
        <>
        {
            isAuth ? 
                <Grid
                    container direction="row" justifyContent="flex-start" alignItems="center"
                    sx={{backgroundColor:'midnightblue',padding:'3px'}}
                >
                    <Grid container direction="row" justifyContent="center" alignItems="center">
                        <Grid item xs="auto">
                            <ThemeProvider theme={buttonTheme}>
                                <Button
                                    variant="text" color="primary" size="small"
                                    startIcon={<HomeIcon/>}
                                    onClick={() => navigate(`${PROJECTS_ROUTE}`)}
                                >
                                    Проекты
                                </Button>
                            </ThemeProvider>
                        </Grid>
                        <Grid item xs></Grid>
                        <Grid item xs="auto">
                            <IconButton
                                sx={{color:'#00ff0ac9',margin:'0',padding:'0'}}
                                onClick={() => dispatch({type:'WEBSITE_INFO_MODAL_VISIBLE', payload: true})}
                            >
                                <HelpCenterTwoToneIcon sx={{fontSize:'2rem'}}/>
                            </IconButton>

                            <Box sx={{ display: 'inline', alignItems: 'center', textAlign: 'center' }}>
                                <Tooltip>
                                    <IconButton
                                        onClick={handleClick}
                                        size="small"
                                        sx={{ color:'#e5e5e5',padding:'0',fontSize:'0.9rem'}}
                                        aria-controls={open ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                    >
                                        <PersonIcon/> {authUser.email}
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                slotProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&:before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <MenuItem onClick={()=>{handleClose();dispatch(logout())}}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>
                        


                        </Grid>
                    </Grid>
                </Grid>
                : 
                <Grid
                    container direction="row" justifyContent="flex-start" alignItems="center"
                    sx={{backgroundColor:'midnightblue',padding:'3px'}}
                >
                    <Grid container direction="row" justifyContent="center" alignItems="center">
                        <Grid item xs={12}>
                            <ThemeProvider theme={buttonTheme}>
                                <Button
                                    variant="text" color="primary" size="small"
                                    startIcon={<HomeIcon/>}
                                    onClick={() => navigate(`${LOGIN_ROUTE}`)}
                                >
                                    Главная
                                </Button>
                            </ThemeProvider>
                        </Grid>
                    </Grid>
                </Grid>
        }
        {websiteInfoModalVisible ? <WebsiteInfo show={websiteInfoModalVisible}/>  : ''}
        </>
    );
}

export default Navbar;
