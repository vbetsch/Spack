import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase.ts";
import { DatabaseCollectionEnum } from "../../types/DatabaseCollectionEnum.ts";
import {
    CreateThreadDataDto,
    CreateThreadDto,
    InitialThreadData,
    ThreadDocument,
} from "../../types/objects/ThreadTypes.ts";

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

export const createThread = async (data: CreateThreadDataDto) => {
    try {
        const initialThreadData: InitialThreadData = {
            tags: [],
        };
        const newPost: CreateThreadDto = {
            ...initialThreadData,
            ...data,
        };
        return await addDoc(
            collection(db, DatabaseCollectionEnum.POSTS),
            newPost,
        );
    } catch (e) {
        console.error(e);
    }
};
