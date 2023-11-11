import {RouteObject} from "react-router-dom";
import App from "../App.tsx";
import RoleRoute from "./RoleRoute.tsx";
import LoginPage from "../auth/LoginPage.tsx";
import SignupPage from "../auth/SignupPage.tsx";
import TestComponent from "../test/TestComponent.tsx";
import Welcome from "../pages/Welcome.tsx";

type ExtendedRouteObject = Omit<RouteObject, 'children'> & {
    roles?: string[];
    auth?: boolean;
    children?: ExtendedRouteObject[];
}

const rawRoutes: ExtendedRouteObject[] = [
    {
        path: '/',
        element: <App/>,
        id: 'app',
        children: [
            {
                path: 'debug',
                id: 'debug',
                element: <TestComponent/>
            },
            {
                path: 'login',
                id: 'login',
                element: <LoginPage/>
            },
            {
                path: 'signup',
                id: 'signup',
                element: <SignupPage/>
            },
            {
                index: true,
                id: 'Home',
                element: <div>Home</div>,
                auth: true
            },
            {
                id: 'Welcome',
                path: 'welcome',
                element: <Welcome/>
            }

        ],
    }
];

const buildRoutes = (route: ExtendedRouteObject): ExtendedRouteObject => {
    if (route.roles !== undefined) {
        route.element = <RoleRoute roles={route.roles}>{route.element}</RoleRoute>;
    } else if (route.auth !== undefined) {
        route.element = <RoleRoute requireAuth={route.auth}>{route.element}</RoleRoute>;
    }
    if (route.children !== undefined) {
        route.children = route.children.map(buildRoutes);
    }
    return route;
}

const routes = rawRoutes.map(buildRoutes);

export default routes
