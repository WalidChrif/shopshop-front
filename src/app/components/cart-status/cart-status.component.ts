import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-status',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './cart-status.component.html',
  styleUrl: './cart-status.component.css'
})
export class CartStatusComponent {

  totalPrice = 0.0;
  totalQuantity = 0;

  constructor(private cartService : CartService) { }

  ngOnInit() {
    this.cartService.totalPrice.subscribe(totalPrice => this.totalPrice = totalPrice);
    this.cartService.totalQuantity.subscribe(totalQuantity => this.totalQuantity = totalQuantity);

  }

}
