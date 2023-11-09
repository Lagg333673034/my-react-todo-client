import React,{useState,useEffect} from 'react';
import './modal.css';
import {useDispatch} from 'react-redux';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';


const WebsiteInfo = ({show}) => {
    const dispatch = useDispatch();
    /*--------------------------------------------------------------------------------*/
    const modalClose = () => {
        dispatch({type:'WEBSITE_INFO_MODAL_VISIBLE', payload: false});
    };
    /*--------------------------------------------------------------------------------*/
    return(
        <Modal open={show} onClose={modalClose}>
            <div className="modal">
                <div className="modal-main">
                    <div className="modal-title">
                        Информация о сайте
                    </div>
                    <div className="modal-content">
                        <table align="center" className="myTable">
                            <thead></thead>
                            <tbody>
                            <tr>
                                <th colSpan="2" style={{textAlign:'center'}}>
                                   Система "Планировщик задач"
                                </th>
                            </tr>
                            <tr>
                                <th colSpan="2">
                                    Клиентская часть (React.js)
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    npx
                                </th>
                                <td>
                                    create-react-app .
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    npm install
                                </th>
                                <td>
                                    react-router-dom<br/>
                                    react-redux<br/>
                                    redux<br/>
                                    redux-thunk<br/>
                                    axios<br/>
                                    moment<br/>
                                    react-beautiful-dnd<br/>
                                    @mui/material<br/>
                                    @mui/icons-material<br/>
                                    @emotion/react<br/>
                                    @emotion/styled
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Залит на
                                </th>
                                <td>
                                    https://www.netlify.com/
                                </td>
                            </tr>

                            <tr>
                                <th colSpan="2">
                                    Серверная часть (Node.js)
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    npm install
                                </th>
                                <td>
                                    express<br/>
                                    express-validator<br/>
                                    express-fileupload<br/>
                                    mongoose<br/>
                                    config<br/>
                                    uuid
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Залит на
                                </th>
                                <td>
                                    https://dashboard.render.com/
                                </td>
                            </tr>
                            </tbody>
                        </table>


                    </div>
                    <div className="modal-footer">
                        <Grid container direction="row" justifyContent="center" alignItems="center">
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
        </Modal>
    )
};

export default WebsiteInfo;