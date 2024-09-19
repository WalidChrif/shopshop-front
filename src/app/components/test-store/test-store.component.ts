import { KeycloakService } from './../../services/keycloak.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { Component } from '@angular/core';
import * as authActions from '../../store/auth.actions';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-test-store',
  standalone: true,
  imports: [NgIf],
  templateUrl: './test-store.component.html',
  styleUrl: './test-store.component.css',
})
export class TestStoreComponent {
  result: any;

  constructor(
    private keycloakService: KeycloakService
    ,private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select('authReducer').subscribe((data) => {
      this.result = data.profile;
    });;
    // const result2 = this.store.select('newAuthReducer');
  }

  logout() {
    this.keycloakService.logout();
  }
  login() {
    this.keycloakService.login();
  }
}
