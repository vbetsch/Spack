import type { Action } from "../types/ActionType";

export enum ConfigActionEnum {
    SET_LANG = "SET_LANG",
}

export interface ConfigState {
    lang: string;
}

export const initialConfigState: ConfigState = {
    lang: "fr",
};

export const ConfigReducer = (
    state: ConfigState,
    action: Action<ConfigActionEnum>,
): ConfigState => {
    switch (action.type) {
        case ConfigActionEnum.SET_LANG:
            return {
                ...state,
                lang: action.payload as string,
            };
        default:
            return state;
    }
};
