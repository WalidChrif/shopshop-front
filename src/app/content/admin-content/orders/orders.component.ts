import { FormsModule } from '@angular/forms';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Order } from '../../../common/order';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [FormsModule, NgbPagination, TranslateModule, NgFor, NgIf, RouterLink, DatePipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {
  orders: Order[] = [];
  page = 1;
  pageSize = 10;
  totalElements = 0;

  constructor(private orderService: OrderService) {}
  ngOnInit() {
    this.getOrders();
  }
  getOrders() {
    this.orderService
      .getOrders(this.page - 1, this.pageSize)
      .subscribe((response) => {
        this.orders = response.content;
        this.page = response.number + 1;
        this.pageSize = response.size;
        this.totalElements = response.totalElements;
      });
  }
}
