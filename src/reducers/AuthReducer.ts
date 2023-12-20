import type { Action } from "../types/ActionType";
import type { UserDocument } from "../types/documents/UserDocument.ts";

export enum AuthActionEnum {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    LIKE = "LIKE",
    UNLIKE = "UNLIKE",
}

export interface AuthState {
    currentUser: UserDocument | undefined;
}

export const initialAuthState: AuthState = {
    currentUser: undefined,
};

export const AuthReducer = (
    state: AuthState,
    action: Action<AuthActionEnum>,
): AuthState => {
    switch (action.type) {
        case AuthActionEnum.LOGIN:
            return {
                ...state,
                currentUser: action.payload as UserDocument | undefined,
            };
        case AuthActionEnum.LOGOUT:
            return {
                ...state,
                currentUser: undefined,
            };
        case AuthActionEnum.LIKE:
            if (state.currentUser != null) {
                if (state.currentUser.likedPosts == null) {
                    return {
                        ...state,
                        currentUser: {
                            ...state.currentUser,
                            likedPosts: [action.payload as string],
                        },
                    };
                } else {
                    return {
                        ...state,
                        currentUser: {
                            ...state.currentUser,
                            likedPosts: [
                                ...state.currentUser.likedPosts,
                                action.payload as string,
                            ],
                        },
                    };
                }
            } else {
                console.warn("Can't save likes : no connected user found");
                return state;
            }
        case AuthActionEnum.UNLIKE:
            if (state.currentUser != null) {
                if (state.currentUser.likedPosts != null) {
                    const postId = action.payload as string;
                    const newLikedPosts = state.currentUser.likedPosts;
                    const index = newLikedPosts.indexOf(postId);

                    if (index !== -1) {
                        newLikedPosts.splice(index, 1);

                        return {
                            ...state,
                            currentUser: {
                                ...state.currentUser,
                                likedPosts: newLikedPosts,
                            },
                        };
                    } else {
                        console.warn(
                            "Can't save likes : Impossible to remove this post to your LikedPosts",
                        );
                        return state;
                    }
                } else {
                    console.warn(
                        "Can't save likes : you don't have liked post yet",
                    );
                    return state;
                }
            } else {
                console.warn("Can't save likes : no connected user found");
                return state;
            }
        default:
            return state;
    }
};
