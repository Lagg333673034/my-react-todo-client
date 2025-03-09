import React,{useState,useEffect} from 'react';
import './modal.css';
import {useDispatch,useSelector} from 'react-redux';
import {createUser,updateUser} from '../../actions/userActions';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {ThemeProvider,createTheme} from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import {inputTheme} from '../../css/input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


const UserModal = ({show}) => {
    const dispatch = useDispatch();
    /*--------------------------------------------------------------------------------*/
    const [userData,setUserData] = useState(useSelector((state)=>state.userReducer.userCurrentRow));
    useEffect(()=>{
        if(!userData || !userData.id || !userData.id>0){
            setUserData({...userData, role:'user'})
        }
        if(userData && userData.id && userData.id>0){
            setUserData({...userData, password:'********'})
        }
    },[]);
    /*--------------------------------------------------------------------------------*/
    const rowAdd = () => {
        dispatch(createUser(userData));
        modalClose();
    };
    const rowUpd = () => {
        if(userData && userData.id) {
            dispatch(updateUser(userData.id, userData));
        }
        modalClose();
    };
    /*--------------------------------------------------------------------------------*/
    const modalClose = () => {
        dispatch({type: "USER_CURRENT_ROW", payload: null});
        dispatch({type: 'USER_MODAL_VISIBLE', payload: false});
    };
    /*--------------------------------------------------------------------------------*/
    return(
        <div style={(show) ? {display: 'block'} : {display: 'none'}} className="modal">
            <div className="modal-main">
                <div className="modal-title">
                    {
                        userData && userData.id && userData.id>0 ?
                            'Редактировать'
                            :
                            'Добавить'
                    }
                </div>
                <div className="modal-content">
                    <Stack spacing={0} direction="column" sx={{width:'100%'}}>
                        <ThemeProvider theme={inputTheme}>
                            <TextField
                                label="Email"
                                variant="outlined"
                                size="small"
                                autoComplete="off"
                                value={userData && userData.email ? userData.email : ''}
                                onChange={(e) => setUserData({...userData, email: e.target.value})}
                            />
                            <TextField
                                label="Пароль"
                                variant="outlined"
                                size="small"
                                autoComplete="off"
                                value={userData && userData.password ? userData.password : ''}
                                onChange={(e) => setUserData({...userData, password: e.target.value})}
                            />
                            <FormControl>
                                <InputLabel>Роль</InputLabel>
                                <Select
                                    label="Роль"
                                    size="small"
                                    value={userData && userData.role ? userData.role : 'user'}
                                    onChange={(e) => setUserData({...userData, role: e.target.value})}
                                >
                                    <MenuItem value={'user'}>Пользователь</MenuItem>
                                    <MenuItem value={'admin'}>Админ</MenuItem>
                                </Select>
                            </FormControl>
                        </ThemeProvider>
                    </Stack>
                </div>
                <div className="modal-footer">
                    <Grid container direction="row" justifyContent="center" alignItems="center">
                        <Grid item xs="auto">
                            {userData && userData.id && userData.id>0 ?
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    startIcon={<SaveIcon/>}
                                    onClick={rowUpd}
                                >
                                    Сохранить
                                </Button>
                                :
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    startIcon={<AddIcon/>}
                                    onClick={rowAdd}
                                >
                                    Добавить
                                </Button>
                            }
                        </Grid>
                        <Grid item xs></Grid>
                        <Grid item xs="auto">
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                startIcon={<CloseIcon/>}
                                onClick={modalClose}
                            >
                                Закрыть
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    )
};

export default UserModal;