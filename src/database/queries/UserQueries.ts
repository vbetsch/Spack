import { DatabaseCollectionEnum } from "../../types/DatabaseCollectionEnum.ts";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase.ts";
import type { UserDocument } from "../../types/objects/UserTypes.ts";
import type { AuthUser } from "../../types/AuthUserTypes.ts";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { FieldValues } from "react-hook-form";
import { FirebaseError } from "@firebase/util";

export const setAndGetUser = async (data: AuthUser) => {
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
        return await setAndGetUser(userCredential.user as unknown as AuthUser);
    } catch (error: unknown) {
        console.error(error);
        if (!(error instanceof FirebaseError)) {
            return "An error has occurred";
        }
        switch (error.code) {
            case "auth/invalid-credential":
                return "Les informations que vous avez renseignées sont fausses";
            case "auth/invalid-email":
                return "Le format de l'email est invalide";
            case "auth/email-already-in-use":
                return "L'email est déjà utilisé";
            case "auth/too-many-requests":
                return "Trop de requêtes envoyées au serveur. Patientez quelques instants...";
            default:
                return "Une erreur est survenue : " + error.code;
        }
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
    } catch (error: unknown) {
        console.error(error);
        if (!(error instanceof FirebaseError)) {
            return "An error has occurred";
        }
        switch (error.code) {
            case "auth/invalid-email":
                return "Le format de l'email est invalide";
            case "auth/email-already-in-use":
                return "L'email est déjà utilisé";
            case "auth/too-many-requests":
                return "Trop de requêtes envoyées au serveur. Patientez quelques instants...";
            case "auth/weak-password":
                return "Le mot de passe est trop faible";
            default:
                return "Une erreur est survenue : " + error.code;
        }
    }
};

export const addLikedPost = async (
    userId: string,
    stateUser: UserDocument | undefined,
    postId: string,
) => {
    if (!stateUser) {
        console.warn("User not found");
        return;
    }
    if (!stateUser.likedPosts) {
        try {
            await setDoc(doc(db, DatabaseCollectionEnum.USERS, userId), {
                ...stateUser,
                likedPosts: [postId],
            });
        } catch (e) {
            console.error(e);
        }
    } else {
        if (stateUser.likedPosts.includes(postId)) {
            console.warn("Post already liked");
            return;
        }
        try {
            await setDoc(doc(db, DatabaseCollectionEnum.USERS, userId), {
                ...stateUser,
                likedPosts: [...stateUser.likedPosts, postId],
            });
        } catch (e) {
            console.error(e);
        }
    }
};

export const removeLikedPost = async (
    userId: string,
    stateUser: UserDocument | undefined,
    postId: string,
) => {
    if (!stateUser) {
        console.warn("User not found")
        return;
    }
    if (!stateUser.likedPosts) {
        console.warn("You can't unlike a post");
        return;
    }
    if (!stateUser.likedPosts.includes(postId)) {
        console.warn("Post already unliked");
        return;
    }

    const newLikedPosts = stateUser.likedPosts;
    const index = newLikedPosts.indexOf(postId);

    if (index === -1) {
        console.warn("Cannot remove this post to your LikedPosts");
        return;
    }

    newLikedPosts.splice(index, 1);

    try {
        await setDoc(doc(db, DatabaseCollectionEnum.USERS, userId), {
            ...stateUser,
            likedPosts: newLikedPosts,
        });
    } catch (e) {
        console.error(e);
    }
};

export const addUserBookmark = () => {};
export const removeUserBookmark = () => {};
