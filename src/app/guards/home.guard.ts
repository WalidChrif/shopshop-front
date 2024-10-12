import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { AppState } from '../store';

export const HomeGuard: CanActivateFn = (_route, _state) => {
  const router = inject(Router);
  const store = inject(Store<AppState>);

  return store.select('newAuthReducer').pipe(
    take(1),
    map((data) => {
      if (data?.user?.role === 'ADMIN') {
        router.navigate(['/admin']);
        return false;
      } else return true;
    })
  );
};
