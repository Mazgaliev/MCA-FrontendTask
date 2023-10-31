import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Album } from "src/app/model/Albums";
import { Photo } from "../../model/Photo";
import { CreatePhoto } from "src/app/model/CreatePhoto";

@Injectable({ providedIn: 'root' })
export class HttpService {
    private readonly api: string = "https://jsonplaceholder.typicode.com/";

    constructor(private readonly httpClient: HttpClient) {

    }

    getAlbums(): Observable<Album[]> {
        return this.httpClient.get<Album[]>(this.api + 'albums')
    }

    getPhotos(albumId: number): Observable<Photo[]> {

        console.log(this.api + 'albums/' + albumId + '/photos');

        return this.httpClient.get<Photo[]>(this.api + 'albums/' + albumId + '/photos');
    }

    savePhoto(photo: CreatePhoto): Observable<Photo> {

        return this.httpClient.post<Photo>(this.api + 'photos', photo);
    }

    deletePhoto(photoId: number): Observable<{}> {
        return this.httpClient.delete<{}>(this.api + 'photos/' + photoId);
    }

    editPhoto(photo: Photo): Observable<Photo> {

        return this.httpClient.put<Photo>(this.api + 'photos/' + photo.id, photo)

    }


}