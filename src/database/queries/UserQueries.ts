import { DatabaseCollectionEnum } from "../../types/DatabaseCollectionEnum.ts";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase.ts";
import type { UserDocument } from "../../types/documents/UserDocument.ts";
import type { AuthUser } from "../../types/AuthUserType.ts";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { FieldValues } from "react-hook-form";

export const setUser = async (data: AuthUser) => {
    try {
        localStorage.setItem("@user", JSON.stringify(data));
        return await getDoc(doc(db, DatabaseCollectionEnum.USERS, data.uid));
    } catch (e) {
        console.error(e);
    }
};

export const getUser = async () => {
    const user = localStorage.getItem("@user");
    if (user != null) {
        try {
            const userData: AuthUser = JSON.parse(user);
            return await getDoc(
                doc(db, DatabaseCollectionEnum.USERS, userData.uid.toString()),
            );
        } catch (e) {
            console.error(e);
        }
    }
};

export const signIn = async (data: FieldValues) => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            data.email,
            data.password,
        );
        return await setUser(userCredential.user as unknown as AuthUser);
    } catch (e) {
        console.error(e);
    }
};

export const createUser = async (data: FieldValues) => {
    try {
        const { user } = await createUserWithEmailAndPassword(
            auth,
            data.email,
            data.password,
        );
        await setDoc(doc(db, DatabaseCollectionEnum.USERS, user.uid), {});
    } catch (e) {
        console.error(e);
    }
};

export const addLikedPost = async (
    userId: string,
    stateUser: UserDocument | undefined,
    postId: string,
) => {
    if (stateUser?.likedPosts == null) {
        try {
            await setDoc(doc(db, DatabaseCollectionEnum.USERS, userId), {
                ...stateUser,
                likedPosts: [postId],
            });
        } catch (e) {
            console.error(e);
        }
    } else {
        if (!stateUser?.likedPosts.includes(postId)) {
            // if (!postsIncludesPost(stateUser?.likedPosts, post)) {
            try {
                await setDoc(doc(db, DatabaseCollectionEnum.USERS, userId), {
                    ...stateUser,
                    likedPosts: [...stateUser.likedPosts, postId],
                });
            } catch (e) {
                console.error(e);
            }
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

                try {
                    await setDoc(
                        doc(db, DatabaseCollectionEnum.USERS, userId),
                        {
                            ...stateUser,
                            likedPosts: newLikedPosts,
                        },
                    );
                } catch (e) {
                    console.error(e);
                }
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
