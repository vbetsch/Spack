import { User } from "firebase/auth";
import { Action } from "../types/ActionType";

export enum AuthActionEnum {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
}

export interface AuthState {
    currentUser: User | undefined;
}

export const initialAuthState: AuthState = {
    currentUser: undefined,
};

export const AuthReducer = (
    state: AuthState,
    action: Action<AuthActionEnum>,
) => {
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
