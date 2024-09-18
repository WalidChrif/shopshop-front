import { AbstractControl, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { Profile } from '../common/profile';
import { environment } from '../../../environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KeycloakService {
  private _keycloak: Keycloak | undefined;
  private _profile: Profile | undefined;
  profileSubject = new BehaviorSubject<Profile | undefined>(undefined);
  

  constructor() {}

  async init() {
    const authentification = await this.keycloak.init({
      onLoad: 'check-sso',
      // enableLogging: true,
      checkLoginIframe: false,
    });
    if (authentification) {
      this._profile = (await this.keycloak.loadUserProfile()) as Profile; 
      this.profileSubject.next(this._profile);  
      console.log('Authentification success :::', this.profile);
       
    } else {
      console.error('Authentification failed :::', this.profile);
    }
  }
  get keycloak() {
    if (!this._keycloak) {
      return (this._keycloak = new Keycloak({
        url: environment.keycloak.issuer,
        realm: environment.keycloak.realm,
        clientId: environment.keycloak.clientId
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
    this.profileSubject.next(undefined);
    this.keycloak.logout();
  }
}
