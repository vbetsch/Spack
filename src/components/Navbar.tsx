import React from "react";

export const Navbar = (): React.ReactNode => {
    return (
        <div id="navbar">
            <img className="logo" src="/img/spack.png" alt="Logo Spack" />
            <div className="right-part">
                <p className="links">Bookmarks</p>
                <p className="links">User</p>
            </div>
        </div>
    );
};
