import { collection, doc, getDoc, getDocs } from "firebase/firestore";
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

export const getThreadById = async (id: string) => {
    try {
        const threadSnap = await getDoc(
            doc(db, DatabaseCollectionEnum.THREADS, id),
        );
        if (threadSnap) {
            return {
                id: threadSnap.id,
                ...threadSnap.data(),
            } as ThreadDocument;
        }
    } catch (e) {
        console.error(e);
    }
};
