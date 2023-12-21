import React, { createContext, useReducer } from "react";
import type { Dispatch } from "react";
import { initialUserState, UserReducer } from "../reducers/UserReducer.ts";
import type { UserActionEnum, UserState } from "../reducers/UserReducer.ts";
import type { Action } from "../types/ActionType.ts";
import { Outlet } from "react-router-dom";

const defaultValueType = {
    state: initialUserState,
    dispatch: () => null,
};

export const UserContext = createContext<{
    state: UserState;
    dispatch: Dispatch<Action<UserActionEnum>>;
}>(defaultValueType);

export const UserProvider = (): React.ReactNode => {
    const [state, dispatch] = useReducer(UserReducer, initialUserState);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            <Outlet />
        </UserContext.Provider>
    );
};
