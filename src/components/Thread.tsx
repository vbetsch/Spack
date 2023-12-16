import React, { useEffect, useState } from "react";
import { Tag } from "./Tag.tsx";
import type { ThreadDocument } from "../types/documents/ThreadDocument.ts";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../database/firebase.ts";
import { DatabaseCollectionEnum } from "../types/DatabaseCollectionEnum.ts";

interface ThreadProperties {
    ref?: number;
    data: ThreadDocument;
}

export const Thread = ({ ref, data }: ThreadProperties): React.ReactNode => {
    const [content, setContent] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    const getPost = async (): Promise<void> => {
        setLoading(true);
        const postSnap = await getDoc(
            doc(db, DatabaseCollectionEnum.POSTS, data.post.id),
        );
        const postData = postSnap.data();
        if (postData != null) {
            setContent(postData.content);
        }
        setLoading(false);
    };

    useEffect(() => {
        getPost().catch(console.error);
    }, []);

    return (
        <div key={ref} className="thread">
            <span className="title">{data.title}</span>
            <p className="content">{loading ? "Loading..." : content}</p>
            <div className="tags">
                {data.tags.length > 0 &&
                    data.tags.map((tag, key) => <Tag key={key} name={tag} />)}
            </div>
        </div>
    );
};
