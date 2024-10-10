import { CurrencyPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { switchMap, take } from 'rxjs';
import { Order } from '../../../common/order';
import { User } from '../../../common/user';
import { OrderService } from '../../../services/order.service';
import { AppState } from '../../../store';
import { NewAuthState } from '../../../store/new-auth.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, DatePipe, NgIf, NgFor, TranslateModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css',
})
export class OrderHistoryComponent {
  orders: Order[] = [];
  user: User;

  constructor(
    private orderService: OrderService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store
      .select('newAuthReducer')
      .pipe(
        take(1),
        switchMap((response: NewAuthState) => {
          this.user = response.user;
          return this.orderService.getOrdersForUser(response.user.email);
        })
      )
      .subscribe((orders: Order[]) => {
        this.orders = orders;
      });
  }
}
