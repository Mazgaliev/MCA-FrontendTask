import { TestBed } from '@angular/core/testing';

import { canLeaveViewPhotoGuard } from './can-leave-view-photo.guard';

describe('CanLeaveViewPhotoGuard', () => {
  let guard = canLeaveViewPhotoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(canLeaveViewPhotoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
