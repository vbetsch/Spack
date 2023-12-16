import React from "react";

interface TagProperties {
    name: string;
}

export const Tag = ({ name }: TagProperties): React.ReactNode => {
    return (
        <div className="tag">
            <span>{name}</span>
        </div>
    );
};
