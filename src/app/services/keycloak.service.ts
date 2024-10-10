// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { Store } from '@ngrx/store';
// import Keycloak from 'keycloak-js';

// import { TranslateService } from '@ngx-translate/core';
// import { environment } from '../../../environment';
// import { User } from '../common/user';
// import { AppState } from '../store';
// import * as newAuthActions from '../store/new-auth.actions';

// @Injectable({
//   providedIn: 'root',
// })
// export class KeycloakService {
//   private _keycloak: Keycloak;
//   private _user: User;
//   storage: Storage = sessionStorage;

//   constructor(
//     private store: Store<AppState>,
//     private router: Router,
//     private translate: TranslateService
//   ) { }

//   async init() {
//     const authentification = await this.keycloak.init({
//       onLoad: 'check-sso',
//       // enableLogging: true,
//       checkLoginIframe: false,
//     });
//     if (authentification) {
//       // this._user = (await this.keycloak.loadUserProfile()) as User;
//       // this._user.userType = this._user.attributes['userType'][0];
//       this.keycloak.loadUserProfile().then((user: User) => {
//         this._user = user as User;
//         // this._user.userType = user?.attributes?.['userType'][0];
//         this.store.dispatch(newAuthActions.login(this._user));
//         // if (this._user.userType === 'Admin') this.router.navigate(['/admin']);
//       });
//     } else {
//       this.store.dispatch(newAuthActions.logout());
//     }
//   }
//   get keycloak() {
//     if (!this._keycloak) {
//       return (this._keycloak = new Keycloak({
//         url: environment.keycloak.server,
//         realm: environment.keycloak.realm,
//         clientId: environment.keycloak.clientId,
//       }));
//     }
//     return this._keycloak;
//   }

//   get user() {
//     return this._user;
//   }

//   login() {
//     this.keycloak.login();
//   }
//   signUp() {
//     this.keycloak.register();
//   }

//   logout() {
//     this.store.dispatch(newAuthActions.logout());
//     this.storage.clear();
//     this.translate.use('en');
//     this.keycloak.logout({ redirectUri: 'http://localhost:4200' });
//   }
// }
