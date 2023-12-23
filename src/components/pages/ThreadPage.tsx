import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getThreadById } from "../../database/queries/ThreadQueries.ts";
import { ThreadDocument } from "../../types/objects/ThreadTypes.ts";
import { Title } from "../Title.tsx";
import { Counters } from "../Counters.tsx";
import { PostDocument } from "../../types/objects/PostTypes.ts";
import { TagList } from "../tags/TagList.tsx";
import { Loading } from "../Loading.tsx";
import { getPostById } from "../../database/queries/PostQueries.ts";
import { ConfigContext } from "../../providers/ConfigProvider.tsx";

export const ThreadPage = (): React.ReactNode => {
    const { state } = useContext(ConfigContext);
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
                getPostById(data.post.id)
                    .then((post) => {
                        if (!post) {
                            return;
                        }
                        const dateCreated = new Date(
                            post.createdDate.seconds * 1000,
                        );
                        setPost({
                            ...post,
                            createdDate: dateCreated,
                            modifiedDate: post.modifiedDate
                                ? new Date(post.modifiedDate.seconds * 1000)
                                : dateCreated,
                        });
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
            {thread && (
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
                            {loading ? (
                                <Loading />
                            ) : (
                                <Title text={thread.title} />
                            )}
                            <div className="infos">
                                <div className="info">
                                    <p>
                                        Created{" "}
                                        <span>
                                            {loading ? (
                                                <Loading />
                                            ) : post && post.createdDate ? (
                                                post.createdDate.toLocaleDateString(
                                                    state.lang,
                                                )
                                            ) : (
                                                "unknown"
                                            )}
                                        </span>
                                    </p>
                                </div>
                                {/* TODO: Create "by creator" */}
                                <div className="info">
                                    <p>
                                        Modified{" "}
                                        <span>
                                            {loading ? (
                                                <Loading />
                                            ) : post && post.modifiedDate ? (
                                                post.modifiedDate.toLocaleDateString(
                                                    state.lang,
                                                )
                                            ) : (
                                                "unknown"
                                            )}
                                        </span>
                                    </p>
                                </div>
                                <div className="info">
                                    <p>
                                        Views{" "}
                                        <span>
                                            {loading ? (
                                                <Loading />
                                            ) : post && post.nbViews ? (
                                                post.nbViews
                                            ) : (
                                                "unknown"
                                            )}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="separator">
                                {thread.tags && <TagList tags={thread.tags} />}
                            </div>
                            <div className="content">
                                {loading ? <Loading /> : post && post.content}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
