import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoMainViewComponent } from './photo-main-view.component';

describe('PhotoMainViewComponent', () => {
  let component: PhotoMainViewComponent;
  let fixture: ComponentFixture<PhotoMainViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhotoMainViewComponent]
    });
    fixture = TestBed.createComponent(PhotoMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
