import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { canLeaveViewPhotoGuard } from './can-leave-view-photo.guard';

describe('canLeaveViewPhotoGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canLeaveViewPhotoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
