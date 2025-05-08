import React,{useEffect,useState} from 'react';
import './App.css';
import {refresh} from "./actions/authActions";
import {useDispatch} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import Navbar from './components/navbar/Navbar';
//import Background from './css/background/background';

function App() {
    const dispatch = useDispatch();
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
