import React,{useState,useEffect} from 'react';
import './file.css';
import {downloadFile} from "../../api";
import {deleteFile} from "../../actions/fileActions";
import {useDispatch,useSelector} from 'react-redux';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import {ThemeProvider,createTheme} from '@mui/material/styles';
import {buttonIconSmallTheme,buttonIconSmallHoverTheme} from '../../css/button';
import DownloadIcon from '@mui/icons-material/Download';


const File = ({file}) => {
    const dispatch = useDispatch();
    /*--------------------------------------------------------------------------*/
    const taskCurrent = useSelector((state)=>state.taskReducer.taskCurrent);
    const [taskCurrentState, setTaskCurrentState] = useState(taskCurrent);
    useEffect(()=>{
        setTaskCurrentState(taskCurrent);
    },[taskCurrent]);
    /*--------------------------------------------------------------------------*/
    const delFile = (file) => {
        if(taskCurrentState && taskCurrentState._id && taskCurrentState._id.length>0){
            //dispatch(deleteFile(taskCurrentState._id,file.fileNameUuid));
            dispatch({type:'FILE_CURRENT', payload: file});
            dispatch({type:'FILE_DEL_CONFIRM_MODAL_VISIBLE', payload: true});
        }
    };
    /*--------------------------------------------------------------------------*/
    const dowFile = (file) => {
        if(taskCurrentState && taskCurrentState._id && taskCurrentState._id.length>0) {
            downloadFile(taskCurrentState._id, file.fileNameUuid, file);
        }
    };
    /*--------------------------------------------------------------------------*/
    return (
        <Card
            sx={{margin:'3px 3px 3px 3px',padding:'2px 5px 2px 5px',border:'1px solid #565bf76e',borderRadius:'10px'}}
        >
            <Grid container direction="row" justifyContent="center" alignItems="center">
                <Grid item xs sx={{padding:'0px'}}>
                    <div style={{width:'100%',}}>
                        {file.fileName ? <span>{file.fileName}</span> : ''}
                    </div>
                </Grid>
                <Grid item xs="auto">
                    <Stack spacing={1} direction="row">
                        <ThemeProvider theme={buttonIconSmallTheme}>
                            <IconButton color="primary" size="medium" sx={buttonIconSmallHoverTheme} onClick={() => dowFile(file)}>
                                <DownloadIcon />
                            </IconButton>
                            <IconButton color="error" size="medium" sx={buttonIconSmallHoverTheme} onClick={() => delFile(file)}>
                                <DeleteIcon />
                            </IconButton>
                        </ThemeProvider>
                    </Stack>
                </Grid>
            </Grid>
        </Card>
    );
};

export default File;