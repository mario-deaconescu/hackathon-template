import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
    User
} from "@nextui-org/react";
import {Link, NavLink, Outlet, useLocation} from "react-router-dom";
import routes from "../routes/routes.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store.tsx";
import React, {useMemo} from "react";
import Logo from "../assets/logo.png";
import {useMediaQuery} from "@react-hook/media-query";

const MainPage = () => {
    const currentUser = useSelector((state: RootState) => state.user.user);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const location = useLocation();
    const mobileQuery = useMediaQuery('only screen and (max-width: 768px)');
    const isActiveRoute = useMemo(() => (route?: string) => {
        if (route === undefined) return location.pathname === '/';
        return location.pathname.startsWith('/' + route);
    }, [location]);
    const navbarItems = useMemo(() => {
        const all = routes
            .find((route) => route.id === 'app')?.children
            ?.find((route) => route.id === 'main')?.children
            ?.filter((route) => {
                console.log(route.type)
                return route.type !== undefined && route.type.includes(currentUser?.type ?? '');
            }) ?? [];
        return all;
    }, [currentUser]);
    return (
        <div className="w-full h-full flex flex-col">
            <Navbar>
                <NavbarContent>
                    {mobileQuery && <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="sm:hidden"
                    />}
                    <NavbarBrand className="flex flex-row gap-3">
                        <img src={Logo} style={{
                            height: '40px',
                        }} alt="Logo"/>
                        <span className="text-xl font-semibold">
                        SkillWiz
                    </span>
                    </NavbarBrand>
                </NavbarContent>
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    {
                        navbarItems?.map((route) => (
                            <NavbarItem key={route.id} isActive={isActiveRoute(route.path)}>
                                <NavLink to={'/' + route.path ?? ''}> {route.id} </NavLink>
                            </NavbarItem>
                        ))
                    }
                </NavbarContent>
                <NavbarContent justify="end">
                    <Link to={'/profile/student'}>
                        <User name={currentUser?.name} description={currentUser?.email}
                              avatarProps={{src: ''}}/>
                    </Link>
                </NavbarContent>
                {
                    mobileQuery &&
                    <NavbarMenu>
                        {navbarItems.map((item, index) => (
                            <NavbarMenuItem key={`${item}-${index}`}>
                                <Link
                                    className="w-full"
                                    to={item.path ?? '/'}
                                >
                                    {item.id}
                                </Link>
                            </NavbarMenuItem>
                        ))}
                    </NavbarMenu>
                }
            </Navbar>
            <div className="flex-grow overflow-y-auto">
                <Outlet/>
            </div>
        </div>
    );
};

export default MainPage;
