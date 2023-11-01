import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const canActivateViewPhotoGuard: CanActivateFn = (route, state) => {

  const albumId: any = route.paramMap.get('albumId');
  if (albumId != null && +albumId <= 0) {
    return inject(Router).parseUrl('/home');
  }

  return true;
};
