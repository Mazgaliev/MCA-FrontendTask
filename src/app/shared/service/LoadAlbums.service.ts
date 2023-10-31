import { Injectable } from "@angular/core";


@Injectable({ providedIn: 'root' })
export class LoadAlbumsService {

    private _loadAlbum: number = 1;


    public loadMoreAlbums(val: number): void {
        this._loadAlbum = this._loadAlbum + val;
    }

    public resetAlbumLoader(): void {
        this._loadAlbum = 1;
    }
    get loadAlbum(): number {
        return this._loadAlbum;
    }

}