import { useContext, useEffect } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "../../providers/AuthProvider.tsx";
import { Navigate, useLocation } from "react-router";
import { AuthActionEnum } from "../../reducers/AuthReducer.ts";
import { Outlet } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../database/firebase.ts";
import type { AuthUser } from "../../types/AuthUserType.ts";
import { DatabaseCollectionEnum } from "../../types/DatabaseCollectionEnum.ts";

export const ProtectedRoutes = (): ReactNode => {
    const { dispatch } = useContext(AuthContext);
    const location = useLocation();
    const user = localStorage.getItem("@user");

    const getUser = async (): Promise<void> => {
        if (user != null) {
            const userData: AuthUser = JSON.parse(user);
            const userSnap = await getDoc(
                doc(db, DatabaseCollectionEnum.USERS, userData.uid.toString()),
            );
            dispatch({
                type: AuthActionEnum.LOGIN,
                payload: userSnap.data(),
            });
        }
    };

    useEffect(() => {
        getUser().catch(console.error);
    }, [user]);

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
