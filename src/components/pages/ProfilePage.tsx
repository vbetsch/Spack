import React, { useContext, useEffect, useState } from "react";
import { Title } from "../Title.tsx";
import { AuthContext } from "../../providers/AuthProvider.tsx";
import { AuthActionEnum } from "../../reducers/AuthReducer.ts";
import { LoadingButton } from "@mui/lab";
import type { BookmarkDocument } from "../../types/documents/BookmarkDocument.ts";
import { db } from "../../database/firebase.ts";
import { doc, getDoc } from "firebase/firestore";
import type { PostDocument } from "../../types/documents/PostDocument.ts";

export const ProfilePage = (): React.ReactNode => {
    const { state, dispatch } = useContext(AuthContext);
    const [bookmarksLoading, setBookmarksLoading] = useState<boolean>(false);
    const [commentsLoading, setCommentsLoading] = useState<boolean>(false);
    const [bookmarks, setBookmarks] = useState<BookmarkDocument[]>([]);
    const [comments, setComments] = useState<PostDocument[]>([]);

    const lang = "fr";
    let createdDate = new Date();
    let lastConnection = new Date();
    if (state.currentUser != null) {
        createdDate = new Date(state.currentUser?.createdAt * 1);
        lastConnection = new Date(state.currentUser?.lastLoginAt * 1);
    }

    const logOut = (): void => {
        localStorage.removeItem("@user");
        dispatch({
            type: AuthActionEnum.LOGOUT,
            payload: undefined,
        });
    };

    const getBookmarks = async (): Promise<void> => {
        if (state.currentUser != null) {
            setBookmarksLoading(true);
            const userSnap = await getDoc(
                doc(db, "users", state.currentUser.uid.toString()),
            );
            const user = userSnap.data();
            setBookmarksLoading(false);
            setBookmarks(user?.bookmarks);
        }
    };

    const getComments = async (): Promise<void> => {
        if (state.currentUser != null) {
            setCommentsLoading(true);
            const userSnap = await getDoc(
                doc(db, "users", state.currentUser.uid.toString()),
            );
            const user = userSnap.data();
            setCommentsLoading(false);
            setComments(user?.comments);
        }
    };

    useEffect(() => {
        getBookmarks().catch(console.error);
        getComments().catch(console.error);
    }, []);

    return (
        <div className="container">
            <Title text={"Profile"} />
            <p>
                <strong>UID</strong> : {state.currentUser?.uid}
            </p>
            <p>
                <strong>Créé le</strong> : {createdDate.toLocaleString(lang)}
            </p>
            <p>
                <strong>Dernière connexion</strong> :{" "}
                {lastConnection.toLocaleString(lang)}
            </p>
            <p>
                <strong>Email</strong> : {state.currentUser?.email}
            </p>
            <p>
                <strong>Bookmarks</strong>
            </p>
            {bookmarksLoading && <p>Loading...</p>}
            {!bookmarksLoading && bookmarks?.length > 0 ? (
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
            {commentsLoading && <p>Loading...</p>}
            {!commentsLoading && comments?.length > 0 ? (
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
