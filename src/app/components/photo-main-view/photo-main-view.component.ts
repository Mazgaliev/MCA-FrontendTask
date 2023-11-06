import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { Photo } from 'src/app/model/Photo';
import { AppActions, Selectors } from 'src/app/store';
import { DeletePhotoComponent } from './delete-photo/delete-photo.component';
import { EditPhotoComponent } from './edit-photo/edit-photo.component';

@Component({
  selector: 'app-photo-main-view',
  templateUrl: './photo-main-view.component.html',
  styleUrls: ['./photo-main-view.component.scss']
})
export class PhotoMainViewComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<void>();
  photo: Photo | undefined;
  constructor(
    private readonly router: Router,
    private readonly modalService: NgbModal,
    private readonly store: Store) { }


  ngOnInit(): void {
    this.store.select(Selectors.selectPickedPhoto).
      pipe(takeUntil(this.destroy$)).
      subscribe(data => this.photo = data)

  }

  close(): void {
    this.router.navigate([{ outlets: { modal: null } }]);
  }

  editModal(): void {
    const modalRef = this.modalService.open(EditPhotoComponent);
    modalRef.componentInstance.photo = this.photo;
    modalRef.result.then((val) => {
      if (val == false) {
        //Do nothing!
      } else {
        this.store.dispatch(AppActions.editPhotoData({ editedPhoto: val }));
      }
    })
  }

  deleteModal(): void {
    const modalRef = this.modalService.open(DeletePhotoComponent, { "size": "md" });
    modalRef.componentInstance.photo = this.photo;

    modalRef.result.then((val) => val == true ? this.store.dispatch(AppActions.deletePhoto({ photoId: this.photo!.id })) : console.log("Deletion cancelled."))
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.store.dispatch(AppActions.clearPhoto());
  }
}
