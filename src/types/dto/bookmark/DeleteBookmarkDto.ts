import {CreateBookmarkDto} from "./CreateBookmarkDto.ts";

export interface DeleteBookmarkDto extends CreateBookmarkDto{
    id: string;
}
