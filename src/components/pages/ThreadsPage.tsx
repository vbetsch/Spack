import React, { useContext, useEffect, useState } from "react";
import { Title } from "../Title.tsx";
import type {
    CreateThreadDataDto,
    ThreadDocument,
} from "../../types/objects/ThreadTypes.ts";
import { Thread } from "../Thread.tsx";
import { Loading } from "../Loading.tsx";
import { Button } from "../Button.tsx";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "../Modal.tsx";
import { CreateThreadForm } from "../forms/CreateThreadForm.tsx";
import { createPost, getPostById } from "../../database/queries/PostQueries.ts";
import { WritePostDto } from "../../types/dto/WritePostDto.ts";
import { CreatePostDataDto } from "../../types/objects/PostTypes.ts";
import { UserContext } from "../../providers/UserProvider.tsx";
import {
    createThread,
    getThreadById,
    getThreads,
} from "../../database/queries/ThreadQueries.ts";

export const ThreadsPage = (): React.ReactNode => {
    const { state } = useContext(UserContext);
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [threadsLoading, setThreadsLoading] = useState<boolean>(false);
    const [createThreadLoading, setCreateThreadLoading] =
        useState<boolean>(false);
    const [threads, setThreads] = useState<ThreadDocument[] | undefined>(
        undefined,
    );

    const getAllThreads = () => {
        setThreadsLoading(true);
        getThreads()
            .then((data) => {
                if (data) {
                    setThreads(data);
                } else {
                    console.warn("No threads were found");
                }
            })
            .catch((e) => {
                console.error(e);
            })
            .finally(() => {
                setThreadsLoading(false);
            });
    };

    useEffect(() => {
        getAllThreads();
    }, []);

    const createNewThread = async (data: WritePostDto) => {
        try {
            if (!state.currentUser) {
                console.warn("No current user found");
                return;
            }

            const postData: CreatePostDataDto = {
                content: data.content,
                creator: state.currentUser,
            };
            const postRef = await createPost(postData);

            if (!postRef) {
                console.warn("Impossible to create post");
                return;
            }

            const newPost = await getPostById(postRef.id);

            if (!newPost) {
                console.warn("Post created lost");
                return;
            }

            const threadData: CreateThreadDataDto = {
                title: data.title,
                post: newPost,
            };
            const threadRef = await createThread(threadData);

            if (!threadRef) {
                console.warn("Impossible to create thread");
                return;
            } else {
                return threadRef;
            }
        } catch (e) {
            console.error(e);
        }
    };

    const submitPost = (data: WritePostDto) => {
        setError(undefined);
        setCreateThreadLoading(true);

        createNewThread(data)
            .then((threadRef) => {
                if (!threadRef) {
                    return;
                }
                getThreadById(threadRef.id)
                    .then((thread) => {
                        if (!thread) {
                            return;
                        }

                        if (threads) {
                            setThreads([...threads, thread]);
                        } else {
                            setThreads([thread]);
                        }
                    })
                    .catch((e) => {
                        console.error(e);
                    });
            })
            .catch((e) => {
                setCreateThreadLoading(false);
                console.error(e);
            })
            .finally(() => {
                setCreateThreadLoading(false);
                setModalOpen(false);
            });
    };

    return (
        <div className="container">
            <Modal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                position={150}
                width={40}
            >
                <CreateThreadForm
                    title={"Write a post"}
                    loading={createThreadLoading}
                    backEndError={error}
                    textButton={"Write"}
                    onSubmit={submitPost}
                />
            </Modal>
            <div className="header">
                <Title text={"All posts"} />
                <Button
                    img={faPen}
                    text={"Write post"}
                    loading={createThreadLoading}
                    action={() => setModalOpen(true)}
                />
            </div>
            <div className="threads">
                {threadsLoading && <Loading />}
                {threads && threads.length > 0
                    ? threads.map((thread, key) => (
                          <Thread key={key} data={thread} />
                      ))
                    : "Aucun thread n'a encore été créé"}
            </div>
        </div>
    );
};
