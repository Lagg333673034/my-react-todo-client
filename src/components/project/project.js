import React,{useState} from 'react';
import {useDispatch} from 'react-redux';
import './project.css';
import {useNavigate} from "react-router-dom";
import {TASKS_ROUTE} from "../../routes/consts";

import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import Card from '@mui/material/Card';
import {ThemeProvider,createTheme} from '@mui/material/styles';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import CloseIcon from '@mui/icons-material/Close';
import {MyTooltip} from  '../tooltip/tooltip';
import {buttonIconTaskTheme,buttonIconTaskHoverTheme,buttonIconTaskSettingsTheme} from '../../css/buttons';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';


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
        dispatch({type:'PROJECT_CURRENT', payload: project});
        dispatch({type:'PROJECT_DEL_CONFIRM_MODAL_VISIBLE', payload: true});
    };
    /*----------------------------------------------------------------------------------*/
    const [open, setOpen] = useState(false);
    const handleTooltipClose = () => {
        setOpen(false);
    };
    const handleTooltipOpen = () => {
        if(open){
            setOpen(false)
        }else{
            setOpen(true)
        }
    };
    /*----------------------------------------------------------------------------------*/
    return (
        <Card sx={{padding:'5px 10px 5px 10px',border:'2px solid #565bf76e',borderRadius:'15px'}}>
            <Grid container direction="column" justifyContent="center" alignItems="center">
                <Grid item xs={12} sx={{padding:'5px'}}>
                    {project.title ?
                        <div style={{width:'100%',fontSize:'1.5em',color:'blue',margin:'0 0 5px 0'}}>
                            {project.title}</div> : ''}
                    {project.description ?
                        <div style={{width:'100%',fontSize:'1em',color:'gray',margin:'0',fontStyle:'italic'}}>
                            {project.description}</div> : ''}
                </Grid>
                <Grid item xs={12}>
                    <ClickAwayListener onClickAway={handleTooltipClose}>
                        {
                            MyTooltip(
                                open,
                                handleTooltipClose,
                                <ThemeProvider theme={buttonIconTaskTheme}>
                                    <IconButton
                                        sx={buttonIconTaskHoverTheme}
                                        className="placementOn11"
                                        color="success"
                                        size="small"
                                        onClick={() => {
                                            updCurrentProject();
                                            handleTooltipClose()
                                        }}
                                    >
                                        <EditTwoToneIcon/>
                                    </IconButton>
                                </ThemeProvider>,
                                MyTooltip(
                                    open,
                                    handleTooltipClose,
                                    <ThemeProvider theme={buttonIconTaskTheme}>
                                        <IconButton
                                            sx={buttonIconTaskHoverTheme}
                                            className="placementOn01"
                                            color="primary"
                                            size="small"
                                            onClick={() => {
                                                selectCurrentProject();
                                                handleTooltipClose()
                                            }}
                                        >
                                            <FormatListNumberedIcon/>
                                        </IconButton>
                                    </ThemeProvider>,
                                    MyTooltip(
                                        open,
                                        handleTooltipClose,
                                        <ThemeProvider theme={buttonIconTaskTheme}>
                                            <IconButton
                                                sx={buttonIconTaskHoverTheme}
                                                className="placementOn06"
                                                color="error"
                                                size="small"
                                                onClick={() => {
                                                    delCurrentProject(project);
                                                    handleTooltipClose()
                                                }}
                                            >
                                                <DeleteForeverTwoToneIcon/>
                                            </IconButton>
                                        </ThemeProvider>,
                                        <ThemeProvider theme={buttonIconTaskSettingsTheme}>
                                            <IconButton
                                                sx={buttonIconTaskHoverTheme}
                                                color="primary"
                                                size="small"
                                                onClick={handleTooltipOpen}>
                                                {open ? <CloseIcon/> : <SettingsTwoToneIcon/>}
                                            </IconButton>
                                        </ThemeProvider>
                                    )
                                )
                            )
                        }
                    </ClickAwayListener>

                </Grid>
            </Grid>
        </Card>
    );
};

export default Project;
