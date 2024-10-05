import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export const cancelGuard: CanDeactivateFn<CanComponentDeactivate> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  return component.canDeactivate ? component.canDeactivate() : true;
};