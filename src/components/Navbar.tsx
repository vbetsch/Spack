import React from "react";
import { Link } from "react-router-dom";

export const Navbar = (): React.ReactNode => {
    return (
        <div id="navbar">
            <Link className="logo" to={"/"}>
                <img src="/img/spack.png" alt="Logo Spack" />
            </Link>
            <div className="right-part">
                <Link className="links" to={"/register"}>
                    Register
                </Link>
                <Link className="links" to={"/login"}>
                    Login
                </Link>
            </div>
        </div>
    );
};
