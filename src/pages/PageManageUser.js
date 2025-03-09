import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import Loader from '../components/loader/loader';
import {fetchUsers} from "../actions/userActions";
import UserModal from "../components/modal/userModal";
import UserDelModal from "../components/modal/userDelModal";
import UserTable from "../components/userTable/userTable";

import {ThemeProvider,createTheme} from '@mui/material/styles';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button from '@mui/material/Button';
import {buttonTheme} from '../css/button';



const PageManageUser = ()=> {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch({type:"USER_FETCH_ALL",payload:null});
    },[]);
    /*--------------------------------------------------------------------------*/
    const userModalVisible = useSelector((state)=>state.userReducer.userModalVisible);
    const userDelModalVisible = useSelector((state)=>state.userReducer.userDelModalVisible);

    const userFetchAll = useSelector((state)=>state.userReducer.users);
    const userLoading = useSelector((state)=>state.userReducer.userLoading);
    /*------------------------------------------------------------------*/
    const [users, setUsers] = useState(userFetchAll);
    useEffect(()=>{
        if(!userLoading)
            setUsers(userFetchAll);
    },[userFetchAll,userLoading]);
    useEffect(()=>{
        dispatch(fetchUsers());
    },[]);
    /*------------------------------------------------------------------*/
    return(
        <div style={{padding:'10px'}}>
            <div className="titlePage">
                Пользователи
            </div>
            <div>
                <ThemeProvider theme={buttonTheme}>
                    <Button
                        disabled={userLoading}
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{width:'auto',marginBottom:'1px',backgroundColor:'#285697'}}
                        startIcon={<AddBoxIcon/>}
                        onClick={() => dispatch({type:'USER_MODAL_VISIBLE', payload: true})}
                    >
                        Добавить нового пользователя
                    </Button>
                </ThemeProvider>
            </div>
            {
                users &&
                users.length>0 ?
                    <UserTable users={users} />
                    : ''
            }
            {userModalVisible ? <UserModal show={userModalVisible}/>  : ''}
            {userDelModalVisible ? <UserDelModal show={userDelModalVisible}/>  : ''}
        </div>
    )
};
export default PageManageUser;