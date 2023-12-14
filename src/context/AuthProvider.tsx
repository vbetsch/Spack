import React, { createContext, Dispatch, useReducer } from "react";
import {
    AuthActionEnum,
    AuthState,
    initialAuthState,
    AuthReducer,
} from "./AuthReducer.ts";
import { Action } from "../types/ActionType.ts";
import { Outlet } from "react-router-dom";

const defaultValueType = {
    state: initialAuthState,
    dispatch: () => null,
};

export const AuthContext = createContext<{
    state: AuthState;
    dispatch: Dispatch<Action<AuthActionEnum>>;
}>(defaultValueType);

export const AuthProvider = (): React.ReactNode => {
    const [state, dispatch] = useReducer(AuthReducer, initialAuthState);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            <Outlet />
        </AuthContext.Provider>
    );
};
