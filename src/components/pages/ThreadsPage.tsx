import React, { useEffect, useState } from "react";
import { Title } from "../Title.tsx";
import type { ThreadDocument } from "../../types/documents/ThreadDocument.ts";
import { Thread } from "../Thread.tsx";
import { getThreads } from "../../database/queries/ThreadQueries.ts";
import {Loading} from "../Loading.tsx";

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

    useEffect(() => {
        getAllThreads();
    }, []);

    return (
        <div className="container">
            <Title text={"All posts"} />
            <div className="threads">
                {loading && <Loading />}
                {threads?.map((thread, key) => (
                    <Thread key={key} data={thread} />
                ))}
            </div>
        </div>
    );
};
