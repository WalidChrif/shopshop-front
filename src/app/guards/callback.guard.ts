import { inject } from '@angular/core';
import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { take, map } from 'rxjs';
import { AppState } from '../store';

export const CallbackGuard: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const store = inject(Store<AppState>);

  return store.select('newAuthReducer').pipe(
    take(1),
    map((data) => {
      if (!data.user) {
        router.navigate(['/signin']);
        return false;
      }
      if (data.user.role === 'ADMIN') {
        router.navigate(['/admin']);
        return false;
      }
      else {
        router.navigate(['/home']);
        return false;
      }
    })
  );
};
