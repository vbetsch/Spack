import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase.ts";
import { DatabaseCollectionEnum } from "../../types/DatabaseCollectionEnum.ts";
import {
    CreatePostDataDto,
    CreatePostDto,
    InitialPostDto, OriginalPostDocument,
    PostDocument,
} from "../../types/objects/PostTypes.ts";

export const getPostById = async (
    id: string,
): Promise<OriginalPostDocument | undefined> => {
    try {
        const postSnap = await getDoc(
            doc(db, DatabaseCollectionEnum.POSTS, id),
        );
        if (postSnap == null) {
            return;
        }
        return {
            id: postSnap.id,
            ...postSnap.data(),
        } as unknown as OriginalPostDocument;
    } catch (e) {
        console.error(e);
    }
};

export const createPost = async (data: CreatePostDataDto) => {
    try {
        console.log(
            "(23/12/2023 02:02)  @reyks  [PostQueries.ts:29 -  - createPost]  Math.floor(Date.now() / 1000)  ",
            Math.floor(Date.now() / 1000),
        );
        const initialPostData: InitialPostDto = {
            createdDate: Math.floor(Date.now() / 1000),
            bookmarks: [],
            nbLikes: 0,
            nbViews: 0,
        };
        const newPost: CreatePostDto = {
            ...initialPostData,
            ...data,
        };
        return await addDoc(
            collection(db, DatabaseCollectionEnum.POSTS),
            newPost,
        );
    } catch (e) {
        console.error(e);
    }
};

export const setNbLikes = async (
    post: PostDocument,
    toAdd: number,
): Promise<boolean> => {
    try {
        await setDoc(doc(db, DatabaseCollectionEnum.POSTS, post.id), {
            ...post,
            nbLikes: post.nbLikes + toAdd,
        });
        return true;
    } catch (e) {
        console.error(e);
    }
    return false;
};

export const addPostBookmark = () => {};
export const removePostBookmark = () => {};
