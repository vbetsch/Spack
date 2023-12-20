import React from "react";
import type { TagsEnum } from "../types/TagsEnum.ts";

interface TagProperties {
    name: TagsEnum;
}

export const Tag = ({ name }: TagProperties): React.ReactNode => {
    return (
        <div className="tag">
            <span>{name}</span>
        </div>
    );
};
