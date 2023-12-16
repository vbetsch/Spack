import type { ThreadDocument } from "./ThreadDocument.ts";
import type { UserDocument } from "./UserDocument.ts";
import type { BookmarkDocument } from "./BookmarkDocument.ts";

export interface PostDocument {
    id: string;
    createdDate: Date;
    modifiedDate: Date;
    content: string;
    creator: UserDocument;
    parent?: PostDocument;
    children: PostDocument[];
    thread: ThreadDocument;
    bookmarks: BookmarkDocument[];
    nbLikes: number;
    nbViews: number;
}
