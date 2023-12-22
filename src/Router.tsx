import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavbarPage } from "./components/templates/NavbarPage.tsx";
import { ThreadsPage } from "./components/pages/ThreadsPage.tsx";
import { RegisterPage } from "./components/pages/RegisterPage.tsx";
import { LoginPage } from "./components/pages/LoginPage.tsx";
import { ProfilePage } from "./components/pages/ProfilePage.tsx";
import { UserProvider } from "./providers/UserProvider.tsx";
import { ProtectedRoutes } from "./components/templates/ProtectedRoutes.tsx";
import { BookmarksPage } from "./components/pages/BookmarksPage.tsx";
import { ThreadPage } from "./components/pages/ThreadPage.tsx";
import { ConfigProvider } from "./providers/ConfigProvider.tsx";

export const Router = (): React.ReactNode => (
    <BrowserRouter basename={"/"}>
        <Routes>
            <Route element={<ConfigProvider />}>
                <Route element={<UserProvider />}>
                    <Route element={<NavbarPage />}>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route element={<ProtectedRoutes />}>
                            <Route index element={<ThreadsPage />} />
                            <Route path="/profile" element={<ProfilePage />} />
                            <Route
                                path="/bookmarks"
                                element={<BookmarksPage />}
                            />
                            <Route
                                path="/thread/:threadId"
                                element={<ThreadPage />}
                            />
                        </Route>
                    </Route>
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>
);
