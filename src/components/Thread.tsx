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
    const [loadingContent, setLoadingContent] = useState<boolean>(false);
    const [loadingCounters, setLoadingCounters] = useState<boolean>(false);
    // const [bookmarkId, setBookmarkId] = useState<string | undefined>(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        setLoadingContent(true);
        setLoadingCounters(true);
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
                setLoadingCounters(false);
            });
    }, []);

    return (
        <div className="thread">
            <Counters
                loading={loadingCounters}
                setLoading={setLoadingCounters}
                post={post}
                setPost={setPost}
            />
            <div
                className="thread-content"
                onClick={() => navigate(`/thread/${data.id}`)}
            >
                <span className="title">{data.title}</span>
                <p className="content">
                    {loadingContent && "Loading..."}
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
