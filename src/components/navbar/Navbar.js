import React from 'react';
import './Navbar.css';
import {useDispatch,useSelector} from 'react-redux';
import {PROJECTS_ROUTE} from "../../routes/consts";
import {useNavigate} from "react-router-dom";

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import HomeIcon from '@mui/icons-material/Home';
import HelpCenterTwoToneIcon from '@mui/icons-material/HelpCenterTwoTone';
import {ThemeProvider,createTheme} from '@mui/material/styles';
import {buttonTheme} from '../../css/button';
import WebsiteInfo from '../modal/websiteInfo';

function Navbar() {
    const router = useNavigate();
    const dispatch = useDispatch();
    const websiteInfoModalVisible = useSelector((state)=>state.websiteReducer.websiteInfoModalVisible);
    /*--------------------------------------------------------------------------*/

    /*--------------------------------------------------------------------------*/
    return (
        <>
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
                            onClick={() => router(`${PROJECTS_ROUTE}`)}
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
                </Grid>
            </Grid>
        </Grid>
        {websiteInfoModalVisible ? <WebsiteInfo show={websiteInfoModalVisible}/>  : ''}
        </>
    );
}

export default Navbar;
