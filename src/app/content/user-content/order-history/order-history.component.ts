import { Component } from '@angular/core';
import { CurrencyPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { exhaustMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../common/order';
import { AppState } from '../../../store';
import { User } from '../../../common/user';
import { NewAuthState } from '../../../store/new-auth.reducer';


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
      return this.orderService.getOrdersForUser(response.user.email);
    })).subscribe((orders : Order[]) => {
      this.orders = orders;
    });
    
  }

}
