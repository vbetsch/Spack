import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Loading } from "./Loading.tsx";

export interface ButtonProperties {
    img?: IconDefinition;
    text?: string;
    action: () => void;
    loading?: boolean;
}

export const Button = ({
    img,
    text,
    action,
    loading = false,
}: ButtonProperties): React.ReactNode => {
    return (
        <button
            className="button"
            style={loading ? { backgroundColor: "var(--grey)", cursor: "progress" } : {}}
            onClick={loading ? undefined : action}
        >
            {img && <FontAwesomeIcon icon={img} />}
            {loading ? <Loading /> : <span>{text}</span>}
        </button>
    );
};
