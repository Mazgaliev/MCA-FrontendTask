import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Album } from 'src/app/model/Albums';
import { CreatePhoto } from 'src/app/model/CreatePhoto';
import { Photo } from 'src/app/model/Photo';
import { AppActions, Selectors } from 'src/app/store';
import { CreatePhotoComponent } from '../photo-main-view/create-photo/create-photo.component';

@Component({
  selector: 'app-view-photos',
  templateUrl: './view-photos.component.html',
  styleUrls: ['./view-photos.component.css']
})
export class ViewPhotosComponent implements OnDestroy, OnInit {

  $destroy = new Subject<void>();
  selectedAlbum: Album | undefined;
  // $selectedAlbum: Observable<Album | undefined> = this.store.select(Selectors.selectPickedAlbum);
  constructor(private readonly store: Store,
    private readonly modalService: NgbModal,
    private readonly activeRoute: ActivatedRoute,
    private readonly router: Router) { }

  ngOnInit(): void {

    this.store.select(Selectors.selectPickedAlbum).pipe(takeUntil(this.$destroy)).subscribe(
      data=>this.selectedAlbum=data
    )

    // this.activeRoute.data
    //   .pipe(takeUntil(this.$destroy))
    //   .subscribe(data => {
    //     this.selectedAlbum = data['album'];
    //   });

    if (this.selectedAlbum == null) {
      this.router.navigate(['error']);
    }

  }


  openCreatePhotoModal(): void {
    const modalRef = this.modalService.open(CreatePhotoComponent);

    modalRef.result.then((formValue) => {
      if (formValue == false) {
        //do nothing
      } else {

        const photoObj: CreatePhoto = {
          userId: this.selectedAlbum!.userId,
          albumId: this.selectedAlbum!.id,
          title: formValue.title,
          url: formValue.url,
          thumbnailUrl: formValue.thumbnailUrl
        };

        //dispatch new obj
        console.log(photoObj);
        this.store.dispatch(AppActions.savePhoto({ photoObject: photoObj }));

      }
    })
  }

  openPhotoViewModal(photo: Photo): void {

    // Store should dispatch an action that sets the picked photo
    this.store.dispatch(AppActions.setPhoto({ photo: photo }));
    this.router.navigate([{ outlets: { modal: [photo.id] } }]);
  }

  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');

    this.store.dispatch(AppActions.clearPickedAlbum());

    this.$destroy.next();
    this.$destroy.complete();
  }
}
