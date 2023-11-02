import { Album } from "../model/Albums";
import { Photo } from "../model/Photo";

export interface AppState {

    pickedAlbum: Album | undefined,
    pickedPhoto: Photo | undefined,
    albumsState: Album[],
    loadedAlbums: Album[],
    loading: boolean,
}

export const initialState: AppState = {
    albumsState: [],
    loadedAlbums: [],
    pickedAlbum: undefined,
    pickedPhoto: undefined,
    loading: true
}