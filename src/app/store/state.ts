import { Album } from "../model/Albums";
import { Pagination } from "../model/Pagination";
import { Photo } from "../model/Photo";
import { PhotoPagination } from "../model/PhotoPagination";

export interface AppState {

    pickedAlbum: Album | undefined,
    pickedPhoto: Photo | undefined,
    albumsState: Album[],
    loadedAlbums: Album[],
    loading: boolean,
    index: number,

    pagination: Pagination,
    photoPagination: PhotoPagination
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
    },
    photoPagination: {

        photos: [],
        currentPage: 1,
        lastPage: 1,
        pageSize: 4,
        start_idx: 1,
        end_idx: 5,
    }
}