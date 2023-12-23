import {
    addDoc,
    collection,
    getDoc,
    deleteDoc,
    doc,
    query,
    where,
    getDocs,
} from "firebase/firestore";
import { db } from "../firebase.ts";
import { DatabaseCollectionEnum } from "../../types/DatabaseCollectionEnum.ts";
import type { DocumentReference } from "firebase/firestore";
import {BookmarkDocument, CreateBookmarkDto, DeleteBookmarkDto} from "../../types/objects/BookmarkTypes.ts";

export const getBookmarkByDocRef = async (docRef: DocumentReference) => {
    try {
        return await getDoc(docRef);
    } catch (e) {
        console.error(e);
    }
};

export const searchBookmark = async (
    postId: string,
    userId: string,
): Promise<BookmarkDocument | undefined> => {
    try {
        const searchQuery = query(
            collection(db, DatabaseCollectionEnum.BOOKMARKS),
            where("postId", "==", postId),
            where("userId", "==", userId),
        );
        const querySnapshot = await getDocs(searchQuery);

        if (querySnapshot.size === 0) {
            return;
        }
        if (querySnapshot.size > 1) {
            console.warn("Multiple bookmarks were found");
            return;
        }

        return querySnapshot.docs[0] as unknown as BookmarkDocument;
    } catch (e) {
        console.error(e);
    }
};

export const createBookmark = async (data: CreateBookmarkDto) => {
    try {
        return await addDoc(
            collection(db, DatabaseCollectionEnum.BOOKMARKS),
            data,
        );
    } catch (e) {
        console.error(e);
    }
};

export const createAndGetBookmark = async (data: CreateBookmarkDto) => {
    try {
        const docRef = await createBookmark(data);
        if (!docRef) {
            console.warn("Impossible to create bookmark");
            return;
        }
        return await getBookmarkByDocRef(docRef);
    } catch (e) {
        console.error(e);
    }
};

export const deleteBookmark = async (data: DeleteBookmarkDto) => {
    try {
        const docRef = doc(db, DatabaseCollectionEnum.BOOKMARKS, data.id);
        await deleteDoc(docRef);
    } catch (e) {
        console.error(e);
    }
};
