import PageLogin from '../pages/PageLogin';
import PageManageUser from '../pages/PageManageUser';
import PageRegistration from '../pages/PageRegistration';
import PageRecoverPasswordMail from '../pages/PageRecoverPasswordMail';
import PageRecoverPassword from '../pages/PageRecoverPassword';
import PageProjects from '../pages/PageProjects';
import PageTasks from '../pages/PageTasks';
import {
    LOGIN_ROUTE,
    MANAGE_USERS_ROUTE,
    REGISTRATION_ROUTE,
    RECOVER_PASSWORD_MAIL_ROUTE,
    RECOVER_PASSWORD_ROUTE,
    PROJECTS_ROUTE, 
    TASKS_ROUTE
} from "./consts";
import Page404 from '../pages/Page404';

export const authUserRoutes = [
    {path: PROJECTS_ROUTE, component: <PageProjects/>, exact: true},
    {path: TASKS_ROUTE+'/:id', component: <PageTasks/>, exact: true},
    
    {path: LOGIN_ROUTE, component: <PageLogin/>, exact: true},
    {path: REGISTRATION_ROUTE, component: <PageRegistration/>, exact: true},
    {path: RECOVER_PASSWORD_MAIL_ROUTE, component: <PageRecoverPasswordMail/>, exact: true},
    {path: RECOVER_PASSWORD_ROUTE+'/:randomUuid', component: <PageRecoverPassword/>, exact: true},
    {path: '*', component: <Page404/>, exact: true},
];

export const authAdminRoutes = [
    {path: PROJECTS_ROUTE, component: <PageProjects/>, exact: true},
    {path: TASKS_ROUTE+'/:id', component: <PageTasks/>, exact: true},
    {path: MANAGE_USERS_ROUTE, component: <PageManageUser/>, exact: true},

    {path: LOGIN_ROUTE, component: <PageLogin/>, exact: true},
    {path: REGISTRATION_ROUTE, component: <PageRegistration/>, exact: true},
    {path: RECOVER_PASSWORD_MAIL_ROUTE, component: <PageRecoverPasswordMail/>, exact: true},
    {path: RECOVER_PASSWORD_ROUTE+'/:randomUuid', component: <PageRecoverPassword/>, exact: true},
    {path: '*', component: <Page404/>, exact: true},
];

export const notAuthRoutes = [
    {path: LOGIN_ROUTE, component: <PageLogin/>, exact: true},
    {path: REGISTRATION_ROUTE, component: <PageRegistration/>, exact: true},
    {path: RECOVER_PASSWORD_MAIL_ROUTE, component: <PageRecoverPasswordMail/>, exact: true},
    {path: RECOVER_PASSWORD_ROUTE+'/:randomUuid', component: <PageRecoverPassword/>, exact: true},
    {path: '*', component: <Page404/>, exact: true},
];


