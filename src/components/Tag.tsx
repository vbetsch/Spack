import React from "react";

interface TagProperties {
    ref?: number;
    name: string;
}

export const Tag = ({ ref, name }: TagProperties): React.ReactNode => {
    return (
        <div key={ref} className="tag">
            <span>{name}</span>
        </div>
    );
};
