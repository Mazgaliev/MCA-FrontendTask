import { Album } from "../model/Albums";
import { AlbumPagination, Pagination } from "../model/Pagination";
import { Photo } from "../model/Photo";
import { PhotoPagination } from "../model/PhotoPagination";

export interface AppState {

    pickedAlbum: Album | undefined,
    pickedPhoto: Photo | undefined,
    albumsState: Album[],
    loadedAlbums: Album[],
    loading: boolean,
    index: number,
    ascending: boolean,

    pagination: AlbumPagination,
    photoPagination: PhotoPagination,

    pPag: Pagination<Photo> | undefined,
    aPag: Pagination<Album> | undefined,
}



export const initialState: AppState = {
    albumsState: [],
    loadedAlbums: [],
    pickedAlbum: undefined,
    pickedPhoto: undefined,
    loading: false,
    index: 1,
    ascending: true,
    pagination: {
        albums: [],
        currentPage: 1,
        lastPage: 1,
        ascending: true,
        pageSize: 2,
        start_idx: 1,
        end_idx: 3,
    },
    photoPagination: {

        photos: [],
        currentPage: 1,
        lastPage: 1,
        ascending: true,
        pageSize: 4,
        start_idx: 1,
        end_idx: 5,
    },

    aPag: undefined,
    pPag: undefined,


}