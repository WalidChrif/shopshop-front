import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, switchMap, take } from 'rxjs';
import { JwtService } from '../services/jwt.service';
import { AppState } from '../store';
import { AuthState } from '../store/auth.reducer';
import * as newAuthActions from '../store/new-auth.actions';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtService = inject(JwtService);
  const store = inject(Store<AppState>);

  if (
    req.url.includes('login') ||
    req.url.includes('refresh-token') ||
    req.url.includes('register') ||
    req.url.includes('logout')
  ) {
    return next(req);
  }

  return store.select('newAuthReducer').pipe(
    take(1),
    switchMap((data: AuthState) => {
      if (data.user != null) {       
        const accessToken = data.user.accessToken;
        if (jwtService.isTokenExpired(accessToken)) {
          return jwtService.refreshToken(data.user.refreshToken).pipe(
            switchMap((newToken: any) => {
              const newUser = jwtService.parseToken(newToken.access_token);
              store.dispatch(newAuthActions.login(newUser));
              return next(
                req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${newToken.access_token}`,
                  },
                })
              );
            }),
            catchError((err) => {
              console.error('Token refresh failed', err);
              // Optionally, dispatch a logout action here or handle error as needed
              throw new Error('Failed to refresh token');
            })
          );
        } else {
          return next(
            req.clone({
              setHeaders: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
          );
        }
      } else {
        return next(req);
        // throw new Error('User not logged in');
      }
    })
  );
};
