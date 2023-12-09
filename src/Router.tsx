import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavbarPage } from "./components/templates/NavbarPage.tsx";
import { ThreadsPage } from "./components/pages/ThreadsPage.tsx";

export const Router = (): React.ReactNode => (
    <BrowserRouter basename={"/"}>
        <Routes>
            <Route element={<NavbarPage />}>
                <Route index element={<ThreadsPage />}></Route>
                {/* <Route path="/register" element={<RegisterPage/>}/> */}
            </Route>
        </Routes>
    </BrowserRouter>
);
