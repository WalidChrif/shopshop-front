import { DatePipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Customer } from '../../../common/customer';
import { Order } from '../../../common/order';
import { Product } from '../../../common/product';
import { OrderService } from '../../../services/order.service';
import { ProductService } from '../../../services/product.service';
import { CustomerService } from './../../../services/customer.service';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [NgFor, DatePipe, TranslateModule],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css',
})
export class AdminHomeComponent {
  orders: Order[] = [];
  customers: Customer[] = [];
  products: Product[] = [];

  constructor(
    private customerService: CustomerService,
    private orderService: OrderService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    //add ngb paging
    this.orderService.getOrders().subscribe((res) => {
      this.orders = res.content.slice(0, 5);
    });

    this.customerService.getCustomers().subscribe((res) => {
      this.customers = res.content.slice(0, 5);
    });

    this.productService.getProducts().subscribe((res) => {
      this.products = res.content.slice(0, 5);
    });
  }
}
