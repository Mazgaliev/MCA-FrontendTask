import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map } from "rxjs";
import { AppActions } from ".";
import { Album } from "../model/Albums";
import { HttpService } from "../shared/service/HttpService.service";
import { compare } from "./reducer";



@Injectable()
export class AppEffects {
    constructor(private readonly httpService: HttpService,
        private readonly actions$: Actions,
        private readonly router: Router) { }

    fetchAlbums$ = createEffect(
        () => this.actions$.pipe(
            ofType(AppActions.fetchAlbums),
            exhaustMap(data =>
                this.httpService.getAlbums().pipe(
                    map(albums => {
                        var albs: Album[] = []
                        for (var a of albums) {
                            a.photos = []
                            albs.push(a);

                        }
                        albs = albs.sort((a, b) => compare(a, b, data.ascendingData))
                        return AppActions.fetchAlbumsSuccess({ albums: albs })
                    })
                ))
        )
    )


    changeAlbumPaginatorORder$ = createEffect(
        () => this.actions$.pipe(
            ofType(AppActions.changeAlbumPaginatorOrder),
            map(() => AppActions.refreshAlbumPaginator())
        )
    )

    changePhotoPaginatorOrder$ = createEffect(
        () => this.actions$.pipe(
            ofType(AppActions.changePhotoPaginatorOrder),
            map(() => AppActions.refreshPhotosPaginator())
        )
    )


    loadAllPhotos$ = createEffect(
        () => this.actions$.pipe(
            ofType(AppActions.fetchAlbumsSuccess),
            map(() => AppActions.fetchAllPhotos())
        )
    )

    loadAllphotoSucc$ = createEffect(
        () => this.actions$.pipe(
            ofType(AppActions.fetchAllPhotos),
            exhaustMap(() => this.httpService.getAllPhotos().pipe(
                map(data =>
                    AppActions.fetchAllPhotosSuccess({ photos: data }))
            ))
        )
    )

    goToFirstPage$ = createEffect(
        () => this.actions$.pipe(
            ofType(AppActions.fetchAllPhotosSuccess),
            map(() => AppActions.firstPage())
        )
    )

    pickedAlbum$ = createEffect(
        () => this.actions$.pipe(
            ofType(AppActions.setClickedAlbum),
            map(() => AppActions.setPickedAlbumSuccess())
        )
    )


    loadAlbums$ = createEffect(
        () => this.actions$.pipe(
            ofType(AppActions.loadAlbumPhotos),
            exhaustMap(albumId =>
                this.httpService.getPhotos(albumId.albumId).pipe(
                    map(photos => {

                        return AppActions.loadAlbumPhotosSuccess({ photos: photos, albumId: albumId.albumId })
                    }))
            )
        )
    )

    nextAlbumsPage$ = createEffect(
        () => this.actions$.pipe(
            ofType(AppActions.nextPage),
            map(() => AppActions.nextPageSuccess())
        )
    )
    previousAlbumsPage$ = createEffect(
        () => this.actions$.pipe(
            ofType(AppActions.previousPage),
            map(() => AppActions.previousPageSuccess())
        )
    )
    lastAlbumsPageSuccess = createEffect(
        () => this.actions$.pipe(
            ofType(AppActions.lastPage),
            map(() => AppActions.lastPageSuccess())
        )
    )



    savePhoto$ = createEffect(
        () => this.actions$.pipe(
            ofType(AppActions.savePhoto),
            exhaustMap(data => this.httpService.savePhoto(data.photoObject).pipe(
                map(responseObj => {
                    // console.log(responseObj);
                    return AppActions.savePhotoSuccess({ photo: responseObj })
                })
            ))
        )
    )

    savePhotoSuccess$ = createEffect(
        () => this.actions$.pipe(
            ofType(AppActions.savePhotoSuccess),
            map(() => AppActions.refreshPhotosPaginator())
        )
    )


    deletePhoto$ = createEffect(
        () => this.actions$.pipe(
            ofType(AppActions.deletePhoto),
            exhaustMap(data => this.httpService.deletePhoto(data.photoId).pipe(
                map(() => {

                    this.router.navigate([{ outlets: { modal: null } }]);
                    return AppActions.deletePhotoSuccess({ photoId: data.photoId })
                })
            ))
        )
    )

    deletePhotoSuccess$ = createEffect(
        () => this.actions$.pipe(
            ofType(AppActions.deletePhotoSuccess),
            map(() => AppActions.refreshPhotosPaginator())
        ))

    editPhotosSuccess$ = createEffect(
        () => this.actions$.pipe(
            ofType(AppActions.editPhotoDataSuccess),
            map(() => AppActions.refreshPhotosPaginator())
        ))

    editPhoto$ = createEffect(
        () => this.actions$.pipe(
            ofType(AppActions.editPhotoData),
            exhaustMap((data) => this.httpService.editPhoto(data.editedPhoto).pipe(
                map(result => {
                    this.router.navigate([{ outlets: { modal: null } }]);
                    return AppActions.editPhotoDataSuccess({ editedPhoto: result });
                })
            ))
        )
    )

    photoNextPageSucc$ = createEffect(
        () => this.actions$.pipe(
            ofType(AppActions.photoNextPage),
            map(() => AppActions.photonextPageSuccess())
        )
    )
    photoPreviousPage$ = createEffect(
        () => this.actions$.pipe(
            ofType(AppActions.photoPreviousPage),
            map(() => AppActions.photoPreviousPageSuccess())
        )
    )

    lastPagePhotoPagintor$ = createEffect(
        () => this.actions$.pipe(
            ofType(AppActions.photoLastPage),
            map(() => AppActions.photoLastPageSuccess())
        )
    )

    changePage$ = createEffect(
        () => this.actions$.pipe(
            ofType(AppActions.photoChangePageSize),
            map(() => AppActions.photoChangePageSizeSuccess())
        )
    )
}