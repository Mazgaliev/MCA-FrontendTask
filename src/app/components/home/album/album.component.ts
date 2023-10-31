import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Album } from 'src/app/model/Albums';
import { Photo } from 'src/app/model/Photo';
import { AppActions } from 'src/app/store';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent {

  constructor() {

  }


  @Input() album: Album | undefined;
  @Output() selectedAlbumEmitter: EventEmitter<Album> = new EventEmitter<Album>()

  viewPhotos(): void {
    this.selectedAlbumEmitter.emit(this.album)
  }
}
