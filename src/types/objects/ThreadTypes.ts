import type { TagsEnum } from "../TagsEnum.ts";
import type { PostDocument } from "./PostTypes.ts";

export interface ThreadDocument {
    id: string;
    title: string;
    repository?: string;
    post: PostDocument;
    tags: TagsEnum[];
}

export interface InitialThreadData {
    tags: TagsEnum[];
}

export interface CreateThreadDataDto {
    title: string;
    post: PostDocument;
}

export interface CreateThreadDto
    extends InitialThreadData,
        CreateThreadDataDto {}
