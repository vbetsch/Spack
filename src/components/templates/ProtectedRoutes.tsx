import { ReactNode, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthProvider.tsx";
import { Navigate, useLocation } from "react-router";
import { AuthActionEnum } from "../../context/AuthReducer.ts";
import { Outlet } from "react-router-dom";

export const ProtectedRoutes = (): ReactNode => {
    const { dispatch } = useContext(AuthContext);
    const location = useLocation();
    const user = localStorage.getItem("@user");

    useEffect(() => {
        if (user) {
            dispatch({ type: AuthActionEnum.LOGIN, payload: JSON.parse(user) });
        }
    }, [user]);

    if (!user) {
        console.warn(
            "You must be logged in to view this page. Redirection to the login page...",
        );
        return <Navigate to="/login" state={{ from: location.pathname }} />;
    }

    return <Outlet />;
};
