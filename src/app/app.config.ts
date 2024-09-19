import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { KeycloakService } from './services/keycloak.service';
import { tokenInterceptor } from './interceptors/token.interceptor';
import { provideStore } from '@ngrx/store';
import { authReducer } from './store/auth.reducer';
import { reducers } from './store';

export function initializeKeycloak(keycloakService: KeycloakService) {
  return () => keycloakService.init();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // {provide : HTTP_INTERCEPTORS, useClass : OldAuthInterceptor, multi: true},
    // importProvidersFrom(HttpClientModule),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    {
        provide: APP_INITIALIZER,
        useFactory: initializeKeycloak,
        multi: true,
        deps: [KeycloakService],
    },
      provideStore(reducers),
],
};
