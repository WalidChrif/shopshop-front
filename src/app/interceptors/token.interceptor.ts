import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { KeycloakService } from '../services/keycloak.service';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const keycloakSrvice = inject(KeycloakService);
  const token = keycloakSrvice.keycloak.token;
  if (token) {
    const reqClone = req.clone({
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    })    
    return next(reqClone);
  }
  return next(req);
};
