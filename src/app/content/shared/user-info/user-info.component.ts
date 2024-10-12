import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { User } from '../../../common/user';
import { AuthService } from '../../../services/auth.service';
import { AppState } from '../../../store';
import * as newAuthActions from '../../../store/new-auth.actions';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [RouterLink, NgIf, TranslateModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css',
})
export class UserInfoComponent {
  user: User;
  storage: Storage = sessionStorage;

  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router,
    private cartService : CartService
  ) {}

  ngOnInit() {
    this.store.select('newAuthReducer').subscribe((data) => {
      this.user = data.user;
    });
  }
  logout() {
    // this.keycloakService.logout();
    this.authService.logout(String(this.user.id)).subscribe();
    this.cartService.clearCart();
    this.store.dispatch(newAuthActions.logout());
    this.router.navigate(['/']);
  }
  addProduct() {
    this.router.navigate(['/admin', 'add-product']);
  }
}
