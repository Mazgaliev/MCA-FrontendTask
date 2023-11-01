import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { viewPhotoGuard } from '../view-photo.guard';

describe('viewPhotoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => viewPhotoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
