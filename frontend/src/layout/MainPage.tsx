import {Navbar, NavbarBrand, NavbarContent, User} from "@nextui-org/react";
import {NavLink, Outlet} from "react-router-dom";
import routes from "../routes/routes.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store.tsx";

const MainPage = () => {
    const navbarItems = routes
        .find((route) => route.id === 'app')?.children
        ?.find((route) => route.id === 'main')?.children;
    const currentUser = useSelector((state: RootState) => state.user.user);
    return (
        <>
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
                    <User name={currentUser?.name} description={currentUser?.email}
                          avatarProps={{src: ''}}/>
                </NavbarContent>
            </Navbar>
            <Outlet/>
        </>
    );
};

export default MainPage;
