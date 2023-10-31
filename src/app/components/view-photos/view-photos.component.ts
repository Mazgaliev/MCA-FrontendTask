import { Component, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Album } from 'src/app/model/Albums';
import { CreatePhoto } from 'src/app/model/CreatePhoto';
import { Photo } from 'src/app/model/Photo';
import { AppActions, Selectors } from 'src/app/store';
import { CreatePhotoComponent } from './create-photo/create-photo.component';
import { DeletePhotoComponent } from './delete-photo/delete-photo.component';
import { EditPhotoComponent } from './edit-photo/edit-photo.component';

@Component({
  selector: 'app-view-photos',
  templateUrl: './view-photos.component.html',
  styleUrls: ['./view-photos.component.css']
})
export class ViewPhotosComponent implements OnDestroy {

  $selectedAlbum: Observable<Album | undefined> = this.store.select(Selectors.selectPickedAlbum);
  $destroy = new Subject<void>();

  constructor(private readonly store: Store, private modalService: NgbModal) { }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');

    this.store.dispatch(AppActions.clearPickedAlbum());
  }

  openCreatePhotoModal(): void {
    const modalRef = this.modalService.open(CreatePhotoComponent);
    var userId: number = 0;
    var albumId: number = 0;

    modalRef.result.then((formValue) => {
      if (formValue == false) {
        //do nothing
      } else {

        this.$selectedAlbum.pipe(
          takeUntil(this.$destroy)).
          subscribe((val) => {
            userId = val!.userId;
            albumId = val!.id;
          })

        const photoObj: CreatePhoto = {
          userId: userId,
          albumId: albumId,
          title: formValue.title,
          url: formValue.url,
          thumbnailUrl: formValue.thumbnailUrl
        };
        //dispatch new obj
        console.log(photoObj);
        this.store.dispatch(AppActions.savePhoto({ photoObject: photoObj }));

        this.$destroy.next();
        this.$destroy.complete();
      }
    })
  }

  openEditPhotoModal(photo: Photo): void {
    const modalRef = this.modalService.open(EditPhotoComponent);
    modalRef.componentInstance.photo = photo;

    modalRef.result.then((val) => {
      if (val == false) {
        //Do nothing!
      } else {
        this.store.dispatch(AppActions.editPhotoData({ editedPhoto: val }));
      }
    })
  }

  openDeleteItemModal(photo: Photo): void {
    const modalRef = this.modalService.open(DeletePhotoComponent, { "size": "md" });
    modalRef.componentInstance.photo = photo;

    modalRef.result.then((val) => val == true ? this.store.dispatch(AppActions.deletePhoto({ photoId: photo.id })) : console.log("Error when deleting photo"))
  }


}
