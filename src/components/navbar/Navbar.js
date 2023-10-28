import React from 'react';
import './Navbar.css';
import {NavLink} from 'react-router-dom';
import {PROJECTS_ROUTE} from "../../routes/consts";

function Navbar() {
    return (
        <div className="navbar">
            <div className="navbar__project">
                <NavLink to={PROJECTS_ROUTE}>
                    Все проекты
                </NavLink>
            </div>
        </div>
    );
}

export default Navbar;
