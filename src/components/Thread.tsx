import React, { useEffect, useState } from "react";
import type { ThreadDocument } from "../types/objects/ThreadTypes.ts";
import type { PostDocument } from "../types/objects/PostTypes.ts";
import { useNavigate } from "react-router";
import { Counters } from "./Counters.tsx";
import { TagList } from "./tags/TagList.tsx";
import { Loading } from "./Loading.tsx";
import {getPostById} from "../database/queries/PostQueries.ts";

interface ThreadProperties {
    data: ThreadDocument;
}

export const Thread = ({ data }: ThreadProperties): React.ReactNode => {
    const [post, setPost] = useState<PostDocument | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        getPostById(data.post.id)
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
                    {loading && <Loading />}
                    {post?.content}
                </p>
                <TagList tags={data.tags} />
            </div>
        </div>
    );
};
