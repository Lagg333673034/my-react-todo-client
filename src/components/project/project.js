import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
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
import {buttonIconTaskTheme,buttonIconTaskHoverTheme,buttonIconTaskSettingsTheme} from '../../css/button';
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
    //const projectSettingsMenuOpen = useSelector((state)=>state.projectReducer.projectSettingsMenuOpen);
    const [open, setOpen] = useState(false);
    const handleTooltipClose = () => {
        setOpen(false);
    };
    const handleTooltipOpen = () => {
        if(open){
            setOpen(false);
        }else{
            setOpen(true);
        }
    };
    useEffect(()=>{
        if(open){
            dispatch({type:'PROJECT_SETTINGS_MENU_OPEN', payload: true});
        }else{
            dispatch({type:'PROJECT_SETTINGS_MENU_OPEN', payload: false});
        }
    },[open]);
    /*----------------------------------------------------------------------------------*/
    return (
        <Card sx={{padding:'5px 10px 5px 10px',border:'2px solid #565bf76e',borderRadius:'15px'}}>
            <Grid container direction="row">
                <Grid item xs={12} sx={{padding:'5px'}}>
                    {project.title ?
                        <div style={{width:'100%',fontSize:'1.5em',color:'blue',margin:'0 0 5px 0'}}>
                            {project.title}</div> : ''}
                    {project.description ?
                        <div style={{width:'100%',fontSize:'1em',color:'gray',margin:'0',fontStyle:'italic'}}>
                            {project.description}</div> : ''}
                </Grid>
                <Grid item xs={12}>

                    <div style={{textAlign:'center'}}>
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
                                                  {
                                                      open ?
                                                          <CloseIcon/>
                                                          :
                                                          <SettingsTwoToneIcon/>
                                                  }
                                              </IconButton>
                                          </ThemeProvider>
                                      )
                                  )
                              )
                          }
                        </ClickAwayListener>
                    </div>


                </Grid>
            </Grid>
        </Card>
    );
};

export default Project;
