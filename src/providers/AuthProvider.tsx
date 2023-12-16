import React, { createContext, useReducer } from "react";
import type { Dispatch } from "react";
import { initialAuthState, AuthReducer } from "../reducers/AuthReducer.ts";
import type { AuthActionEnum, AuthState } from "../reducers/AuthReducer.ts";
import type { Action } from "../types/ActionType.ts";
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
