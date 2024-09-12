import { Component } from '@angular/core';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor, CurrencyPipe],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css',
})
export class ShoppingCartComponent {
  cartItems: CartItem[] = [];
  totalPrice = 0.0;
  itemsInCart: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartItems = this.cartService.cartProducts;
    this.cartService.totalPrice.subscribe((totalPrice) => {
      this.totalPrice = totalPrice;
    });
    this.cartService.itemsInCart.subscribe((itemsInCart) => {
      this.itemsInCart = itemsInCart;
    });
    this.cartService.updateCartTotals();
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
