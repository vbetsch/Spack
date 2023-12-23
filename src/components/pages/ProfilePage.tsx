import React, { useContext, useEffect, useState } from "react";
import { Title } from "../Title.tsx";
import { UserContext } from "../../providers/UserProvider.tsx";
import { UserActionEnum } from "../../reducers/UserReducer.ts";
import { LoadingButton } from "@mui/lab";
import type { PostDocument } from "../../types/objects/PostTypes.ts";
import type { AuthUser } from "../../types/AuthUserTypes.ts";
import { Loading } from "../Loading.tsx";
import { ConfigContext } from "../../providers/ConfigProvider.tsx";
import { OriginalAuthUser } from "../../types/AuthUserTypes.ts";

export const ProfilePage = (): React.ReactNode => {
    const configContext = useContext(ConfigContext);
    const userContext = useContext(UserContext);
    const userData = localStorage.getItem("@user");
    const [user, setUser] = useState<AuthUser | undefined>(undefined);
    const [comments, setComments] = useState<PostDocument[]>([]);

    const logOut = (): void => {
        localStorage.removeItem("@user");
        userContext.dispatch({
            type: UserActionEnum.LOGOUT,
            payload: undefined,
        });
    };

    useEffect(() => {
        if (userData != null) {
            const dataUser: OriginalAuthUser = JSON.parse(userData);
            setUser({
                ...dataUser,
                createdAt: new Date(Number(dataUser.createdAt)),
                lastLoginAt: new Date(Number(dataUser.lastLoginAt)),
            });
        }
        if (userContext.state.currentUser != null) {
            setComments(userContext.state.currentUser.comments);
        }
    }, []);

    return (
        <div className="container">
            <Title text={"Profil"} />
            <p>
                <strong>Créé le</strong> :{" "}
                {user != null && user.createdAt ? (
                    user.createdAt.toLocaleString(configContext.state.lang)
                ) : (
                    <Loading />
                )}
            </p>
            <p>
                <strong>Dernière connexion</strong> :{" "}
                {user != null && user.lastLoginAt ? (
                    user.lastLoginAt.toLocaleString(
                        configContext.state.lang,
                    )
                ) : (
                    <Loading />
                )}
            </p>
            <p>
                <strong>Email</strong> :{" "}
                {user != null ? user.email : <Loading />}
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
                <p>Aucun</p>
            )}
            <LoadingButton variant="contained" onClick={logOut}>
                <span>Logout</span>
            </LoadingButton>
        </div>
    );
};
