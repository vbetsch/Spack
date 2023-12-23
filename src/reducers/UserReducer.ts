import type { Action } from "../types/ActionType";
import type { UserDocument } from "../types/objects/UserTypes.ts";

export enum UserActionEnum {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    LIKE = "LIKE",
    UNLIKE = "UNLIKE",
}

export interface UserState {
    currentUser: UserDocument | undefined;
}

export const initialUserState: UserState = {
    currentUser: undefined,
};

export const UserReducer = (
    state: UserState,
    action: Action<UserActionEnum>,
): UserState => {
    switch (action.type) {
        case UserActionEnum.LOGIN:
            return {
                ...state,
                currentUser: action.payload as UserDocument | undefined,
            };
        case UserActionEnum.LOGOUT:
            return {
                ...state,
                currentUser: undefined,
            };
        case UserActionEnum.LIKE:
            if (state.currentUser == null) {
                console.warn("Can't save likes : no connected user found");
                return state;
            }
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
        case UserActionEnum.UNLIKE:
            if (state.currentUser == null) {
                console.warn("Can't save likes : no connected user found");
                return state;
            }
            if (state.currentUser.likedPosts == null) {
                console.warn(
                    "Can't save likes : you don't have liked post yet",
                );
                return state;
            }

            const postId = action.payload as string;
            const newLikedPosts = state.currentUser.likedPosts;
            const index = newLikedPosts.indexOf(postId);

            if (index === -1) {
                console.warn(
                    "Can't save likes : Impossible to remove this post to your LikedPosts",
                );
                return state;
            }

            newLikedPosts.splice(index, 1);

            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    likedPosts: newLikedPosts,
                },
            };
        default:
            return state;
    }
};
