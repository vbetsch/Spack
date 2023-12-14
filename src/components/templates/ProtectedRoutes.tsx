import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider.tsx";
import { Navigate, useLocation } from "react-router";
import { Outlet } from "react-router-dom";

export const ProtectedRoutes = (): React.ReactNode => {
    const { state } = useContext(AuthContext);
    const location = useLocation();

    if (!state.currentUser) {
        console.warn("You must be logged in to view this page. Redirection to the login page...")
        return <Navigate to="/login" state={{ from: location.pathname }} />;
    } else {
        return <Outlet />;
    }
};
