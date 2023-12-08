import React from "react";
import { Navbar } from "../Navbar.tsx";

export const ThreadsPage = (): React.ReactNode => {
    return (
        <div className="page">
            <Navbar />
            <h1>All posts</h1>
        </div>
    );
};
