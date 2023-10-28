import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {routes} from "./routes";

const AppRouter = () => {
    return (
        <Routes>
            {routes.map((route, index) =>
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
