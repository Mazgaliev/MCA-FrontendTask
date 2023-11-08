import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-photo',
  templateUrl: './create-photo.component.html',
  styleUrls: ['./create-photo.component.css']
})
export class CreatePhotoComponent implements OnInit {
  createPhotoForm: FormGroup = new FormGroup({});

  titleWarning: boolean = false;

  constructor(private readonly activeModal: NgbActiveModal, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.createPhotoForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      url: ['', Validators.required],
      thumbnailUrl: ['', Validators.required]
    });

    this.createPhotoForm.valueChanges.pipe().subscribe(
      data => data.length > 50 ? this.titleWarning = true : false
    )
    console.log(this.createPhotoForm);
  }


  createPhoto(): void {

    this.activeModal.close(this.createPhotoForm.value);
  }

  close(): void {
    this.activeModal.close(false);
  }
}
