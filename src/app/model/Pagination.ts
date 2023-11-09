import { Album } from "./Albums";

export interface AlbumPagination {

    albums: Album[],
    pageSize: number,
    currentPage: number,
    lastPage: number,
    ascending: boolean,
    start_idx: number,
    end_idx: number

}

export interface Pagination<T> {
    data: T[],
    pageSize: number,
    currentPage: number,
    lastPage: number,
    ascending: boolean,
    start_idx: number,
    end_idx: number
}