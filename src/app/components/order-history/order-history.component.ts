import { OrderService } from './../../services/order.service';
import { Component } from '@angular/core';
import { AppState } from '../../store';
import { Store } from '@ngrx/store';
import { exhaustMap } from 'rxjs';
import { User } from '../../common/user';
import { NewAuthState } from '../../store/new-auth.reducer';
import { CurrencyPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Order } from '../../common/order';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, DatePipe, NgIf, NgFor, TranslateModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent {
  orders : Order[] = [];
  user : User

  constructor(private orderService : OrderService,
    private store : Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('newAuthReducer').pipe(exhaustMap((response : NewAuthState) => {
      this.user = response.user;
      return this.orderService.getOrders(response.user.email);
    })).subscribe((orders : Order[]) => {
      this.orders = orders;
    });
    
  }

}
