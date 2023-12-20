import { DatabaseCollectionEnum } from "../../types/DatabaseCollectionEnum.ts";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase.ts";
import { UserDocument } from "../../types/documents/UserDocument.ts";
import { AuthUser } from "../../types/AuthUserType.ts";

export const getUser = async () => {
    const user = localStorage.getItem("@user");
    if (user != null) {
        const userData: AuthUser = JSON.parse(user);
        return await getDoc(
            doc(db, DatabaseCollectionEnum.USERS, userData.uid.toString()),
        );
    }
};

export const addLikedPost = async (
    userId: string,
    stateUser: UserDocument | undefined,
    postId: string,
) => {
    if (stateUser?.likedPosts == null) {
        await setDoc(doc(db, DatabaseCollectionEnum.USERS, userId), {
            ...stateUser,
            likedPosts: [postId],
        });
    } else {
        if (!stateUser?.likedPosts.includes(postId)) {
            // if (!postsIncludesPost(stateUser?.likedPosts, post)) {
            await setDoc(doc(db, DatabaseCollectionEnum.USERS, userId), {
                ...stateUser,
                likedPosts: [...stateUser.likedPosts, postId],
            });
        } else {
            console.warn("Post already liked");
        }
    }
};

export const removeLikedPost = async (
    userId: string,
    stateUser: UserDocument | undefined,
    postId: string,
) => {
    if (stateUser?.likedPosts != null) {
        if (stateUser?.likedPosts.includes(postId)) {
            // if (postsIncludesPost(stateUser?.likedPosts, post)) {
            const newLikedPosts = stateUser.likedPosts;
            const index = newLikedPosts.indexOf(postId);

            if (index !== -1) {
                newLikedPosts.splice(index, 1);

                await setDoc(doc(db, DatabaseCollectionEnum.USERS, userId), {
                    ...stateUser,
                    likedPosts: newLikedPosts,
                });
            } else {
                console.warn("Cannot remove this post to your LikedPosts");
            }
        } else {
            console.warn("Post already unliked");
        }
    } else {
        console.warn("You can't unlike a post");
    }
};
