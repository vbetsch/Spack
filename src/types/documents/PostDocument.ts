import type { ThreadDocument } from "./ThreadDocument.ts";
import type { UserDocument } from "./UserDocument.ts";
import type { BookmarkDocument } from "./BookmarkDocument.ts";
import type { Timestamp } from "firebase/firestore";

export interface PostDocument {
    id: string;
    createdDate: Timestamp;
    modifiedDate: Timestamp;
    content: string;
    creator: UserDocument;
    parent?: PostDocument;
    children: PostDocument[];
    thread: ThreadDocument;
    bookmarks: BookmarkDocument[];
    nbLikes: number;
    nbViews: number;
}
