import type { UserDocument } from "./documents/UserDocument.ts";
import type { PostDocument } from "./documents/PostDocument.ts";
import type { DocumentData } from "firebase/firestore";

export interface Action<T> {
    type: T;
    payload: DocumentData | UserDocument | PostDocument | undefined | string;
}
