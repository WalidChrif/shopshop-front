import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { Store } from '@ngrx/store';

import { AppState } from '../store';
import { User } from '../common/user';
import { environment } from '../../../environment';
import * as newAuthActions from '../store/new-auth.actions';

@Injectable({
  providedIn: 'root',
})
export class KeycloakService {
  private _keycloak: Keycloak;
  private _user: User;
  storage: Storage = sessionStorage;

  constructor(private store: Store<AppState>) {}

  async init() {
    const authentification = await this.keycloak.init({
      onLoad: 'check-sso',
      // enableLogging: true,
      checkLoginIframe: false,
    });
    if (authentification) {
      this._user = (await this.keycloak.loadUserProfile()) as User;
      this.store.dispatch(newAuthActions.login(this.user));
    } else {
      this.store.dispatch(newAuthActions.logout());
    }
  }
  get keycloak() {
    if (!this._keycloak) {
      return (this._keycloak = new Keycloak({
        url: environment.keycloak.issuer,
        realm: environment.keycloak.realm,
        clientId: environment.keycloak.clientId,
      }));
    }
    return this._keycloak;
  }

  get user() {
    return this._user;
  }

  login() {
    this.keycloak.login();
  }

  logout() {
    this.store.dispatch(newAuthActions.logout());
    this.storage.clear();
    this.keycloak.logout({ redirectUri: 'https://localhost:4200' });
  }
}
