import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { Album } from 'src/app/model/Albums';
import { CreatePhoto } from 'src/app/model/CreatePhoto';
import { Photo } from 'src/app/model/Photo';
import { AppActions } from 'src/app/store';
import { CreatePhotoComponent } from './create-photo/create-photo.component';
import { DeletePhotoComponent } from './delete-photo/delete-photo.component';
import { EditPhotoComponent } from './edit-photo/edit-photo.component';

@Component({
  selector: 'app-view-photos',
  templateUrl: './view-photos.component.html',
  styleUrls: ['./view-photos.component.css']
})
export class ViewPhotosComponent implements OnDestroy, OnInit {

  $destroy = new Subject<void>();
  selectedAlbum: Album | undefined;
  constructor(private readonly store: Store,
    private readonly modalService: NgbModal,
    private readonly activeRoute: ActivatedRoute,
    private readonly router: Router) { }

  ngOnInit(): void {


    this.activeRoute.data
      .pipe(takeUntil(this.$destroy))
      .subscribe(data => {
        this.selectedAlbum = data['album'];
      });

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

  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');

    this.store.dispatch(AppActions.clearPickedAlbum());

    this.$destroy.next();
    this.$destroy.complete();
  }
}
