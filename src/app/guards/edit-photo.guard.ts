import { CanDeactivateFn } from '@angular/router';
import { EditPhotoComponent } from '../components/photo-main-view/edit-photo/edit-photo.component';

export const editPhotoGuard: CanDeactivateFn<EditPhotoComponent> = (component, currentRoute, currentState, nextState) => {


  if (!component.editPictureForm.valid) {

    return confirm("You will lose all progress.");
  }

  return true;
};
