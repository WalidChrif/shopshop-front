import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CartItem } from '../../../common/cart-item';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [RouterLink, FormsModule, NgbPopover, NgIf, NgFor, CurrencyPipe, TranslateModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css',
})
export class ShoppingCartComponent {
  cartItems: CartItem[] = [];
  totalPrice = 0.0;
  itemsPrice = 0.0;
  totalItems = 0;
  shippingCost = 4.99;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartItems = this.cartService.cartProducts.filter(
      (item) => item.quantity > 0
    );
    this.shippingCost = +this.cartService.shippingCost.toFixed(2);
    this.cartService.totalPrice.subscribe((totalPrice) => {
      this.totalPrice = totalPrice;
    });
    this.cartService.itemsPrice.subscribe((itemsPrice) => {
      this.itemsPrice = itemsPrice;
    });
    this.cartService.totalItems.subscribe((totalItems) => {
      this.totalItems = totalItems;
    });
  }
  addToCart(cartItem: CartItem) {
    this.cartService.addToCart(cartItem);
  }
  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem);
  }
  updateCart() {
    this.cartService.updateCartTotals(this.shippingCost);
  }
}
