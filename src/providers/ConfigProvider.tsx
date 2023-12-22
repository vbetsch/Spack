import React, { createContext, useReducer } from "react";
import type { Dispatch } from "react";
import type { Action } from "../types/ActionType.ts";
import { Outlet } from "react-router-dom";
import {
    ConfigActionEnum,
    ConfigReducer,
    ConfigState,
    initialConfigState,
} from "../reducers/ConfigReducer.ts";

const defaultValueType = {
    state: initialConfigState,
    dispatch: () => null,
};

export const ConfigContext = createContext<{
    state: ConfigState;
    dispatch: Dispatch<Action<ConfigActionEnum>>;
}>(defaultValueType);

export const ConfigProvider = (): React.ReactNode => {
    const [state, dispatch] = useReducer(ConfigReducer, initialConfigState);

    return (
        <ConfigContext.Provider value={{ state, dispatch }}>
            <Outlet />
        </ConfigContext.Provider>
    );
};
