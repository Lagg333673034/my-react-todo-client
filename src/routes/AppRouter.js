import React from 'react';
import {Routes, Route} from 'react-router-dom';
//import {routes} from "./routes";
import {authUserRoutes,authAdminRoutes,notAuthRoutes} from "./routes";
import {useDispatch,useSelector} from 'react-redux';

const AppRouter = () => {
    const isAuth = useSelector((state)=>state.authReducer.isAuth);
    const authUser = useSelector((state)=>state.authReducer.authUser);

    
    //console.log("isAuth(AppRouter)=="+isAuth);
    //console.log("authUser(AppRouter)=="+authUser.email);
    return (
        <Routes>
            {isAuth && authUser.role === 'user' && authUserRoutes.map((route, index) =>
                <Route
                    key={index}
                    exact={route.exact}
                    path={route.path}
                    element={route.component}>
                </Route>
            )}
            {isAuth && authUser.role === 'admin' && authAdminRoutes.map((route, index) =>
                <Route
                    key={index}
                    exact={route.exact}
                    path={route.path}
                    element={route.component}>
                </Route>
            )}
            {!isAuth && notAuthRoutes.map((route, index) =>
                <Route
                    key={index}
                    exact={route.exact}
                    path={route.path}
                    element={route.component}>
                </Route>
            )}
        </Routes>
    );
};

export default AppRouter;
