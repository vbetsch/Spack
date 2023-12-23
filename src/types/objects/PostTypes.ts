import type { ThreadDocument } from "./ThreadTypes.ts";
import type { UserDocument } from "./UserTypes.ts";
import type { BookmarkDocument } from "./BookmarkTypes.ts";
import type { Timestamp } from "firebase/firestore";

export interface OriginalPostDocument {
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
export interface PostDocument {
    id: string;
    createdDate: Date;
    modifiedDate?: Date;
    content: string;
    creator: UserDocument;
    parent?: PostDocument;
    children: PostDocument[];
    thread: ThreadDocument;
    bookmarks: BookmarkDocument[];
    nbLikes: number;
    nbViews: number;
}

export interface InitialPostDto {
    createdDate: number;
    bookmarks: BookmarkDocument[];
    nbLikes: number;
    nbViews: number;
}

export interface CreatePostDataDto {
    content: string;
    parent?: PostDocument;
    creator: UserDocument;
}

export interface CreatePostDto extends InitialPostDto, CreatePostDataDto {}
