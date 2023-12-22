import React, { useEffect, useState } from "react";
import { Title } from "../Title.tsx";
import type { ThreadDocument } from "../../types/documents/ThreadDocument.ts";
import { Thread } from "../Thread.tsx";
import { getThreads } from "../../database/queries/ThreadQueries.ts";
import { Loading } from "../Loading.tsx";
import { Button } from "../Button.tsx";
import { faPen } from "@fortawesome/free-solid-svg-icons";

export const ThreadsPage = (): React.ReactNode => {
    const [loading, setLoading] = useState<boolean>(false);
    const [threads, setThreads] = useState<ThreadDocument[] | undefined>(
        undefined,
    );

    const getAllThreads = () => {
        setLoading(true);
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
                setLoading(false);
            });
    };

    const writePost = () => {
        setLoading(true);
        setLoading(false);
    };

    useEffect(() => {
        getAllThreads();
    }, []);

    return (
        <div className="container">
            <div className="header">
                <Title text={"All posts"} />
                <Button
                    img={faPen}
                    text={"Write post"}
                    loading={loading}
                    action={writePost}
                />
            </div>
            <div className="threads">
                {loading && <Loading />}
                {threads?.map((thread, key) => (
                    <Thread key={key} data={thread} />
                ))}
            </div>
        </div>
    );
};
