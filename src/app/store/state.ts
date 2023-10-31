import { Album } from "../model/Albums";

export interface AppState {

    pickedAlbum: Album | undefined,
    albumsState: Album[],
    loadedAlbums: Album[],
    loading: boolean,
}

export const initialState: AppState = {
    albumsState: [],
    loadedAlbums: [],
    pickedAlbum: undefined,
    loading: true
}