import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePhotoComponent } from './create-photo.component';

describe('CreatePhotoComponent', () => {
  let component: CreatePhotoComponent;
  let fixture: ComponentFixture<CreatePhotoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePhotoComponent]
    });
    fixture = TestBed.createComponent(CreatePhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
