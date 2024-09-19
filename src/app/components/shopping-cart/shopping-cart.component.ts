import { Component } from '@angular/core';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [RouterLink, NgbPopover, NgIf, NgFor, CurrencyPipe],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css',
})
export class ShoppingCartComponent {
  cartItems: CartItem[] = [];
  totalPrice = 0.0;
  totalQuantity: number = 0;
  authenticated = false;

  constructor(private cartService: CartService,
    private store : Store<AppState>) {}

  ngOnInit() {
    this.cartItems = this.cartService.cartProducts;
    this.cartService.totalPrice.subscribe((totalPrice) => {
      this.totalPrice = totalPrice;
    });
    this.cartService.totalQuantity.subscribe((totalQuantity) => {
      this.totalQuantity = totalQuantity;
    });
    this.store.select('newAuthReducer').subscribe((auth) => {
      this.authenticated = !!auth.profile;
    });    
  }
  addToCart(cartItem: CartItem) {
    this.cartService.addToCart(cartItem);
    this.cartService.updateCartTotals();
  }
  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem);
    this.cartService.updateCartTotals();
  }
}
