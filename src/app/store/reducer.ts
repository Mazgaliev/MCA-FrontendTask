import { createReducer, on } from "@ngrx/store";
import { changePageSize, clearLoadedAlbum, clearPickedAlbum, clearPickedPhoto, deletePhoto, deletePhotoSuccess, editPhotoData, editPhotoDataSuccess, fetchAlbums, fetchAlbumsSuccess, fetchAllPhotosSuccess, firstPage, lastPage, loadAlbumPageSuccess, loadAlbumPhotos, loadAlbumPhotosSuccess, nextPage, previousPage, savePhotoSuccess, setClickedAlbum, setPhoto } from "./actions";
import { initialState } from "./state";


export const reducer = createReducer(
    initialState,
    on(fetchAlbumsSuccess, (state, { albums }) => ({
        ...state,
        albumsState: [...albums],
        loading: false,
        pagination: { ...state.pagination, lastPage: Math.round(albums.length / state.pagination.pageSize) }
    })),
    on(fetchAlbums, (state) => ({
        ...state,
        loading: true
    })),
    on(loadAlbumPhotos, (state,) => ({
        ...state,
        loading: true
    })),
    on(loadAlbumPhotosSuccess, (state, { photos, albumId }) => ({
        ...state,
        albumsState: state.albumsState.map((val, index) => val.id == albumId ? { ...val, photos: photos } : val),
        loadedAlbums: [...state.loadedAlbums, ...state.albumsState.filter((album) => album.id == albumId).map((val, index) => val.id == albumId ? { ...val, photos: photos } : val)],
        loading: false

    })),
    on(setClickedAlbum, (state, { album }) => ({
        ...state,
        pickedAlbum: album,
    })),

    on(clearLoadedAlbum, (state) => ({
        ...state,
        loadedAlbums: [],

    })),
    on(clearPickedAlbum, (state) => ({
        ...state,
        pickedAlbum: undefined
    })),
    on(deletePhoto, (state) => ({
        ...state,
        loading: true
    })),
    on(deletePhotoSuccess, (state, photoId) => ({
        ...state,
        pickedAlbum: {
            id: state.pickedAlbum!.id,
            userId: state.pickedAlbum!.userId,
            title: state.pickedAlbum!.title,
            photos: state.pickedAlbum!.photos.filter(photo => photo.id != photoId.photoId),
        },
        pickedPhoto: undefined,
        loading: false
    })),
    on(editPhotoData, (state) => ({
        ...state,
        loading: true
    })),
    on(editPhotoDataSuccess, (state, { editedPhoto }) => ({
        ...state,
        pickedAlbum: {
            id: state.pickedAlbum!.id,
            userId: state.pickedAlbum!.userId,
            title: state.pickedAlbum!.title,
            photos: state.pickedAlbum!.photos
                .map(photo => photo.id == editedPhoto.id ? { ...photo, title: editedPhoto.title, url: editedPhoto.url, thumbnailUrl: editedPhoto.thumbnailUrl } : photo)
        },
        pickedPhoto: {
            id: editedPhoto.id,
            albumId: editedPhoto.albumId,
            url: editedPhoto.url,
            thumbnailUrl: editedPhoto.thumbnailUrl,
            title: editedPhoto.title
        },
        loading: false
    })),
    on(savePhotoSuccess, (state, { photo }) => ({
        ...state,
        pickedAlbum: {
            id: state.pickedAlbum!.id,
            userId: state.pickedAlbum!.userId,
            title: state.pickedAlbum!.title,
            photos: [photo, ...state.pickedAlbum!.photos]
        }
    })),
    on(setPhoto, (state, { photo }) => ({
        ...state,
        pickedPhoto: photo
    })),
    on(clearPickedPhoto, (state) => ({
        ...state,
        pickedPhoto: undefined
    })),
    on(loadAlbumPageSuccess, (state, { albums }) => ({
        ...state,
        pagination: { ...state.pagination, albums: albums }
    })),
    on(fetchAllPhotosSuccess, (state, { photos }) => ({
        ...state,
        albumsState: state.albumsState.map(album => ({
            ...album,
            photos: photos.filter(p => p.albumId === album.id)
        }))
    })),
    on(firstPage, (state) => ({
        ...state,
        pagination: {
            ...state.pagination,
            currentPage: 1,
            albums: state.albumsState.filter(album => (album.id >= 1 && album.id < 1 + state.pagination.pageSize))
        },
        index: 1 + state.pagination.pageSize
    })),
    on(nextPage, (state) => ({
        ...state,
        pagination: {
            ...state.pagination,
            currentPage: state.pagination.currentPage + 1 > state.pagination.lastPage ? state.pagination.currentPage : state.pagination.currentPage + 1,
            albums: state.pagination.currentPage + 1 > state.pagination.lastPage ?
                state.pagination.albums :
                state.albumsState.
                    filter(album => (album.id >= state.index && album.id < state.index + state.pagination.pageSize))
        },
        index: state.pagination.currentPage == state.pagination.lastPage ? state.index : state.index + state.pagination.pageSize
    })),
    on(previousPage, (state) => ({
        ...state,
        pagination: {
            ...state.pagination,
            currentPage: state.pagination.currentPage - 1 == 0 ? state.pagination.currentPage : state.pagination.currentPage - 1,
            albums: state.pagination.currentPage - 1 == 1 ? state.pagination.albums :
                state.albumsState.
                    filter(album => (album.id >= state.index - state.pagination.pageSize && album.id < state.index))
        },
        index: state.pagination.currentPage == 1 ? state.index : state.index - state.pagination.pageSize
    })),
    on(lastPage, (state) => ({
        ...state,
        pagination: {
            ...state.pagination,
            currentPage: state.pagination.lastPage,
            albums: state.albumsState.
                filter(album => (album.id <= state.pagination.lastPage * state.pagination.pageSize && album.id > (state.pagination.lastPage - 1) * (state.pagination.pageSize)))
        },
        index: state.pagination.lastPage * state.pagination.pageSize

    })),
    on(changePageSize, (state, { newPageSize }) => ({
        ...state,
        pagination: {
            ...state.pagination,
            pageSize: newPageSize,
            lastPage: Math.round(state.albumsState.length / newPageSize),
            albums: state.albumsState.
                filter(album => (album.id <= state.pagination.currentPage * newPageSize && album.id >= state.pagination.currentPage))

        }
    }))
)