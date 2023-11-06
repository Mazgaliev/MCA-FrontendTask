import { Album } from "../model/Albums";
import { Pagination } from "../model/Pagination";
import { Photo } from "../model/Photo";

export interface AppState {

    pickedAlbum: Album | undefined,
    pickedPhoto: Photo | undefined,
    albumsState: Album[],
    loadedAlbums: Album[],
    loading: boolean,
    index: number,

    pagination: Pagination,
}

export const initialState: AppState = {
    albumsState: [],
    loadedAlbums: [],
    pickedAlbum: undefined,
    pickedPhoto: undefined,
    loading: false,
    index: 1,
    pagination: {
        albums: [],
        pageSize: 2,
        firstPage: 1,
        lastPage: 1,
        currentPage: 1,
    }
}