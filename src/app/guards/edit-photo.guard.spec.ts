import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { editPhotoGuard } from './edit-photo.guard';

describe('editPhotoGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => editPhotoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
