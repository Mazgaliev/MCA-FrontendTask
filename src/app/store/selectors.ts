import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./state";

export const appFeatureKey = 'appState';

export const selectAppState = createFeatureSelector<AppState>(appFeatureKey);



export const selectLoading = createSelector(
    selectAppState,
    (state: AppState) => state.loading
)

export const selectAlbumsState = createSelector(
    selectAppState,
    (state: AppState) => state.albumsState
)

export const selectLoadedAlbums = createSelector(
    selectAppState,
    (state: AppState) => state.loadedAlbums
)

export const selectPickedAlbum = createSelector(
    selectAppState,
    (state: AppState) => state.pickedAlbum
)

export const selectPickedPhoto = createSelector(
    selectAppState,
    (state: AppState) => state.pickedPhoto
)
export const selectpaginator = createSelector(
    selectAppState,
    (state: AppState) => state.pagination
)