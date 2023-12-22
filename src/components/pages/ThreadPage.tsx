import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getThreadById } from "../../database/queries/ThreadQueries.ts";
import { ThreadDocument } from "../../types/documents/ThreadDocument.ts";
import { Title } from "../Title.tsx";
import { Counters } from "../Counters.tsx";
import { getPost } from "../../database/queries/PostQueries.ts";
import { PostDocument } from "../../types/documents/PostDocument.ts";
import { TagList } from "../tags/TagList.tsx";
import { Loading } from "../Loading.tsx";

export const ThreadPage = (): React.ReactNode => {
    const { threadId } = useParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [thread, setThread] = useState<ThreadDocument | undefined>(undefined);
    const [post, setPost] = useState<PostDocument | undefined>(undefined);

    useEffect(() => {
        if (!threadId) {
            return;
        }

        getThreadById(threadId)
            .then((data) => {
                setLoading(true);
                if (!data) {
                    return;
                }
                setThread(data);
                getPost(data)
                    .then((post) => {
                        if (!post) {
                            return;
                        }
                        setPost(post);
                    })
                    .catch((e) => {
                        console.error(e);
                    });
            })
            .catch((e) => {
                console.error(e);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="container">
            {loading ? (
                <Loading />
            ) : (
                thread && (
                    <div className="thread-details">
                        <div className="left-part">
                            <Counters
                                loading={loading}
                                setLoading={setLoading}
                                post={post}
                                setPost={setPost}
                            />
                        </div>
                        <div className="right-part">
                            <div className="right-part-content">
                                <Title text={thread.title} />
                                <div className="infos">
                                    <div className="info">
                                        <p>
                                            Created{" "}
                                            <span>
                                                {loading && <Loading />}
                                                {post && post.createdDate
                                                    ? post.createdDate
                                                          .toDate()
                                                          .toDateString()
                                                    : "unknown"}
                                            </span>
                                        </p>
                                    </div>
                                    {/* TODO: Create "by creator" */}
                                    <div className="info">
                                        <p>
                                            Modified{" "}
                                            <span>
                                                {loading && <Loading />}
                                                {post && post.modifiedDate
                                                    ? post.modifiedDate
                                                          .toDate()
                                                          .toDateString()
                                                    : "unknown"}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="info">
                                        <p>
                                            Views{" "}
                                            <span>
                                                {loading && <Loading />}
                                                {post && post.nbViews
                                                    ? post.nbViews
                                                    : "unknown"}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <div className="separator">
                                    <TagList tags={thread.tags} />
                                </div>
                                <div className="content">
                                    {loading && <Loading />}
                                    {post && post.content}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    );
};
