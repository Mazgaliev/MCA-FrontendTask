import { Photo } from "./Photo";

export interface PhotoPagination {
    photos: Photo[],
    pageSize: number,
    currentPage: number,
    lastPage: number,
    ascending: boolean,
    start_idx: number,
    end_idx: number
}