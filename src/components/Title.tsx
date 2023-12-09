import React from "react";

interface TitleProperties {
    text: string;
}

export const Title = ({ text }: TitleProperties): React.ReactNode => {
    return <h1 className="title">{text}</h1>;
};
