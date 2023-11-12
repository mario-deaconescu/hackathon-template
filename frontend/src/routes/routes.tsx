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
import HomePage from "../pages/Homepage.tsx";
import CoursesPage from "../pages/CoursesPage.tsx";
import DefaultPage from "../pages/DefaultPage.tsx";
import CoursePage from "../pages/CoursePage.tsx";
import RecruitPage from "../pages/RecruitPage.tsx";

type ExtendedRouteObject = Omit<RouteObject, 'children'> & {
    roles?: string[];
    auth?: boolean;
    children?: ExtendedRouteObject[];
    type?: string[];
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
                path: 'signup/recruiter',
                id: 'signup_recruiter',
                element: <SignupPage type={'recruiter'}/>
            },
            {
                id: 'main',
                element: <MainPage/>,
                children: [
                    {
                        index: true,
                        id: 'Default',
                        element: <DefaultPage/>
                    },
                    {
                        id: 'Quizes',
                        path: 'quizes',
                        type: ['Student'],
                        element: <QuizesPage/>
                    },
                    {
                        id: 'Profile',
                        path: 'profile/:id',
                        element: <ProfileStudent fromRoute={true}/>
                    },
                    {
                        id: 'CurrentProfile',
                        path: 'profile/student',
                        element: <ProfileStudent/>
                    },
                    {
                        id: 'Course',
                        path: 'courses/:id',
                        element: <CoursePage/>
                    },
                    {
                        id: 'Courses',
                        path: 'courses',
                        type: ['Teacher', 'Student'],
                        element: <CoursesPage/>
                    },
                    {
                        id: 'Recruit',
                        path: 'recruit',
                        type: ['Recruiter'],
                        element: <RecruitPage/>
                    }
                ]
            },
            {
                id: 'Welcome',
                path: 'welcome',
                element: <Welcome/>
            }
        ],
    },
    {
        path: '/home',
        element: <HomePage/>,
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
