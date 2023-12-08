import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThreadsPage } from "./components/pages/ThreadsPage.tsx";

export const Router = (): React.ReactNode => (
    <BrowserRouter basename={"/"}>
        <Routes>
            <Route index element={<ThreadsPage />} />
            {/* <Route path="/register" element={<RegisterPage/>}/> */}
        </Routes>
    </BrowserRouter>
);
