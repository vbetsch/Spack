import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase.ts";
import { DatabaseCollectionEnum } from "../../types/DatabaseCollectionEnum.ts";
import { PostDocument } from "../../types/documents/PostDocument.ts";
import { ThreadDocument } from "../../types/documents/ThreadDocument.ts";

export const getPost = async (
    thread: ThreadDocument,
): Promise<PostDocument | undefined> => {
    const postSnap = await getDoc(
        doc(db, DatabaseCollectionEnum.POSTS, thread.post.id),
    );
    if (postSnap == null) {
        return;
    } else {
        return {
            id: postSnap.id,
            ...postSnap.data(),
        } as unknown as PostDocument;
    }
};

export const setNbLikes = async (
    thread: ThreadDocument,
    post: PostDocument,
    toAdd: number,
): Promise<void> => {
    await setDoc(doc(db, DatabaseCollectionEnum.POSTS, thread.post.id), {
        ...post,
        nbLikes: post.nbLikes + toAdd,
    });
};
