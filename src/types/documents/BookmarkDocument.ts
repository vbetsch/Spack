import type { PostDocument } from "./PostDocument.ts";
import type { UserDocument } from "./UserDocument.ts";

export interface BookmarkDocument {
    post: PostDocument;
    user: UserDocument;
}
