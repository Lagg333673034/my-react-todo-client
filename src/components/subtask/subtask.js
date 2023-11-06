import React,{useState} from 'react';
import {deleteSubtask,updateSubtask} from "../../actions/subtaskActions";
import {useDispatch,useSelector} from 'react-redux';
import './subtask.css';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import Card from '@mui/material/Card';
import {ThemeProvider,createTheme} from '@mui/material/styles';
import {buttonIconSmallTheme,buttonIconSmallHoverTheme} from '../../css/buttons';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UnpublishedIcon from '@mui/icons-material/Unpublished';

const Subtask = ({subtask}) => {
    const dispatch = useDispatch();
    /*--------------------------------------------------------------------------*/
    const updSubtask = (subtask) => {
        dispatch({type:'SUBTASK_CURRENT', payload: subtask});
        dispatch({type:'SUBTASK_MODAL_VISIBLE', payload: true});
    };
    const doneSubtask = (subtask) => {
        if(subtask && subtask._id && subtask.done && subtask.done === 'true'){
            dispatch(updateSubtask(subtask._id, {done: 'false'}));
        }else{
            dispatch(updateSubtask(subtask._id, {done: 'true'}));
        }
    };
    const delSubtask = (subtask) => {
        //dispatch(deleteSubtask(subtask._id));
        dispatch({type:'SUBTASK_CURRENT', payload: subtask});
        dispatch({type:'SUBTASK_DEL_CONFIRM_MODAL_VISIBLE', payload: true});
    };
    /*--------------------------------------------------------------------------*/
    return (
        <Card
            sx={{margin:'3px 3px 3px 3px',padding:'5px 10px 5px 10px',border:'1px solid #565bf76e',borderRadius:'10px'}}
            style={subtask.done && subtask.done !== 'false' ? {textDecoration:'line-through',background: '#b4b4b4'} : {}}
        >
            <Grid container direction="row" justifyContent="center" alignItems="flex-start">
                <Grid item xs sx={{padding:'5px'}}>
                    {subtask.description ? <div style={{width:'100%',fontSize:'1em',color:'gray',margin:'0',fontStyle:'italic'}}>
                            {subtask.description}</div> : ''}
                </Grid>
                <Grid item xs="auto">
                    <Stack spacing={1} direction="row">
                        <ThemeProvider theme={buttonIconSmallTheme}>
                            <IconButton color="primary" size="medium" sx={buttonIconSmallHoverTheme} onClick={() => doneSubtask(subtask)}>
                                {subtask.done && subtask.done !== 'false' ? <UnpublishedIcon /> : <CheckCircleIcon />}
                            </IconButton>
                            <IconButton color="success" size="medium" sx={buttonIconSmallHoverTheme} onClick={() => updSubtask(subtask)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton color="error" size="medium" sx={buttonIconSmallHoverTheme} onClick={() => delSubtask(subtask)}>
                                <DeleteIcon />
                            </IconButton>
                        </ThemeProvider>
                    </Stack>
                </Grid>
            </Grid>
        </Card>
    );
};

export default Subtask;