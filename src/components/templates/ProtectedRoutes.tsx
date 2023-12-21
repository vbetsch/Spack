import { useContext, useEffect } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "../../providers/AuthProvider.tsx";
import { Navigate, useLocation } from "react-router";
import { Outlet } from "react-router-dom";
import { getUser } from "../../database/queries/UserQueries.ts";
import { UserDocument } from "../../types/documents/UserDocument.ts";
import { AuthActionEnum } from "../../reducers/AuthReducer.ts";

export const ProtectedRoutes = (): ReactNode => {
    const user = localStorage.getItem("@user");
    const { state, dispatch } = useContext(AuthContext);
    const location = useLocation();

    useEffect(() => {
        getUser()
            .then((snap) => {
                if (snap != null) {
                    dispatch({
                        type: AuthActionEnum.LOGIN,
                        payload: {
                            id: snap.id,
                            ...snap.data(),
                        } as UserDocument,
                    });
                }
            })
            .catch((e) => {
                console.error(e);
            });
    }, [state.currentUser]);

    if (user == null) {
        console.warn(
            "You must be logged in to view this page. Redirection to the login page...",
        );
        // eslint-disable-next-line react/react-in-jsx-scope
        return <Navigate to="/login" state={{ from: location.pathname }} />;
    }

    // eslint-disable-next-line react/react-in-jsx-scope
    return <Outlet />;
};
