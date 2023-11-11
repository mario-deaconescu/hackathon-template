import {Navbar, NavbarBrand, NavbarContent, User} from "@nextui-org/react";
import {Link, NavLink, Outlet} from "react-router-dom";
import routes from "../routes/routes.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store.tsx";
import {useMemo} from "react";

const MainPage = () => {
    const currentUser = useSelector((state: RootState) => state.user.user);
    const navbarItems = useMemo(() => {
        const all = routes
            .find((route) => route.id === 'app')?.children
            ?.find((route) => route.id === 'main')?.children
            ?.filter((route) => route.id !== 'Profile' && route.id !== 'Default' && route.id !== 'Course');
        if (currentUser?.type === 'Student') {
            return all;
        } else if (currentUser?.type === 'Teacher') {
            return all?.filter((route) => route.id !== 'Quizes');
        }
    }, [currentUser]);
    return (
        <div className="w-full h-full flex flex-col">
            <Navbar>
                <NavbarBrand>4tzapoliunibuc</NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    {
                        navbarItems?.map((route) => (
                            <NavLink key={route.id} to={'/' + route.path ?? ''}>
                                {route.id}
                            </NavLink>
                        ))
                    }
                </NavbarContent>
                <NavbarContent justify="end">
                    <Link to={'/profile/student'}>
                        <User name={currentUser?.name} description={currentUser?.email}
                              avatarProps={{src: ''}}/>
                    </Link>
                </NavbarContent>
            </Navbar>
            <div className="flex-grow overflow-y-auto">
                <Outlet/>
            </div>
        </div>
    );
};

export default MainPage;
