import React from 'react';
import './Navbar.css';
import {NavLink} from 'react-router-dom';
import {PROJECTS_ROUTE} from "../../routes/consts";
import {useNavigate} from "react-router-dom";

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import HomeIcon from '@mui/icons-material/Home';

function Navbar() {
    const router = useNavigate();
    return (
        <Grid
            container direction="row" justifyContent="flex-start" alignItems="center"
            sx={{backgroundColor:'midnightblue',padding:'3px'}}
        >
            <Stack spacing={3} direction="row">
                <Button
                    variant="text" color="primary" size="small"
                    startIcon={<HomeIcon/>}
                    onClick={() => router(`${PROJECTS_ROUTE}`)}
                    sx={{alignItems:'flex-start',color:'#ffffff'}}
                >
                    Проекты
                </Button>
            </Stack>
        </Grid>
    );
}

export default Navbar;
