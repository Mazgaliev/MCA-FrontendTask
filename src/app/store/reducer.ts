import { createReducer, on } from "@ngrx/store";
import { Album } from "../model/Albums";
import { Photo } from "../model/Photo";
import { changeAlbumPaginatorOrder, changePageSize, changePhotoPaginatorOrder, clearLoadedAlbum, clearPickedAlbum, clearPickedPhoto, deletePhoto, deletePhotoSuccess, editPhotoData, editPhotoDataSuccess, fetchAlbums, fetchAlbumsSuccess, fetchAllPhotosSuccess, firstPage, lastPage, lastPageSuccess, loadAlbumPageSuccess, loadAlbumPhotos, loadAlbumPhotosSuccess, nextPage, nextPageSuccess, photoChangePageSize, photoChangePageSizeSuccess, photoFirstPage, photoLastPage, photoLastPageSuccess, photoNextPage, photoPreviousPage, photoPreviousPageSuccess, photonextPageSuccess, previousPage, previousPageSuccess, refreshAlbumPaginator, refreshPhotosPaginator, savePhotoSuccess, setClickedAlbum, setPhoto, setPickedAlbumSuccess } from "./actions";
import { initialState } from "./state";


// export const paginationReducer= createReducer
export function compare<T extends Album | Photo>(item1: T, item2: T, ascending: boolean): any {
    if (ascending) {
        return item1.id < item2.id ? -1 : 1;
    } else if (!ascending) {
        return item1.id > item2.id ? -1 : 1;
    }

    return null
}

