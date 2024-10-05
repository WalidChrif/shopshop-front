import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { User } from '../../../common/user';
import { KeycloakService } from '../../../services/keycloak.service';
import { ProductService } from '../../../services/product.service';
import { AppState } from '../../../store';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [RouterLink, NgIf, TranslateModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css',
})
export class UserInfoComponent {
  user: User;

  constructor(
    private keycloakService: KeycloakService,
    private store: Store<AppState>,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.store.select('newAuthReducer').subscribe((data) => {
      this.user = data.user;
    });
  }
  manageAccount() {
    this.keycloakService.keycloak.accountManagement();
  }
  login() {
    this.keycloakService.login();
  }
  signUp() {
    this.keycloakService.signUp();
  }
  logout() {
    this.keycloakService.logout();
  }
  addProduct() {
    //add this to routes
    this.router.navigate(['/admin', 'add-product']);
  }
}
