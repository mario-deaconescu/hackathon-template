import {RouteObject} from "react-router-dom";
import App from "../App.tsx";
import RoleRoute from "./RoleRoute.tsx";
import LoginPage from "../auth/LoginPage.tsx";
import TestComponent from "../test/TestComponent.tsx";
import SignupPage from "../pages/SignupPage.tsx";
import Welcome from "../pages/Welcome.tsx";
import QuizesPage from "../pages/QuizesPage.tsx";
import MainPage from "../layout/MainPage.tsx";
import ProfileStudent from "../pages/ProfileStudent.tsx";

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
                path: 'signup/student',
                id: 'signup_student',
                element: <SignupPage type={'student'}/>
            },
            {
                path: 'signup/teacher',
                id: 'signup_teacher',
                element: <SignupPage type={'teacher'}/>
            },
            {
                id: 'main',
                element: <MainPage/>,
                children: [
                    {
                        id: 'quizes',
                        path: 'Quizes',
                        element: <QuizesPage/>
                    },
                    {
                        id: 'profile_student',
                        path: 'profile/student',
                        element: <ProfileStudent/>
                    }
                ]
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
