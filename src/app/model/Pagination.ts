import { Album } from "./Albums";

export interface Pagination {

    albums: Album[],
    pageSize: number,

    currentPage: number,
    lastPage: number,
    firstPage: number


}