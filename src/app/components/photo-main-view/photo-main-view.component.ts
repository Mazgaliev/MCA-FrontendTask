import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Photo } from 'src/app/model/Photo';

@Component({
  selector: 'app-photo-main-view',
  templateUrl: './photo-main-view.component.html',
  styleUrls: ['./photo-main-view.component.css']
})
export class PhotoMainViewComponent {

  constructor(private readonly router: Router) {
    console.log(this.photo);
  }

  photo: Photo | undefined;

  close(): void {

  }

  save(): void {

  }
  deleteModal(): void {

  }
  
  editModal(): void {
    this.router.navigate([this.photo?.id, 'edit']);
  }
}
