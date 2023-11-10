import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store.tsx";
import {Navigate, useLocation} from "react-router-dom";
import {Spinner} from "@nextui-org/react";

type Props = {
    children: React.ReactNode;
    requireAuth?: boolean
    roles?: string[];
}

const RoleRoute = ({children, roles, requireAuth}: Props) => {
    const isLoadingRoles = useSelector((store: RootState) => store.user.isLoading);
    const user = useSelector((store: RootState) => store.user.user);
    const currentRoles = (useSelector((store: RootState) => store.user.user?.roles) ?? []);
    const location = useLocation();
    if (isLoadingRoles) {
        return <Spinner/>
    }
    let hasRole = false;
    if (roles === undefined) {
        hasRole = true;
    } else {
        for (const role of currentRoles) {
            if (roles.includes(role)) {
                hasRole = true;
                break;
            }
        }
    }
    if (user === null && requireAuth) {
        return <Navigate to="/login" replace state={{
            returnUrl: location.pathname
        }}/>;
    }
    return hasRole ?
        children :
        <Navigate to="/login" replace state={{
            returnUrl: ''
        }}/>;
};

export default RoleRoute;
