import { KeycloakService } from './../../services/keycloak.service';
import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AsyncPipe, CurrencyPipe, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../common/user';
import { AppState } from '../../store';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cart-status',
  standalone: true,
  imports: [RouterLink, TranslateModule, NgIf, CurrencyPipe, AsyncPipe],
  templateUrl: './cart-status.component.html',
  styleUrl: './cart-status.component.css',
})
export class CartStatusComponent {
  itemsPrice = 0.0;
  totalItems = 0;
  user: User | undefined;
  user$: User | undefined;
  currentCurrency : string;

  constructor(
    private cartService: CartService,
    private keycloakService: KeycloakService,
    private store: Store<AppState>,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.store.select('newAuthReducer').subscribe((data) => {
      this.user$ = data.user;
    });
    this.cartService.itemsPrice.subscribe((itemsPrice) => {
      this.itemsPrice = itemsPrice;
    });
    this.cartService.totalItems.subscribe((totalItems) => {
      this.totalItems = totalItems;
    });
  }
  login() {
    this.keycloakService.login();
  }
  logout() {
    this.keycloakService.logout();
  }
  switchLanguage(event: any) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.translate.use(selectedValue);
    this.currentCurrency = this.translate.instant('CURRENCY_FORMAT');
  }
}
