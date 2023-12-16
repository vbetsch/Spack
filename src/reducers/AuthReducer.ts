import type { Action } from "../types/ActionType";
import type { UserDocument } from "../types/documents/UserDocument.ts";

export enum AuthActionEnum {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
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
                currentUser: action.payload,
            };
        case AuthActionEnum.LOGOUT:
            return {
                ...state,
                currentUser: undefined,
            };
        default:
            return state;
    }
};
