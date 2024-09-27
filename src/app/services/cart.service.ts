import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartProducts: CartItem[] = [];
  totalPrice = new BehaviorSubject<number>(0);
  itemsPrice = new BehaviorSubject<number>(0);
  totalItems = new BehaviorSubject<number>(0);
  shippingCost = +4.99;
  storage: Storage = sessionStorage;

  constructor() {
    this.storage.getItem('cartItems') &&
      (this.cartProducts = JSON.parse(
        this.storage.getItem('cartItems') || '{}'
      )) &&
      this.updateCartTotals();
  }
  clearCart() {
    this.storage.clear();
    this.cartProducts = [];
    this.updateCartTotals();
  }

  addToCart(cartItem: CartItem) {
    const existingItem = this.cartProducts.find(
      (item) => item.sku === cartItem.sku
    );
    if (existingItem) {
      existingItem.quantity++;
      existingItem.unitsInStock--;
    } else {
      this.cartProducts.push(cartItem);
      cartItem.unitsInStock--;
    }
    this.updateCartTotals();
  }
  removeFromCart(cartItem: CartItem) {
    cartItem.quantity--;
    cartItem.unitsInStock++;
    this.updateCartTotals();
  }
  updateCartTotals(shippingCost = this.shippingCost) {
    this.shippingCost = +shippingCost;
    let totalPriceValue = this.cartProducts.reduce(
      (accumulator, product) =>
        accumulator + product.unitPrice * product.quantity,
      0
    );
    let totalItemsValue = this.cartProducts.reduce(
      (accumulator, product) => accumulator + product.quantity,
      0
    );
    this.itemsPrice.next(totalPriceValue);
    this.totalPrice.next(totalPriceValue + +shippingCost);
    this.totalItems.next(totalItemsValue);
    this.storage.setItem('cartItems', JSON.stringify(this.cartProducts));
  }
}
