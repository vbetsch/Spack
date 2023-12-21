import React, { useContext, useEffect, useState } from "react";
import { Tag } from "./Tag.tsx";
import type { ThreadDocument } from "../types/documents/ThreadDocument.ts";
import type { PostDocument } from "../types/documents/PostDocument.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBookmark as faBookmarkDefault,
    faHeart as faHeartDefault,
} from "@fortawesome/free-regular-svg-icons";
import {
    faBookmark as faBookmarkEnable,
    faHeart as faHeartEnable,
} from "@fortawesome/free-solid-svg-icons";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { UserContext } from "../providers/UserProvider.tsx";
import { useNavigate } from "react-router";
import { getPost, setNbLikes } from "../database/queries/PostQueries.ts";
import {
    addLikedPost,
    removeLikedPost,
} from "../database/queries/UserQueries.ts";
import { UserActionEnum } from "../reducers/UserReducer.ts";
import {
    createAndGetBookmark,
    deleteBookmark,
    searchBookmark,
} from "../database/queries/BookmarkQueries.ts";

interface ThreadProperties {
    data: ThreadDocument;
}

export const Thread = ({ data }: ThreadProperties): React.ReactNode => {
    const { state, dispatch } = useContext(UserContext);
    const [post, setPost] = useState<PostDocument | undefined>(undefined);
    const [loadingContent, setLoadingContent] = useState<boolean>(false);
    const [loadingCounters, setLoadingCounters] = useState<boolean>(false);
    const [likeType, setLikeType] = useState<IconProp>(faHeartDefault);
    const [bookmarkType, setBookmarkType] =
        useState<IconProp>(faBookmarkDefault);
    const [bookmarkId, setBookmarkId] = useState<string | undefined>(undefined);
    const navigate = useNavigate();

    // Toggle actions

    const toggleAction = (
        enableTrigger: boolean,
        toggleAction: (action: boolean) => void,
    ): void => {
        if (state.currentUser == null) {
            navigate("/login");
        } else {
            if (enableTrigger) {
                toggleAction(true);
            } else {
                toggleAction(false);
            }
        }
    };

    const toggleLike = (): void => {
        toggleAction(likeType === faHeartDefault, likeOrUnlikepost);
    };

    const toggleSave = (): void => {
        toggleAction(bookmarkType === faBookmarkDefault, saveOrUnsavepost);
    };

    // Actions

    const likeOrUnlikepost = (like: boolean) => {
        const icon = like ? faHeartEnable : faHeartDefault;
        const likeValue = like ? 1 : -1;
        const actionToLikedPosts = like ? addLikedPost : removeLikedPost;
        const authAction = like ? UserActionEnum.LIKE : UserActionEnum.UNLIKE;

        if (!post) {
            console.warn("The post is not yet loaded");
            return;
        }
        if (!state.currentUser) {
            console.warn("You are not login");
            return;
        }

        setLoadingCounters(true);

        setNbLikes(data, post, likeValue)
            .catch((e) => {
                console.error(e);
            })
            .finally(() => {
                setLoadingCounters(false);
            });

        actionToLikedPosts(
            state.currentUser.id,
            state.currentUser,
            post.id.toString(),
        )
            .then(() => {
                dispatch({
                    type: authAction,
                    payload: post.id.toString(),
                });
            })
            .catch((e) => {
                console.error(e);
            })
            .finally(() => {
                setLikeType(icon);
            });
    };

    const saveOrUnsavepost = (save: boolean) => {
        const icon = save ? faBookmarkEnable : faBookmarkDefault;
        // const actionToUserBookmarks = save
        //     ? addUserBookmark
        //     : removeUserBookmark;
        // const actionToPostBookmarks = save
        //     ? addPostBookmark
        //     : removePostBookmark;

        if (!post) {
            console.warn("The post is not yet loaded");
            return;
        }
        if (!state.currentUser) {
            console.warn("You are not login");
            return;
        }

        if (save) {
            createAndGetBookmark({
                postId: post.id,
                userId: state.currentUser.id,
            }).catch((e) => {
                console.error(e);
            });
        } else {
            if (!bookmarkId) {
                console.warn("Bookmark not found");
                return;
            }
            deleteBookmark({
                id: bookmarkId,
                postId: post.id,
                userId: state.currentUser.id,
            }).catch((e) => {
                console.error(e);
            });
        }

        setBookmarkType(icon);
    };

    useEffect(() => {
        if (post && state.currentUser) {
            searchBookmark(post.id, state.currentUser.id)
                .then((data) => {
                    if (!data) {
                        return;
                    }
                    console.log(
                        "(21/12/2023 23:10)  @reyks  [Thread.tsx:194 -  - ]  post  ",
                        post.nbLikes,
                        "data.id",
                        data.id,
                    );
                    setBookmarkId(data.id);
                })
                .catch((e) => {
                    console.error(e);
                });
        }
    }, []);

    useEffect(() => {
        setLoadingContent(true);
        setLoadingCounters(true);
        getPost(data)
            .then((post) => {
                if (!post) {
                    return;
                }

                setPost(post);

                if (state.currentUser?.likedPosts.includes(post.id)) {
                    setLikeType(faHeartEnable);
                } else {
                    setLikeType(faHeartDefault);
                }

                if (bookmarkId) {
                    setBookmarkType(faBookmarkEnable);
                } else {
                    setBookmarkType(faBookmarkDefault);
                }
            })
            .catch((e) => {
                console.error(e);
            })
            .finally(() => {
                setLoadingContent(false);
                setLoadingCounters(false);
            });
    }, []);

    return (
        <div className="thread">
            <div className="thread-left">
                <div onClick={toggleLike} className="counter">
                    <span className="text">
                        <span>
                            {loadingCounters
                                ? "--"
                                : post?.nbLikes != null
                                  ? post.nbLikes
                                  : 0}
                        </span>
                    </span>
                    <div className="icon">
                        <FontAwesomeIcon icon={likeType} />
                    </div>
                </div>
                <div onClick={toggleSave} className="counter">
                    <span className="text">
                        {loadingCounters
                            ? "--"
                            : post?.bookmarks != null
                              ? post.bookmarks.length
                              : 0}
                    </span>
                    <div className="icon">
                        <FontAwesomeIcon icon={bookmarkType} />
                    </div>
                </div>
            </div>
            <div className="thread-right">
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
