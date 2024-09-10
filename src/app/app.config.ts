import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // {provide : HTTP_INTERCEPTORS, useClass : OldAuthInterceptor, multi: true},
    importProvidersFrom(HttpClientModule),
    
    
    // provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
