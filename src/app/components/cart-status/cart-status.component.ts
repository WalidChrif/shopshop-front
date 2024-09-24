import { KeycloakService } from './../../services/keycloak.service';
import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AsyncPipe, CurrencyPipe, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Profile } from '../../common/profile';
import { AppState } from '../../store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-cart-status',
  standalone: true,
  imports: [RouterLink, NgIf, CurrencyPipe, AsyncPipe],
  templateUrl: './cart-status.component.html',
  styleUrl: './cart-status.component.css',
})
export class CartStatusComponent {
  totalPrice = 0.0;
  totalQuantity = 0;
  profile: Profile | undefined;
  profile$: Profile | undefined;

  constructor(
    private cartService: CartService,
    private keycloakService: KeycloakService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store.select('newAuthReducer').subscribe((data) => {
      this.profile$ = data.profile;
    });
    this.cartService.totalPrice.subscribe(
      (totalPrice) => (this.totalPrice = totalPrice)
    );
    this.cartService.totalQuantity.subscribe(
      (totalQuantity) => (this.totalQuantity = totalQuantity)
    );
  }
  login() {
    this.keycloakService.login();
  }
  logout() {
    this.keycloakService.logout();
  }
}
