import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../providers/UserProvider.tsx";

export const Navbar = (): React.ReactNode => {
    const { state } = useContext(UserContext);

    return (
        <div id="navbar">
            <Link className="logo" to={"/"}>
                <img src="/img/spack.png" alt="Logo Spack" />
            </Link>
            {state?.currentUser == null ? (
                <div className="right-part">
                    <Link className="links" to={"/register"}>
                        Register
                    </Link>
                    <Link className="links" to={"/login"}>
                        Login
                    </Link>
                </div>
            ) : (
                <div className="right-part">
                    <Link className="links" to={"/bookmarks"}>
                        Bookmarks
                    </Link>
                    <Link className="links" to={"/profile"}>
                        Profile
                    </Link>
                </div>
            )}
        </div>
    );
};
