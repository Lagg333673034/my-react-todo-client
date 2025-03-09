import React,{useEffect,useState} from 'react';
import './App.css';

import {refresh} from "./actions/authActions";
import {useDispatch,useSelector} from 'react-redux';

import {BrowserRouter} from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import Navbar from './components/navbar/Navbar';
import Loader from './components/loader/loader';
import Background from './css/background/background';

function App() {
    const dispatch = useDispatch();
    const isAuth = useSelector((state)=>state.authReducer.isAuth);
    const authUser = useSelector((state)=>state.authReducer.authUser);
    const authLoading = useSelector((state)=>state.authReducer.authLoading);

    //console.log("isAuth=="+isAuth);
    //console.log("authUser=="+authUser.email);
    //console.log("token=="+localStorage.getItem('token'));
    /*-------------------------------------------------------------------------------*/
    const [tokenLoading,setTokenLoading] = useState(true);
    useEffect(()=>{
        if(localStorage.getItem('token')){
            dispatch(refresh());
        }
        setTokenLoading(false)
    },[]);
    /*-------------------------------------------------------------------------------*/
    return (
        <BrowserRouter>
            <div className="App">
                {/*<Background/>*/}
                <Navbar/>
                <AppRouter/>
            </div>
        </BrowserRouter>
    );
}

export default App;
