import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { Album } from "src/app/model/Albums";
import { Photo } from "src/app/model/Photo";
import { AppActions, Selectors } from "src/app/store";


//Resolvers should return some data when initializing some component.
//We can subscribe to the data they provide when it changes.

export const albumResolve: ResolveFn<Album | undefined> = (route, state) => {
    console.log("Album Resolver activated");
    const albumId = route.paramMap.get('albumId');

    if (albumId != null && !isNaN(+albumId)) {
        
        return inject(Store)
            .select(Selectors.selectPickedAlbum);
    } else {
        return of(undefined);
    }
};

export const photoResolve: ResolveFn<Photo | undefined> = (route, state) => {
    console.log("Photo Resolver activated");
    const photoId = route.paramMap.get('photoId');

    if (photoId != null && !isNaN(+photoId)) {
        return inject(Store)
            .select(Selectors.selectPickedPhoto);
    }
    else {
        return of(undefined);
    }
}