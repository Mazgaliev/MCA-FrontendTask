import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
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
  $paginator = this.store.select(Selectors.selectpaginator);

  constructor(private readonly store: Store, private readonly router: Router,
    private readonly loadAlbumService: LoadAlbumsService
  ) { }

  ngOnInit(): void {


    this.store.dispatch(AppActions.fetchAlbums());

  }

  changePage(event: number): void {

    if (event == 0) {
      this.store.dispatch(AppActions.firstPage())

    } else if (event == 1) {
      this.store.dispatch(AppActions.previousPage())
    } else if (event == 2) {
      this.store.dispatch(AppActions.nextPage())
    } else {
      this.store.dispatch(AppActions.lastPage())
    }
  }

  changePageSize(event: number): void {
    this.store.dispatch(AppActions.changePageSize({ newPageSize: event }))
  }

  loadMore(): void {

    this.store.dispatch(AppActions.loadAlbumPhotos({ albumId: this.loadAlbumService.loadAlbum }))

    this.loadAlbumService.loadMoreAlbums(1);
  }

  setSelectedAlbum(album: Album): void {

    if (album != undefined) {

      this.store.dispatch(AppActions.setClickedAlbum({ album: album }));

      this.router.navigate(["view", album.id, 'photos']);
    }

  }

  ngOnDestroy(): void {

    this.store.dispatch(AppActions.clearLoadedAlbum())
    this.loadAlbumService.resetAlbumLoader();
  }

}
