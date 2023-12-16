import type { TagsEnum } from "../TagsEnum.ts";
import type { PostDocument } from "./PostDocument.ts";

export interface ThreadDocument {
    id: string;
    title: string;
    repository: string;
    post: PostDocument;
    tags: TagsEnum[];
}
