import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Product } from '../common/product';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  cartProducts: CartItem[] = [];
  totalPrice = new Subject<number>();
  itemsInCart = new Subject<number>();

  constructor() {}

  addToCart(cartItem: CartItem) {
    const existingItem = this.cartProducts.find(
      (item) => item.sku === cartItem.sku
    );
    if (existingItem) {
      existingItem.quantity++;
      existingItem.unitsInStock--;
      
    }
    else {
      this.cartProducts.push(cartItem);
      cartItem.unitsInStock--;
    }
    this.updateCartTotals();
  }
  removeFromCart(cartItem: CartItem) {
    cartItem.quantity--;
    cartItem.unitsInStock++;

  }
  updateCartTotals() {
    let totalPriceValue = this.cartProducts.reduce(
      (accumulator, product) =>
        accumulator + product.unitPrice * product.quantity,
      0
    );
    let totalItemsValue = this.cartProducts.reduce((accumulator, product) => accumulator + product.quantity, 0);
    this.totalPrice.next(totalPriceValue);
    this.itemsInCart.next(totalItemsValue);
  }

}