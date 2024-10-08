import { Component } from '@angular/core';
import { CurrencyPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { AppState } from '../../../store';
import { OrderService } from '../../../services/order.service';
import { NewAuthState } from '../../../store/new-auth.reducer';
import { Order } from '../../../common/order';
import { User } from '../../../common/user';


@Component({
  selector: 'app-order-receipt',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, CurrencyPipe, TranslateModule],
  templateUrl: './order-receipt.component.html',
  styleUrl: './order-receipt.component.css',
})
export class OrderReceiptComponent {
  trackingNumber: string;
  order: Order;
  user: User;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.store.select('newAuthReducer').subscribe((authState: NewAuthState) => {
      this.user = authState.user;      
    });
    this.trackingNumber = this.route.snapshot.paramMap.get('tracking-number');
    this.orderService.getOrder(this.trackingNumber).subscribe((data) => {
      this.order = new Order(
        data.trackingNumber,
        this.user,
        data.totalPrice,
        data.totalItems,
        data.shippingCost,
        data.shippingAddress,
        data.dateCreated,
        data.status,
        data.orderItems
      );
    });
  }
}
