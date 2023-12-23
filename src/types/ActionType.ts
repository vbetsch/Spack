import type { UserDocument } from "./objects/UserTypes.ts";
import type { PostDocument } from "./objects/PostTypes.ts";
import type { DocumentData } from "firebase/firestore";

export interface Action<T> {
    type: T;
    payload: DocumentData | UserDocument | PostDocument | undefined | string;
}
