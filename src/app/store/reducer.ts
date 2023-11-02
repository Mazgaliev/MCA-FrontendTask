import { createReducer, on } from "@ngrx/store";
import { clearLoadedAlbum, clearPickedAlbum, clearPickedPhoto, deletePhoto, deletePhotoSuccess, editPhotoData, editPhotoDataSuccess, fetchAlbums, fetchAlbumsSuccess, loadAlbumPhotos, loadAlbumPhotosSuccess, savePhotoSuccess, setClickedAlbum, setPhoto } from "./actions";
import { initialState } from "./state";


export const reducer = createReducer(
    initialState,
    on(fetchAlbumsSuccess, (state, { albums }) => ({
        ...state,
        albumsState: [...albums],
        loading: false
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
            photos: state.pickedAlbum!.photos.filter(photo => photo.id != photoId.photoId)
        },
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
    }))

)