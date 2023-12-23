export interface BookmarkDocument {
    id: string;
    postId: string;
    userId: string;
}

export interface CreateBookmarkDto {
    postId: string;
    userId: string;
}

export interface DeleteBookmarkDto extends CreateBookmarkDto {
    id: string;
}
