import React from "react";
import { Tag } from "./Tag";
import { TagsEnum } from "../../types/TagsEnum.ts";

interface TagListProperties {
    tags: Array<TagsEnum>;
}

export const TagList = ({ tags }: TagListProperties): React.ReactNode => {
    return (
        <div className="tags">
            {tags.length > 0 &&
                tags.map((tag, key) => <Tag key={key} name={tag} />)}
        </div>
    );
};
