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
import { AuthUser } from "../types/AuthUserType.ts";
import {
    addLikedPost,
    removeLikedPost,
} from "../database/queries/UserQueries.ts";
import { UserActionEnum } from "../reducers/UserReducer.ts";

interface ThreadProperties {
    data: ThreadDocument;
}

export const Thread = ({ data }: ThreadProperties): React.ReactNode => {
    const userData = localStorage.getItem("@user");
    const { state, dispatch } = useContext(UserContext);
    const [post, setPost] = useState<PostDocument | undefined>(undefined);
    const [loadingContent, setLoadingContent] = useState<boolean>(false);
    const [loadingCounters, setLoadingCounters] = useState<boolean>(false);
    const [likeType, setLikeType] = useState<IconProp>(faHeartDefault);
    const [bookmarkType] = useState<IconProp>(faBookmarkDefault);
    const navigate = useNavigate();

    let user: AuthUser | undefined;
    if (userData != null) {
        user = JSON.parse(userData);
    }

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

        setLikeType(icon);

        if (!post) {
            console.warn("The post is not yet loaded");
            return;
        }
        if (!user) {
            console.warn("You are not login");
            return;
        }

        setLoadingCounters(true);

        setNbLikes(data, post, likeValue).catch((e) => {
            console.error(e);
        });

        actionToLikedPosts(
            user.uid.toString(),
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
            });

        setLoadingCounters(false);
    };

    const saveOrUnsavepost = (save: boolean) => {
        // TODO: saveOrUnsavepost
        const icon = save ? faBookmarkEnable : faBookmarkDefault;

        setLikeType(icon);
        console.log("saveOrUnsavepost");
    };

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
            })
            .catch((e) => {
                console.error(e);
            })
            .finally(() => {
                setLoadingContent(false);
                setLoadingCounters(false);
            });
    }, [likeType]);

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
