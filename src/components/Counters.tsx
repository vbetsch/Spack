import React, {
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBookmark as faBookmarkDefault,
    faHeart as faHeartDefault,
} from "@fortawesome/free-regular-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
    faBookmark as faBookmarkEnable,
    faHeart as faHeartEnable,
} from "@fortawesome/free-solid-svg-icons";
import {
    addLikedPost,
    removeLikedPost,
} from "../database/queries/UserQueries.ts";
import { UserActionEnum } from "../reducers/UserReducer.ts";
import { setNbLikes } from "../database/queries/PostQueries.ts";
import { UserContext } from "../providers/UserProvider.tsx";
import { useNavigate } from "react-router";
import { PostDocument } from "../types/objects/PostTypes.ts";

export interface CountersInterface {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    post?: PostDocument;
    setPost: Dispatch<SetStateAction<PostDocument | undefined>>;
}

export const Counters = ({
    loading,
    setLoading,
    post,
    setPost,
}: CountersInterface): React.ReactNode => {
    const { state, dispatch } = useContext(UserContext);
    const [likeType, setLikeType] = useState<IconProp>(faHeartDefault);
    const [bookmarkType, setBookmarkType] =
        useState<IconProp>(faBookmarkDefault);
    const navigate = useNavigate();

    // ------------------------------ TOGGLE ACTIONS ------------------------------

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

    // ------------------------------ ACTIONS ------------------------------

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

        setLoading(true);

        setNbLikes(post, likeValue)
            .then((result) => {
                if (!result) {
                    return;
                }
                const likes = post.nbLikes;
                const newPost = {
                    ...post,
                    nbLikes: likes + likeValue,
                };
                setPost(newPost);
            })
            .catch((e) => {
                console.error(e);
            })
            .finally(() => {
                setLoading(false);
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
        // TODO: const actionToUserBookmarks = save
        //     ? addUserBookmark
        //     : removeUserBookmark;
        // TODO: const actionToPostBookmarks = save
        //     ? addPostBookmark
        //     : removePostBookmark;

        // if (!post) {
        //     console.warn("The post is not yet loaded");
        //     return;
        // }
        // if (!state.currentUser) {
        //     console.warn("You are not login");
        //     return;
        // }
        //
        // if (save) {
        //     createAndGetBookmark({
        //         postId: post.id,
        //         userId: state.currentUser.id,
        //     }).catch((e) => {
        //         console.error(e);
        //     });
        // } else {
        //     if (!bookmarkId) {
        //         console.warn("Bookmark not found");
        //         return;
        //     }
        //     deleteBookmark({
        //         id: bookmarkId,
        //         postId: post.id,
        //         userId: state.currentUser.id,
        //     }).catch((e) => {
        //         console.error(e);
        //     });
        // }

        setBookmarkType(icon);
    };

    useEffect(() => {
        if (!post) {
            return;
        }

        if (state.currentUser?.likedPosts.includes(post.id)) {
            setLikeType(faHeartEnable);
        } else {
            setLikeType(faHeartDefault);
        }

        // if (bookmarkId) {
        //     setBookmarkType(faBookmarkEnable);
        // } else {
        //     setBookmarkType(faBookmarkDefault);
        // }

        // if (post && state.currentUser) {
        //     searchBookmark(post.id, state.currentUser.id)
        //         .then((data) => {
        //             if (!data) {
        //                 return;
        //             }
        //             setBookmarkId(data.id);
        //         })
        //         .catch((e) => {
        //             console.error(e);
        //         });
        // }
    }, [post]);

    return (
        <div className="counters">
            <div onClick={toggleLike} className="counter">
                <span className="text">
                    <span>
                        {loading
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
                    {loading
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
    );
};
