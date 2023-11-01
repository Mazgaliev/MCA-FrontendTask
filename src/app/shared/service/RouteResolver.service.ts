import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { Album } from "src/app/model/Albums";
import { AppActions, Selectors } from "src/app/store";




export const albumResolve: ResolveFn<Album | undefined> = (route, state) => {
    console.log("Resolver activated");
    const albumId = route.paramMap.get('albumId');

    if (albumId != null && !isNaN(+albumId)) {

        return inject(Store)
            .select(Selectors.selectPickedAlbum);
    } else {
        return of(undefined);
    }
};