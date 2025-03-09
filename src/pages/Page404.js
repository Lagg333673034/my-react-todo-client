import React,{useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import {PROJECTS_ROUTE,LOGIN_ROUTE} from "../routes/consts";

function Page404() {
    /*---------------------------------------------------------------------*/
    const navigate = useNavigate();
    useEffect(()=>{
        navigate(LOGIN_ROUTE);
    });
    /*---------------------------------------------------------------------*/
    return(
        <div>
            "Page 404"
        </div>
    )
}

export default Page404;
