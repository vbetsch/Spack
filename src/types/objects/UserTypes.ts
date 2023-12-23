import type { ThreadDocument } from "./ThreadTypes.ts";
import type { BookmarkDocument } from "./BookmarkTypes.ts";
import {PostDocument} from "./PostTypes.ts";

export interface UserDocument {
    id: string;
    threads: ThreadDocument[];
    comments: PostDocument[];
    bookmarks: BookmarkDocument[];
    likedPosts: string[];
}

export interface UserCredentialsDto {
    email: string;
    password: string;
}
