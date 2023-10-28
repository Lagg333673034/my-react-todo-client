import PageProjects from '../pages/PageProjects';
import PageTasks from '../pages/PageTasks';
import Page404 from '../pages/Page404';
import {PROJECTS_ROUTE, TASKS_ROUTE} from "./consts";

export const routes = [
    {path: PROJECTS_ROUTE, component: <PageProjects/>, exact: true},
    {path: TASKS_ROUTE+"/:id", component: <PageTasks/>, exact: true},
    {path: '*', component: <Page404/>, exact: true},
];