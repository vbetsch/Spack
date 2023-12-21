import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.ts";
import { DatabaseCollectionEnum } from "../../types/DatabaseCollectionEnum.ts";
import { ThreadDocument } from "../../types/documents/ThreadDocument.ts";

export const getThreads = async () => {
    try {
        const querySnapshot = await getDocs(
            collection(db, DatabaseCollectionEnum.THREADS),
        );
        const threads: ThreadDocument[] = [];
        querySnapshot.forEach((doc) => {
            threads.push({ id: doc.id, ...doc.data() } as ThreadDocument);
        });
        return threads;
    } catch (e) {
        console.error(e);
    }
};
