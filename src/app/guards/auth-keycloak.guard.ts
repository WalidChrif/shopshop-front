import { CanActivateFn } from '@angular/router';
import { KeycloakService } from '../services/keycloak.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const keycloakService = inject(KeycloakService);
  if (!keycloakService.keycloak.authenticated) {
    keycloakService.login();
    return false;
  }
  return true;
};
