import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import './userTable.css';
import {useNavigate} from "react-router-dom";

import Card from '@mui/material/Card';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import IconButton from '@mui/material/IconButton';
import BtnLoader from '../loader/btnLoader';


const UserTable = ({users}) => {
    const dispatch = useDispatch();
    const userLoading = useSelector((state)=>state.userReducer.userLoading);
    /*----------------------------------------------------------------------------------*/
    const updCurrent = (row) => {
        dispatch({type:'USER_CURRENT_ROW', payload: row});
        dispatch({type:'USER_MODAL_VISIBLE', payload: true});
    };
    const delCurrent = (row) => {
        dispatch({type: 'USER_CURRENT_ROW', payload: row});
        dispatch({type: 'USER_DEL_MODAL_VISIBLE', payload: true});
    };
    /*----------------------------------------------------------------------------------*/
    let npp = 1;
    /*----------------------------------------------------------------------------------*/
    return (
        <Card sx={{padding:'0px',border:'3px solid #565bf76e',borderRadius:'1px',backgroundColor:'#e7e7e7'}}>
            <table className="myDataTable">
                <thead>
                    <tr>
                        <th style={{width:'40px'}}>
                            {userLoading ? <BtnLoader /> : '№ п.п.'}
                        </th>
                        <th style={{width:'40px'}}></th>
                        <th>Email</th>
                        <th style={{width:'100px'}}>Роль</th>
                        <th style={{width:'40px'}}></th>
                    </tr>
                </thead>
                <tbody>
                    {users
                        .sort((a, b) => a.email.localeCompare(b.email))
                        .sort((a, b) => a.role.localeCompare(b.role))
                        .map((row,row_index) => (
                        <tr key={row_index}>
                            <td style={{textAlign:'center'}}>{npp++}</td>
                            <td style={{textAlign:'center'}}>
                                <IconButton className="myBtnUpd" onClick={()=> updCurrent(row)}>
                                    <EditTwoToneIcon/>
                                </IconButton>
                            </td>
                            <td>{row.email}</td>
                            <td>{row.role}</td>
                            <td style={{textAlign:'center'}}>
                                <IconButton className="myBtnDel" onClick={()=> delCurrent(row)}>
                                    <DeleteForeverTwoToneIcon/>
                                </IconButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Card>
    );
};

export default UserTable;
