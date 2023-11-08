import React from 'react';
import './comment.css';
import {useDispatch} from 'react-redux';
import moment from 'moment';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import {ThemeProvider,createTheme} from '@mui/material/styles';
import {buttonIconSmallTheme,buttonIconSmallHoverTheme} from '../../css/button';
import AddCommentIcon from '@mui/icons-material/AddComment';

const Comment = ({comment,lvl}) => {
    const dispatch = useDispatch();
    /*--------------------------------------------------------------------------*/
    let temp_lvl = Number(lvl)*20 + 5;
    if(temp_lvl > 100){
        temp_lvl=100;
    }
    /*--------------------------------------------------------------------------*/
    const addSubComment = (comment) => {
        dispatch({type:'COMMENT_TO_COMMENT', payload: comment});
        dispatch({type:'COMMENT_MODAL_VISIBLE', payload: true});
    };
    const delComment = (comment) => {
        dispatch({type:'COMMENT_CURRENT', payload: comment});
        dispatch({type:'COMMENT_DEL_CONFIRM_MODAL_VISIBLE', payload: true});
    };
    /*--------------------------------------------------------------------------*/
    return (
        <Card
            sx={{margin:'3px 3px 3px 3px',padding:'2px 5px 2px 5px',border:'1px solid #565bf76e',borderRadius:'10px'}}
            style={{marginLeft: `${temp_lvl}px`}}
        >
            <Grid container direction="row" justifyContent="center" alignItems="flex-start">
                <Grid item xs sx={{padding:'0px'}}>
                    <div style={{width:'100%',}}>
                        {comment.username ? <span>Пользователь: {comment.username}</span> : ''}
                        {comment.dateCreate ? <span>({moment(Number(comment.dateCreate)).format("DD.MM.YYYY -- HH:mm:ss")})</span> : ''}
                    </div>
                    <div style={{width:'100%',}}>
                        {comment.message ? <span>Сообщение: {comment.message}</span> : ''}
                    </div>
                </Grid>
                <Grid item xs="auto">
                    <Stack spacing={1} direction="row">
                        <ThemeProvider theme={buttonIconSmallTheme}>
                            <IconButton color="primary" size="medium" sx={buttonIconSmallHoverTheme} onClick={() => addSubComment(comment)}>
                                <AddCommentIcon />
                            </IconButton>
                            <IconButton color="error" size="medium" sx={buttonIconSmallHoverTheme} onClick={() => delComment(comment)}>
                                <DeleteIcon />
                            </IconButton>
                        </ThemeProvider>
                    </Stack>
                </Grid>
            </Grid>
        </Card>
    );
};

export default Comment;