import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Photo } from 'src/app/model/Photo';

@Component({
  selector: 'app-edit-photo',
  templateUrl: './edit-photo.component.html',
  styleUrls: ['./edit-photo.component.css']
})
export class EditPhotoComponent {

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder) {

  }


  photo: Photo | undefined = undefined;


  editPictureForm = this.formBuilder.group({
    title: [this.photo?.title, Validators.required],
    url: [this.photo?.url, Validators.required],
    thumbnailUrl: [this.photo?.thumbnailUrl, Validators.required]
  })


  editPhoto(): void {
    const formValue = this.editPictureForm.value;
    if (formValue.url == this.photo?.url && formValue.title == this.photo?.title && formValue.thumbnailUrl == this.photo?.thumbnailUrl) {
      this.activeModal.close(false);
      throw ("Invalid form sent");
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
}
