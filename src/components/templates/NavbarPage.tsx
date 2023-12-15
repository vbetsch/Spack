import React from "react";
import {Navbar} from "../Navbar.tsx";
import {Outlet} from "react-router-dom";

export const NavbarPage = (): React.ReactNode => {
    return (
        <div className="page">
            <Navbar />
            <Outlet />
        </div>
    );
};
