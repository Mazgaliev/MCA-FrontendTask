import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map } from "rxjs";
import { AppActions } from ".";
import { Album } from "../model/Albums";
import { HttpService } from "../shared/service/HttpService.service";



@Injectable()
export class AppEffects {
    constructor(private readonly httpService: HttpService,
        private readonly actions$: Actions) { }


    fetchAlbums$ = createEffect(
        () => this.actions$.pipe(
            ofType(AppActions.fetchAlbums),
            exhaustMap(() =>
                this.httpService.getAlbums().pipe(
                    map(albums => {
                        var albs: Album[] = []
                        for (var a of albums) {
                            a.photos = []
                            albs.push(a);

                        }
                        return AppActions.fetchAlbumsSuccess({ albums: albs })
                    })
                ))
        )
    )

    loadFirstAlbums$ = createEffect(
        () => this.actions$.pipe(
            ofType(AppActions.fetchAlbumsSuccess),
            map(() => {

                return AppActions.loadAlbumPhotos({ albumId: 1 });
            })
        )
    )

    loadAlbums$ = createEffect(
        () => this.actions$.pipe(
            ofType(AppActions.loadAlbumPhotos),
            exhaustMap(albumId =>
                this.httpService.getPhotos(albumId.albumId).pipe(
                    map(photos => {

                        return AppActions.loadAlbumPhotosSuccess({ photos: photos, albumId: albumId.albumId })
                    })
                ))
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

    deletePhoto$ = createEffect(
        () => this.actions$.pipe(
            ofType(AppActions.deletePhoto),
            exhaustMap(data => this.httpService.deletePhoto(data.photoId).pipe(
                map(() => AppActions.deletePhotoSuccess({ photoId: data.photoId }))
            ))
        )
    )

    editPhoto$ = createEffect(
        () => this.actions$.pipe(
            ofType(AppActions.editPhotoData),
            exhaustMap((data) => this.httpService.editPhoto(data.editedPhoto).pipe(
                map(result => AppActions.editPhotoDataSuccess({ editedPhoto: result }))
            ))
        )
    )
}