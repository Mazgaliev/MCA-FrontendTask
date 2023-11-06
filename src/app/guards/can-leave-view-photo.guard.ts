import { inject } from "@angular/core";
import { CanDeactivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { ViewPhotosComponent } from '../components/view-photos/view-photos.component';
import { Selectors } from '../store';

export const canLeaveViewPhotoGuard: CanDeactivateFn<ViewPhotosComponent> = (component, currentRoute, currentState, nextState) => {
  const $destroy = new Subject<void>();
  var photo: any;

  inject(Store).select(Selectors.selectPickedPhoto)
    .pipe(takeUntil($destroy)).subscribe(data => {
      photo = data
    });


  $destroy.next();
  $destroy.complete();

  if (photo != null) {
    alert("You still have a selected photo");
    return false;
  }

  return true;
};
