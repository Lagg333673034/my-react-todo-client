import React from 'react';
import {useDispatch} from 'react-redux';
import {deleteProject} from "../../actions/projectActions";
import './project.css';
import {useNavigate} from "react-router-dom";
import {TASKS_ROUTE} from "../../routes/consts";

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import Card from '@mui/material/Card';
import {ThemeProvider,createTheme} from '@mui/material/styles';
import {buttonIconProjectTheme} from '../../css/buttons';

const Project = ({project}) => {
    const dispatch = useDispatch();
    const router = useNavigate();
    /*----------------------------------------------------------------------------------*/
    const selectCurrentProject = () => {
        dispatch({type:'PROJECT_CURRENT', payload: project});
        router(`${TASKS_ROUTE}/${project._id}`);
    };
    const updCurrentProject = () => {
        dispatch({type:'PROJECT_CURRENT', payload: project});
        dispatch({type:'PROJECT_MODAL_VISIBLE', payload: true});
    };
    const delCurrentProject = (project) => {
        //dispatch(deleteProject(project._id));
        dispatch({type:'PROJECT_CURRENT', payload: project});
        dispatch({type:'PROJECT_DEL_CONFIRM_MODAL_VISIBLE', payload: true});
    };
    /*----------------------------------------------------------------------------------*/
    return (
        <Card sx={{padding:'5px 10px 5px 10px',border:'2px solid #565bf76e',borderRadius:'15px'}}>
            <Grid container direction="row" justifyContent="center" alignItems="flex-start">
                <Grid item xs sx={{padding:'5px'}}>
                    {project.title ?
                        <div style={{width:'100%',fontSize:'1.5em',color:'blue',margin:'0 0 5px 0'}}>
                            {project.title}</div> : ''}
                    {project.description ?
                        <div style={{width:'100%',fontSize:'1em',color:'gray',margin:'0',fontStyle:'italic'}}>
                            {project.description}</div> : ''}
                </Grid>
                <Grid item xs="auto">
                    <Stack spacing={1} direction="column">
                        <ThemeProvider theme={buttonIconProjectTheme}>
                            <IconButton color="primary" size="medium" onClick={selectCurrentProject}>
                                <FormatListNumberedIcon />
                            </IconButton>
                            <IconButton color="success" size="medium" onClick={updCurrentProject}>
                                <EditIcon />
                            </IconButton>
                            <IconButton color="error" size="medium" onClick={() => delCurrentProject(project)}>
                                <DeleteIcon />
                            </IconButton>
                        </ThemeProvider>
                    </Stack>
                </Grid>
            </Grid>
        </Card>
    );
};

export default Project;
