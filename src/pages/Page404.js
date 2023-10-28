import React,{useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import {PROJECTS_ROUTE} from "../routes/consts";

function Page404() {
    const navigate = useNavigate();
    useEffect(()=>{
        navigate(PROJECTS_ROUTE);
    },[]);

    return(
        <div>

        </div>
    )
}

export default Page404;
