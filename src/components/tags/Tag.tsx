import React from "react";
import {TagsEnum} from "../../types/TagsEnum.ts";

export interface TagProperties {
    name: TagsEnum;
}

export const Tag = ({ name }: TagProperties): React.ReactNode => {
    return (
        <div className="tag">
            <span>{name}</span>
        </div>
    );
};
