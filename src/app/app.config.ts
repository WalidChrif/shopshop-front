import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
// import { KeycloakService } from './services/keycloak.service';
import { provideStore } from '@ngrx/store';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslationLoader } from './translation/translation-loader';
import { routes } from './app.routes';
import { reducers } from './store';
import { tokenInterceptor } from './interceptors/token.interceptor';

// export function initializeKeycloak(keycloakService: KeycloakService) {
//   return () => keycloakService.init();
// }
export function initializeTranslateService(translate: TranslateService) {
  return () => {
    translate.setDefaultLang('en');
    return translate.use('en').toPromise();
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // {provide : HTTP_INTERCEPTORS, useClass : OldAuthInterceptor, multi: true},
    // importProvidersFrom(HttpClientModule),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializeKeycloak,
    //   multi: true,
    //   deps: [KeycloakService],
    // },
    provideStore(reducers),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useClass: TranslationLoader, // Your custom translation loader
          deps: [HttpClient], // Inject HttpClient
        },
      })
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeTranslateService,
      deps: [TranslateService],
      multi: true,
    },
    TranslateService, // Provide TranslateService
  ],
};
