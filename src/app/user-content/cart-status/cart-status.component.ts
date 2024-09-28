import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AsyncPipe, CurrencyPipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

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

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.itemsPrice.subscribe((itemsPrice) => {
      this.itemsPrice = itemsPrice;
    });
    this.cartService.totalItems.subscribe((totalItems) => {
      this.totalItems = totalItems;
    });
  }
}
