import React, { useContext } from "react";
import { Title } from "../Title.tsx";
import { AuthContext } from "../../context/AuthProvider.tsx";
import { AuthActionEnum } from "../../context/AuthReducer.ts";
import { LoadingButton } from "@mui/lab";

export const ProfilePage = (): React.ReactNode => {
    const { state, dispatch } = useContext(AuthContext);

    const logOut = (): void => {
        localStorage.removeItem("@user");
        dispatch({
            type: AuthActionEnum.LOGOUT,
            payload: undefined,
        });
    };

    const lang = "fr";
    let createdDate = new Date();
    let lastConnection = new Date();
    if (state.currentUser) {
        createdDate = new Date(state.currentUser?.createdAt*1);
        lastConnection = new Date(state.currentUser?.lastLoginAt*1);
    }

    return (
        <div className="container">
            <Title text={"Profile"} />
            <p><strong>Créé le</strong> : {createdDate.toLocaleString(lang)}</p>
            <p><strong>Dernière connexion</strong> : {lastConnection.toLocaleString(lang)}</p>
            <p><strong>Email</strong> : {state.currentUser?.email}</p>
            <LoadingButton variant="contained" onClick={logOut}>
                <span>Logout</span>
            </LoadingButton>
        </div>
    );
};
