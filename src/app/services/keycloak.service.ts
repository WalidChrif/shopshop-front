import { AbstractControl, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from '../store';
import { Profile } from '../common/profile';
import { environment } from '../../../environment';
import * as authActions from '../store/auth.actions';
import * as newAuthActions from '../store/new-auth.actions';

@Injectable({
  providedIn: 'root',
})
export class KeycloakService {
  private _keycloak: Keycloak | undefined;
  private _profile: Profile | undefined;
  private profileSubject = new BehaviorSubject<Profile | undefined>(undefined);
   private auth ;


  constructor(private store: Store<AppState>) {}

  async init() {
    const authentification = await this.keycloak.init({
      onLoad: 'check-sso',
      // enableLogging: true,
      checkLoginIframe: false,
    });
    if (authentification) {
      this._profile = (await this.keycloak.loadUserProfile()) as Profile;
      // this.profileSubject.next(this._profile);
      // this.store.dispatch(new authActions.login(this.profile));
      this.store.dispatch(newAuthActions.login(this.profile));
      console.log('this.auth :::: ', this.auth);
      
    } else {
      // this.profileSubject.next(undefined);
      // this.store.dispatch(new authActions.logout());
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

  get profile() {
    return this._profile;
  }

  login() {
    this.keycloak.login();
  }

  logout() {
    // this.profileSubject.next(undefined);
    // this.store.dispatch(new authActions.logout());
    this.store.dispatch(newAuthActions.logout());
    this.keycloak.logout();

  }
}
