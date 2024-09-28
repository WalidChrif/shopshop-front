import { Component } from '@angular/core';
import { KeycloakService } from '../../services/keycloak.service';
import { AppState } from '../../store';
import { Store } from '@ngrx/store';
import { User } from '../../common/user';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [ RouterLink, NgIf, TranslateModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {
  user$: User | undefined;

  constructor ( private keycloakService: KeycloakService,
  private store: Store<AppState>,
) {}

ngOnInit() {
  this.store.select('newAuthReducer').subscribe((data) => {
    this.user$ = data.user;
  });  
}
login() {
  this.keycloakService.login();
}
logout() {
  this.keycloakService.logout();
}
}
