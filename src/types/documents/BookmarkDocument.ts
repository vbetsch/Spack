import type { PostDocument } from "./PostDocument.ts";
import type { UserDocument } from "./UserDocument.ts";

export interface BookmarkDocument {
    id: string;
    post: PostDocument;
    user: UserDocument;
}
