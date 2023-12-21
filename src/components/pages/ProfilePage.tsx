import React, { useContext, useEffect, useState } from "react";
import { Title } from "../Title.tsx";
import { UserContext } from "../../providers/UserProvider.tsx";
import { UserActionEnum } from "../../reducers/UserReducer.ts";
import { LoadingButton } from "@mui/lab";
import type { PostDocument } from "../../types/documents/PostDocument.ts";
import type { AuthUser } from "../../types/AuthUserType.ts";

export const ProfilePage = (): React.ReactNode => {
    const lang = "fr";
    const userData = localStorage.getItem("@user");
    const [user, setUser] = useState<AuthUser | undefined>(undefined);
    const { state, dispatch } = useContext(UserContext);
    const [comments, setComments] = useState<PostDocument[]>([]);

    const logOut = (): void => {
        localStorage.removeItem("@user");
        dispatch({
            type: UserActionEnum.LOGOUT,
            payload: undefined,
        });
    };

    useEffect(() => {
        if (userData != null) {
            const dataUser = JSON.parse(userData);
            setUser({
                ...dataUser,
                createdAt: new Date(dataUser.createdAt * 1),
                lastLoginAt: new Date(dataUser.lastLoginAt * 1),
            });
        }
        if (state.currentUser != null) {
            setComments(state.currentUser.comments);
        }
    }, []);

    return (
        <div className="container">
            <Title text={"Profile"} />
            <p>
                <strong>UID</strong> : {user != null ? user.uid : "Loading..."}
            </p>
            <p>
                <strong>Créé le</strong> :{" "}
                {user != null
                    ? user.createdAt.toLocaleString(lang)
                    : "Loading..."}
            </p>
            <p>
                <strong>Dernière connexion</strong> :{" "}
                {user != null
                    ? user.lastLoginAt.toLocaleString(lang)
                    : "Loading..."}
            </p>
            <p>
                <strong>Email</strong> :{" "}
                {user != null ? user.email : "Loading..."}
            </p>
            <p>
                <strong>Comments</strong>
            </p>
            {comments?.length > 0 ? (
                comments.map((comment, key) => (
                    // eslint-disable-next-line @typescript-eslint/no-base-to-string
                    <p key={key}>{comment.toString()}</p>
                ))
            ) : (
                <p>Nothing</p>
            )}
            <LoadingButton variant="contained" onClick={logOut}>
                <span>Logout</span>
            </LoadingButton>
        </div>
    );
};
