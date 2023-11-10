import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-create-photo',
  templateUrl: './create-photo.component.html',
  styleUrls: ['./create-photo.component.css']
})
export class CreatePhotoComponent implements OnInit, OnDestroy {
  createPhotoForm: FormGroup = new FormGroup({});
  $destroy: Subject<void> = new Subject<void>();
  titleWarning: boolean = false;

  constructor(private readonly activeModal: NgbActiveModal, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createPhotoForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(80)]],
      url: ['', Validators.required],
      thumbnailUrl: ['', Validators.required]
    });
    const titleChanges = this.createPhotoForm.get('title');
    if (titleChanges) {
      titleChanges.valueChanges.pipe(takeUntil(this.$destroy)).subscribe(
        data =>
          data.length > 80 ? this.titleWarning = true : this.titleWarning = false
      )
    }

    console.log(this.createPhotoForm);
  }


  createPhoto(): void {

    this.activeModal.close(this.createPhotoForm.value);
  }

  close(): void {
    this.activeModal.close(false);
  }


  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
