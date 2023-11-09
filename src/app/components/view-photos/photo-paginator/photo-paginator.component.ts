import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Photo } from 'src/app/model/Photo';
import { PhotoPagination } from 'src/app/model/PhotoPagination';

@Component({
  selector: 'app-photo-paginator',
  templateUrl: './photo-paginator.component.html',
  styleUrls: ['./photo-paginator.component.css']
})
export class PhotoPaginatorComponent {

  @Input() paginator: PhotoPagination | undefined;

  @Output() pageNavigationEmitter: EventEmitter<number> = new EventEmitter<number>();
  @Output() pageSizeChangeEmitter: EventEmitter<number> = new EventEmitter<number>();
  @Output() photoSelectedEmitter: EventEmitter<Photo> = new EventEmitter<Photo>();
  @Output() orderChangeEventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  firstPage(): void {
    this.pageNavigationEmitter.emit(0)
  }
  previousPage(): void {
    this.pageNavigationEmitter.emit(1)
  }
  nextPage(): void {
    this.pageNavigationEmitter.emit(2);
  }
  lastPage(): void {
    this.pageNavigationEmitter.emit(3);
  }

  pageSizeChange(pageSize: number): void {
    this.pageSizeChangeEmitter.emit(pageSize);
  }

  setPhoto(photo: Photo): void {
    this.photoSelectedEmitter.emit(photo)
  }

  changePhotosOrder(): void {
    this.orderChangeEventEmitter.emit(!this.paginator!.ascending);
  }
}
