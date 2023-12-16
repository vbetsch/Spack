import React, { useContext, useEffect, useState } from "react";
import { Title } from "../Title.tsx";
import { AuthContext } from "../../providers/AuthProvider.tsx";
import { AuthActionEnum } from "../../reducers/AuthReducer.ts";
import { LoadingButton } from "@mui/lab";
import type { BookmarkDocument } from "../../types/documents/BookmarkDocument.ts";
import type { PostDocument } from "../../types/documents/PostDocument.ts";
import type { AuthUser } from "../../types/AuthUserType.ts";

export const ProfilePage = (): React.ReactNode => {
    const lang = "fr";
    const userData = localStorage.getItem("@user");
    const [user, setUser] = useState<AuthUser | undefined>(undefined);
    const { state, dispatch } = useContext(AuthContext);
    const [bookmarks, setBookmarks] = useState<BookmarkDocument[]>([]);
    const [comments, setComments] = useState<PostDocument[]>([]);

    const logOut = (): void => {
        localStorage.removeItem("@user");
        dispatch({
            type: AuthActionEnum.LOGOUT,
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
            setBookmarks(state.currentUser.bookmarks);
            setComments(state.currentUser.comments);
        }
    }, []);

    return (
        <div className="container">
            <Title text={"Profile"} />
            <p>
                <strong>UID</strong> : {user?.uid}
            </p>
            <p>
                <strong>Créé le</strong> :{" "}
                {user?.createdAt.toLocaleString(lang)}
            </p>
            <p>
                <strong>Dernière connexion</strong> :{" "}
                {user?.lastLoginAt.toLocaleString(lang)}
            </p>
            <p>
                <strong>Email</strong> : {user?.email}
            </p>
            <p>
                <strong>Bookmarks</strong>
            </p>
            {bookmarks?.length > 0 ? (
                bookmarks.map((bookmark, key) => (
                    // eslint-disable-next-line @typescript-eslint/no-base-to-string
                    <p key={key}>{bookmark.toString()}</p>
                ))
            ) : (
                <p>Nothing</p>
            )}
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
