import { inject } from "@angular/core";
import { ActivatedRoute, CanDeactivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { ViewPhotosComponent } from '../components/view-photos/view-photos.component';
import { Selectors } from '../store';

export const canLeaveViewPhotoGuard: CanDeactivateFn<ViewPhotosComponent> = (component, currentRoute, currentState, nextState) => {
  const $destroy = new Subject<void>();
  var photo: any;

  inject(Store).select(Selectors.selectPickedPhoto)
    .pipe(takeUntil($destroy)).subscribe(data => {
      console.log(data);
      photo = data
    });

  // const photoId = inject(ActivatedRoute).snapshot.paramMap.get('photoId')
  console.log( inject(ActivatedRoute).snapshot.paramMap);

  if (photo != null) {
    return false;
  }

  $destroy.next();
  $destroy.complete();

  return true;
};
