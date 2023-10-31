import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Photo } from 'src/app/model/Photo';

@Component({
  selector: 'app-delete-photo',
  templateUrl: './delete-photo.component.html',
  styleUrls: ['./delete-photo.component.css']
})
export class DeletePhotoComponent {

  constructor(public readonly activeModal: NgbActiveModal) { }
  @Input() photo: Photo | undefined;
  

  confirm(): void {
    this.activeModal.close(true)
  }

  close(): void {
    this.activeModal.close(false);
  }
}
