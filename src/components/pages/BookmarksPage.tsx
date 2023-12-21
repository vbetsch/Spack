import React, { useContext, useEffect, useState } from "react";
import type { BookmarkDocument } from "../../types/documents/BookmarkDocument.ts";
import { UserContext } from "../../providers/UserProvider.tsx";
import { Title } from "../Title.tsx";

export const BookmarksPage = (): React.ReactNode => {
    const { state } = useContext(UserContext);
    const [bookmarks, setBookmarks] = useState<BookmarkDocument[]>([]);

    useEffect(() => {
        if (state.currentUser != null) {
            setBookmarks(state.currentUser.bookmarks);
        }
    }, []);

    return (
        <div className="container">
            <Title text={"Bookmarks"} />
            {bookmarks?.length > 0 ? (
                bookmarks.map((bookmark, key) => (
                    // eslint-disable-next-line @typescript-eslint/no-base-to-string
                    <p key={key}>{bookmark.toString()}</p>
                ))
            ) : (
                <p>Vous avez aucun élément sauvegardé.</p>
            )}
        </div>
    );
};
