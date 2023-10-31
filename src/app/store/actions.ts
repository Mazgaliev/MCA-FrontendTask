import { createAction, props } from "@ngrx/store";
import { Album } from "../model/Albums";
import { CreatePhoto } from "../model/CreatePhoto";
import { Photo } from "../model/Photo";

const enum Actions {

    FETCH_ALBUMS = '[Albums] Get albums',
    FETCH_ALBUMS_SUCCESS = '[Albums] Get albums successfully',
    FETCH_ALBUMS_FAIL = '[Albums] Get albums fail',


    LOAD_ALBUM_PHOTOS = '[Albums] Load the photos of 1 more albums',
    LOAD_ALBUM_PHOTOS_SUCCESS = '[Albums] Load the photos of 1 more albums successfully',
    LOAD_ALBUM_PHOTOS_FAIL = '[Albums] Load the photos of 1 more albums fail',

    CLEAR_LOADED_ALBUM = '[Albums] Clear the loaded albums',
    CLEAR_PICKED_ALBUM = '[Albums] Clear picked album',
    CLEAR_PICKED_PHOTO = '[Photos] Clear picked photos',


    SET_CLICKED_ALBUM = '[Albums] Clicked album',
    SET_CLICKED_ALBUM_SUCCESS = '[Albums] Clicked album success',
    // SET_CLICKED_ALBUM_FAIL = '[Albums] Clicked album fail',

    DELETE_PHOTO = '[Photo] Delete photo',
    DELETE_PHOTO_SUCCESS = '[Photo] Delete photo successfully',
    DELETE_PHOTO_FAIL = '[Photo] Delete photo fail',

    EDIT_PHOTO_DATA = '[Photo] Edit photo data',
    EDIT_PHOTO_DATA_SUCCESS = '[Photo] Edit photo data successfully',
    EDIT_PHOTO_DATA_FAIL = '[Photo] Edit photo data failed',

    SAVE_PHOTO = '[Photo] Save photo',
    SAVE_PHOTO_SUCCESS = '[Photo] Save photo successfully'

}


export const savePhoto = createAction(
    Actions.SAVE_PHOTO,
    props<{ photoObject: CreatePhoto }>()
)

export const savePhotoSuccess = createAction(
    Actions.SAVE_PHOTO_SUCCESS,
    props<{ photo: Photo }>()
)

export const editPhotoData = createAction(
    Actions.EDIT_PHOTO_DATA,
    props<{ editedPhoto: Photo }>()
)
export const editPhotoDataSuccess = createAction(
    Actions.EDIT_PHOTO_DATA_SUCCESS,
    props<{ editedPhoto: Photo }>()
)

export const deletePhoto = createAction(
    Actions.DELETE_PHOTO,
    props<{ photoId: number }>()
)

export const deletePhotoSuccess = createAction(
    Actions.DELETE_PHOTO_SUCCESS,
    props<{ photoId: number }>()
)


export const clearPickedAlbum = createAction(
    Actions.CLEAR_PICKED_ALBUM,
)

export const clearPickedPhoto = createAction(
    Actions.CLEAR_PICKED_PHOTO,
)

export const clearLoadedAlbum = createAction(
    Actions.CLEAR_LOADED_ALBUM,
)

export const setClickedAlbum = createAction(
    Actions.SET_CLICKED_ALBUM,
    props<{ album: Album }>()
)
export const setClickedAlbumFail = createAction(
    Actions.SET_CLICKED_ALBUM,
)
export const fetchAlbums = createAction(
    Actions.FETCH_ALBUMS,
)
export const fetchAlbumsSuccess = createAction(
    Actions.FETCH_ALBUMS_SUCCESS,
    props<{ albums: Album[] }>()
)
export const fetchAlbumsFail = createAction(
    Actions.FETCH_ALBUMS_FAIL,
)

export const loadAlbumPhotos = createAction(
    Actions.LOAD_ALBUM_PHOTOS,
    props<{ albumId: number }>()
)
export const loadAlbumPhotosSuccess = createAction(
    Actions.LOAD_ALBUM_PHOTOS_SUCCESS,
    props<{ photos: Photo[], albumId: number }>()
)
export const loadAlbumPhotosFail = createAction(
    Actions.LOAD_ALBUM_PHOTOS_FAIL,
)