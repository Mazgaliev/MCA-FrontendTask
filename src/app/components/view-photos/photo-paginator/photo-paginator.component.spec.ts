import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoPaginatorComponent } from './photo-paginator.component';

describe('PhotoPaginatorComponent', () => {
  let component: PhotoPaginatorComponent;
  let fixture: ComponentFixture<PhotoPaginatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhotoPaginatorComponent]
    });
    fixture = TestBed.createComponent(PhotoPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