function checkNextPage(currentPage: number, lastPage: number): boolean {
    //returns true if we can switch to next page
    return (currentPage + 1 <= lastPage);
}
function checkPreviousPage(currentPage: number, lastPage: number): boolean {
    return (currentPage - 1 >= 1);
}

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
        loading: false

    })),
    on(setClickedAlbum, (state, { album }) => ({
        ...state,
        pickedAlbum: album,
        photoPagination: {
            ...state.photoPagination,
            pageSize: 4
        }
    })),
    on(setPickedAlbumSuccess, (state) => ({
        ...state,
        photoPagination: {
            ...state.photoPagination,
            lastPage: Math.ceil(state.pickedAlbum!.photos.length / state.photoPagination.pageSize),
            currentPage: 1,
            start_idx: 1,
            end_idx: state.photoPagination.start_idx + state.photoPagination.pageSize,
            photos: state.pickedAlbum!.photos.slice(0, state.photoPagination.end_idx - 1)
        }
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
            start_idx: 1,
            end_idx: 1 + state.pagination.pageSize,
            albums: state.albumsState.slice(0, state.pagination.pageSize)
        },
    })),
    on(nextPage, (state) => ({
        ...state,
        pagination: {
            ...state.pagination,
            start_idx: checkNextPage(state.pagination.currentPage, state.pagination.lastPage) ? state.pagination.start_idx + state.pagination.pageSize : state.pagination.start_idx,
            end_idx: checkNextPage(state.pagination.currentPage, state.pagination.lastPage) ? state.pagination.end_idx + state.pagination.pageSize : state.pagination.end_idx,
            currentPage: checkNextPage(state.pagination.currentPage, state.pagination.lastPage) ? state.pagination.currentPage + 1 : state.pagination.currentPage
            // albums: state.pagination.currentPage + 1 > state.pagination.lastPage ?
            //     state.pagination.albums :
            //     state.albumsState.slice(state.index - 1, state.index + state.pagination.pageSize - 1)
            // filter(album => (album.id >= state.index && album.id < state.index + state.pagination.pageSize))
        },
    })),
    on(nextPageSuccess, (state) => ({
        ...state,
        pagination: {
            ...state.pagination,
            albums: state.albumsState.slice(state.pagination.start_idx - 1, state.pagination.end_idx - 1)
        }
    })),
    on(previousPage, (state) => ({
        ...state,
        pagination: {
            ...state.pagination,
            start_idx: checkPreviousPage(state.pagination.currentPage, state.pagination.lastPage) ? state.pagination.start_idx - state.pagination.pageSize : state.pagination.start_idx,
            end_idx: checkPreviousPage(state.pagination.currentPage, state.pagination.lastPage) ? state.pagination.end_idx - state.pagination.pageSize : state.pagination.end_idx,
            currentPage: checkPreviousPage(state.pagination.currentPage, state.pagination.lastPage) ? state.pagination.currentPage - 1 : state.pagination.currentPage,
        },
    })),
    on(previousPageSuccess, (state) => ({
        ...state,
        pagination: {
            ...state.pagination,
            albums: state.albumsState.slice(state.pagination.start_idx, state.pagination.end_idx)
        }
    })),
    on(lastPage, (state) => ({
        ...state,
        pagination: {
            ...state.pagination,
            currentPage: state.pagination.lastPage,
            start_idx: (state.pagination.lastPage - 1) * state.pagination.pageSize,
            end_idx: (state.pagination.pageSize * state.pagination.lastPage),
            // albums: state.albumsState.
            //     filter(album => (album.id <= state.pagination.lastPage * state.pagination.pageSize && album.id > (state.pagination.lastPage - 1) * (state.pagination.pageSize)))
        },

    })),
    on(lastPageSuccess, (state) => ({
        ...state,
        pagination: {
            ...state.pagination,
            albums: state.albumsState.slice(state.pagination.start_idx, state.pagination.end_idx)
        }
    })),
    on(changePageSize, (state, { newPageSize }) => ({
        ...state,
        pagination: {
            ...state.pagination,
            pageSize: newPageSize,
            end_idx: state.pagination.start_idx + newPageSize,
            lastPage: Math.round(state.albumsState.length / newPageSize),
            currentPage: Math.ceil(state.pagination.start_idx / newPageSize),
            albums: state.albumsState.
                slice(state.pagination.start_idx - 1, state.pagination.start_idx + newPageSize - 1)

        }
    })),
    on(photoFirstPage, (state) => ({
        ...state,
        photoPagination: {
            ...state.photoPagination,
            photos: state.pickedAlbum!.photos.slice(0, state.photoPagination.pageSize),
            currentPage: 1,
            start_idx: 1,
            end_idx: 1 + state.photoPagination.pageSize,
            lastPage: Math.ceil(state.pickedAlbum!.photos.length / state.photoPagination.pageSize)
        }
    })),
    on(photoNextPage, (state) => ({
        ...state,
        photoPagination: {
            ...state.photoPagination,
            currentPage: state.photoPagination.currentPage + 1 > state.photoPagination.lastPage ? state.photoPagination.currentPage : state.photoPagination.currentPage + 1,
            start_idx: state.photoPagination.currentPage + 1 > state.photoPagination.lastPage ? state.photoPagination.start_idx : state.photoPagination.start_idx + state.photoPagination.pageSize,
            end_idx: state.photoPagination.currentPage + 1 > state.photoPagination.lastPage ? state.photoPagination.end_idx : state.photoPagination.end_idx + state.photoPagination.pageSize,
        }
    })),
    on(photonextPageSuccess, (state) => ({
        ...state,
        photoPagination: {
            ...state.photoPagination,
            photos: state.pickedAlbum!.photos.slice(state.photoPagination.start_idx - 1, state.photoPagination.end_idx - 1)
        }
    })),
    on(photoPreviousPage, (state) => ({
        ...state,
        photoPagination: {
            ...state.photoPagination,
            currentPage: state.photoPagination.currentPage - 1 < 1 ? state.photoPagination.currentPage : state.photoPagination.currentPage - 1,
            start_idx: state.photoPagination.currentPage - 1 < 1 ? state.photoPagination.start_idx : state.photoPagination.start_idx - state.photoPagination.pageSize,
            end_idx: state.photoPagination.currentPage - 1 < 1 ? state.photoPagination.end_idx : state.photoPagination.end_idx - state.photoPagination.pageSize,
        }
    })),
    on(photoPreviousPageSuccess, (state) => ({
        ...state,
        photoPagination: {
            ...state.photoPagination,
            photos: state.pickedAlbum!.photos.slice(state.photoPagination.start_idx - 1, state.photoPagination.end_idx - 1)
        }
    })),
    on(photoLastPage, (state) => ({
        ...state,
        photoPagination: {
            ...state.photoPagination,
            currentPage: state.photoPagination.lastPage,
            start_idx: (state.photoPagination.lastPage - 1) * state.photoPagination.pageSize,
            end_idx: state.photoPagination.lastPage * state.photoPagination.pageSize,
        }
    })),
    on(photoLastPageSuccess, (state) => ({
        ...state,
        photoPagination: {
            ...state.photoPagination,
            photos: state.pickedAlbum!.photos.slice((state.photoPagination.lastPage - 1) * state.photoPagination.pageSize,
                state.photoPagination.lastPage * state.photoPagination.end_idx)
        }
    })),
    on(photoChangePageSize, (state, { newPageSize }) => ({
        ...state,
        photoPagination: {
            ...state.photoPagination,

            end_idx: state.photoPagination.start_idx + newPageSize,
            start_idx: state.photoPagination.start_idx,
            pageSize: newPageSize,
            lastPage: Math.ceil(state.pickedAlbum!.photos.length / newPageSize),
            currentPage: Math.ceil(state.photoPagination.start_idx / newPageSize),
            // photos: state.pickedAlbum!.photos.slice(state.photoPagination.start_idx, state.photoPagination.start_idx + state.photoPagination.currentPage * newPageSize)

        }
    })),
    on(photoChangePageSizeSuccess, (state) => ({
        ...state,
        photoPagination: {
            ...state.photoPagination,
            photos: state.pickedAlbum!.photos.slice(state.photoPagination.start_idx - 1, state.photoPagination.end_idx - 1)
        }
    })),
    on(refreshPhotosPaginator, (state) => ({
        ...state,
        photoPagination: {
            ...state.photoPagination,
            photos: state.pickedAlbum!.photos.slice(state.photoPagination.start_idx - 1, state.photoPagination.end_idx - 1),
            lastPage: Math.ceil(state.pickedAlbum!.photos.length / state.photoPagination.pageSize)
        }
    })),
    on(changeAlbumPaginatorOrder, (state) => {
        const sortedAlbs = [...state.albumsState].sort((a, b) => compare(a, b, !state.pagination.ascending));

        return {
            ...state,
            albumsState: sortedAlbs,
            pagination: { ...state.pagination, ascending: !state.pagination.ascending }
        }
    }),
    on(changePhotoPaginatorOrder, (state) => {

        if (state.pickedAlbum && state.photoPagination) {
            const sortedPhotos = [...state.pickedAlbum!.photos].sort((a, b) => compare(a, b, !state.photoPagination.ascending))
            const pickedAlbum = { ...state.pickedAlbum, photos: sortedPhotos }

            return {
                ...state,

                pickedAlbum: pickedAlbum,
                photoPagination: {
                    ...state.photoPagination,
                    ascending: !state.photoPagination.ascending
                }
            }
        }

        return {
            ...state

        }
    }),
    on(refreshAlbumPaginator, (state) => ({
        ...state,
        pagination: {
            ...state.pagination,
            albums: state.albumsState
                .slice(state.pagination.start_idx - 1, state.pagination.end_idx - 1)
        }
    }))
)

//TODO Need to fix the paginator for albums to be the same as photo paginator.