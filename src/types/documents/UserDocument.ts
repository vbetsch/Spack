import type { ThreadDocument } from "./ThreadDocument.ts";
import type { PostDocument } from "./PostDocument.ts";
import type { BookmarkDocument } from "./BookmarkDocument.ts";

export interface UserDocument {
    threads: ThreadDocument[];
    comments: PostDocument[];
    bookmarks: BookmarkDocument[];
}
