import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { map, take } from 'rxjs';

export const AdminGuard: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const store = inject(Store<AppState>);

  return store.select('newAuthReducer').pipe(
    take(1),
    map((data) => {
      if (!data.user ) {
        router.navigate(['/signin']);
        return false;
      }
      if (data.user.role === 'ADMIN') {
        return true;
      }
      else{
        router.navigate(['/home']);
        return false;
      }
    })
  );
};
