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
    SET_PICKED_PHOTO = '[Photo] Set picked photo',
    SET_PICKED_PHOTO_SUCCESS = '[Photo] Set picked photo successfully',

    DELETE_PHOTO = '[Photo] Delete photo',
    DELETE_PHOTO_SUCCESS = '[Photo] Delete photo successfully',
    DELETE_PHOTO_FAIL = '[Photo] Delete photo fail',

    EDIT_PHOTO_DATA = '[Photo] Edit photo data',
    EDIT_PHOTO_DATA_SUCCESS = '[Photo] Edit photo data successfully',
    EDIT_PHOTO_DATA_FAIL = '[Photo] Edit photo data failed',

    SAVE_PHOTO = '[Photo] Save photo',
    SAVE_PHOTO_SUCCESS = '[Photo] Save photo successfully',

    FETCH_ALL_PHOTOS = '[Photo] fetch all photos',
    FETCH_ALL_PHOTOS_SUCCESS = '[Photo] fetch all photo success',

    //Pagination actions
    NEXT_PAGE = '[Pagination] go to next page',
    FIRST_PAGE = '[Pagination] go to first page',
    LAST_PAGE = '[Pagination] go to last page',
    PREVIOUS_PAGE = '[Pagination] go to previous page',
    LOAD_ALBUM_PAGE = '[Pagination] load album page',
    LOAD_ALBUM_PAGE_SUCCESS = '[Pagination] load album page success',
    CHANGE_PAGE_SIZE = '[Pagination] change page size',

}


export const changePageSize = createAction(
    Actions.CHANGE_PAGE_SIZE,
    props<{newPageSize:number}>()
    )

export const firstPage = createAction(
    Actions.FIRST_PAGE,
)
export const lastPage = createAction(
    Actions.LAST_PAGE,
)
export const nextPage = createAction(
    Actions.NEXT_PAGE

)
export const previousPage = createAction(
    Actions.PREVIOUS_PAGE
)


export const fetchAllPhotos = createAction(
    Actions.FETCH_ALL_PHOTOS,
)
export const fetchAllPhotosSuccess = createAction(
    Actions.FETCH_ALL_PHOTOS_SUCCESS,
    props<{ photos: Photo[] }>()
)
export const loadAlbumPage = createAction(
    Actions.LOAD_ALBUM_PAGE,
    props<{ albums: Album[] }>()
)

export const loadAlbumPageSuccess = createAction(
    Actions.LOAD_ALBUM_PAGE_SUCCESS,
    props<{ albums: Album[] }>()
)
export const clearPhoto = createAction(
    Actions.CLEAR_PICKED_PHOTO,

)

export const setPhoto = createAction(
    Actions.SET_PICKED_PHOTO,
    props<{ photo: Photo }>()
)

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