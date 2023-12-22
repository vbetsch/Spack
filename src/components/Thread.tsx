import React, { useEffect, useState } from "react";
import { Tag } from "./Tag.tsx";
import type { ThreadDocument } from "../types/documents/ThreadDocument.ts";
import type { PostDocument } from "../types/documents/PostDocument.ts";
import { useNavigate } from "react-router";
import { getPost } from "../database/queries/PostQueries.ts";
import { Counters } from "./Counters.tsx";

interface ThreadProperties {
    data: ThreadDocument;
}

export const Thread = ({ data }: ThreadProperties): React.ReactNode => {
    const [post, setPost] = useState<PostDocument | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        getPost(data)
            .then((post) => {
                if (!post) {
                    return;
                }
                setPost(post);
            })
            .catch((e) => {
                console.error(e);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="thread">
            <Counters
                loading={loading}
                setLoading={setLoading}
                post={post}
                setPost={setPost}
            />
            <div
                className="thread-content"
                onClick={() => navigate(`/thread/${data.id}`)}
            >
                <span className="title">{data.title}</span>
                <p className="content">
                    {loading && "Loading..."}
                    {post?.content}
                </p>
                <div className="tags">
                    {data.tags.length > 0 &&
                        data.tags.map((tag, key) => (
                            <Tag key={key} name={tag} />
                        ))}
                </div>
            </div>
        </div>
    );
};
