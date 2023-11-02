import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-photo',
  templateUrl: './create-photo.component.html',
  styleUrls: ['./create-photo.component.css']
})
export class CreatePhotoComponent {

  constructor(private readonly activeModal: NgbActiveModal, private formBuilder: FormBuilder) { }

  createPhotoForm = this.formBuilder.group({
    title: ['', Validators.required],
    url: ['', Validators.required],
    thumbnailUrl: ['', Validators.required]
  });



  createPhoto(): void {

    this.activeModal.close(this.createPhotoForm.value);
  }

  close(): void {
    this.activeModal.close(false);
  }
}
