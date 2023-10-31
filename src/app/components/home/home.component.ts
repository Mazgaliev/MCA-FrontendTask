import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Album } from 'src/app/model/Albums';
import { LoadAlbumsService } from 'src/app/shared/service/LoadAlbums.service';
import { AppActions, Selectors } from 'src/app/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  $albums = this.store.select(Selectors.selectLoadedAlbums);
  $isLoading = this.store.select(Selectors.selectLoading);
  destroyed$: Subject<void> = new Subject<void>();
  constructor(private readonly store: Store, private readonly router: Router, private readonly loadAlbumService: LoadAlbumsService) { }

  ngOnInit(): void {
    this.store.dispatch(AppActions.fetchAlbums())
    this.loadAlbumService.loadMoreAlbums(1);
  }



  loadMore(): void {

    this.store.dispatch(AppActions.loadAlbumPhotos({ albumId: this.loadAlbumService.loadAlbum }))

    this.loadAlbumService.loadMoreAlbums(1);
  }

  setSelectedAlbum(album: Album): void {

    if (album != undefined) {

      const a: Album = { id: album.id, userId: album.userId, photos: album.photos, title: album.title }
      this.store.dispatch(AppActions.setClickedAlbum({ album: a }));
      this.router.navigateByUrl("/view")
    }

  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();

    this.store.dispatch(AppActions.clearLoadedAlbum())
    this.loadAlbumService.resetAlbumLoader();
  }

}
