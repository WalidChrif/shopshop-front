import { KeycloakService } from './../../services/keycloak.service';
import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Profile } from '../../common/profile';

@Component({
  selector: 'app-cart-status',
  standalone: true,
  imports: [RouterLink, NgIf, CurrencyPipe],
  templateUrl: './cart-status.component.html',
  styleUrl: './cart-status.component.css',
})
export class CartStatusComponent {
  totalPrice = 0.0;
  totalQuantity = 0;
  profile: Profile | undefined;

  constructor(
    private router: Router,
    private cartService: CartService,
    private keycloakService: KeycloakService
  ) {}

  ngOnInit() {
    this.keycloakService.profileSubject.subscribe((profile) => {
      this.profile = profile;
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
    // this.router.navigate(['auth','login']);
  }
  logout() {
    this.keycloakService.logout();
    // this.router.navigate(['auth','signup']);
  }
}
