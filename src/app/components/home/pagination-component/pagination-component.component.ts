import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Album } from 'src/app/model/Albums';
import { AlbumPagination } from 'src/app/model/Pagination';

@Component({
  selector: 'app-pagination-component',
  templateUrl: './pagination-component.component.html',
  styleUrls: ['./pagination-component.component.css']
})
export class PaginationComponentComponent {
  @Input() paginator: AlbumPagination | undefined;

  @Output() paginationNavigationEventEmitter: EventEmitter<number> = new EventEmitter<number>();
  @Output() clickedAlbumEmitter: EventEmitter<Album> = new EventEmitter<Album>();
  @Output() pageSizeChangeEmitter: EventEmitter<number> = new EventEmitter<number>();
  @Output() changeOrderEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  clickedAlbum(event: Album) {
    this.clickedAlbumEmitter.emit(event);
  }

  firstPage(): void {
    this.paginationNavigationEventEmitter.emit(0)
  }
  previousPage(): void {
    this.paginationNavigationEventEmitter.emit(1)
  }
  nextPage(): void {
    this.paginationNavigationEventEmitter.emit(2);
  }
  lastPage(): void {
    this.paginationNavigationEventEmitter.emit(3);
  }

  pageSizeChange(pageSize: number): void {
    this.pageSizeChangeEmitter.emit(pageSize);
  }
  changeOrder(): void {
    this.changeOrderEmitter.emit(!this.paginator!.ascending);
  }
}
