import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';
import { Photo } from 'src/app/model/Photo';

@Component({
  selector: 'app-edit-photo',
  templateUrl: './edit-photo.component.html',
  styleUrls: ['./edit-photo.component.css']
})
export class EditPhotoComponent implements OnInit, OnDestroy {

  photo: Photo | undefined = undefined;
  destroy$ = new Subject<void>;

  titleLengthWarning: boolean = false;

  editPictureForm: FormGroup = new FormGroup({});

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {

    this.editPictureForm = this.formBuilder.group({
      title: [this.photo?.title, [Validators.required, Validators.maxLength(50)]],
      url: [this.photo?.url, Validators.required],
      thumbnailUrl: [this.photo?.thumbnailUrl, Validators.required]
    });

    this.editPictureForm.get('title')!.valueChanges.
      pipe(takeUntil(this.destroy$)).
      subscribe(data => {
        this.titleLengthWarning = data!.length > 50 ? true : false;
      })
  }



  editPhoto(): void {
    const formValue = this.editPictureForm.value;
    if (formValue.url == this.photo?.url && formValue.title == this.photo?.title && formValue.thumbnailUrl == this.photo?.thumbnailUrl) {
      this.activeModal.close(false);

    } else {

      const editedPhoto: Photo = {
        id: this.photo!.id,
        albumId: this.photo!.albumId,
        url: formValue.url != null ? formValue.url : this.photo!.url,
        thumbnailUrl: formValue.thumbnailUrl != null ? formValue.thumbnailUrl : this.photo!.thumbnailUrl,
        title: formValue.title != null ? formValue.title : this.photo!.title
      }
      this.activeModal.close(editedPhoto);
    }


  }
  close() {
    this.activeModal.close(false);
  }


  ngOnDestroy(): void {


    this.destroy$.next();
    this.destroy$.complete();
  }

}
