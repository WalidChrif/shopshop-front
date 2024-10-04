import { DatePipe, NgClass, NgFor, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Customer } from '../../../common/customer';
import { Order } from '../../../common/order';
import { Product } from '../../../common/product';
import { OrderService } from '../../../services/order.service';
import { ProductService } from '../../../services/product.service';
import { SalesService } from '../../../services/sales.service';
import { CustomerService } from './../../../services/customer.service';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [RouterLink, NgClass, NgStyle, NgFor, DatePipe, TranslateModule],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css',
})
export class AdminHomeComponent {
  orders: Order[] = [];
  customers: Customer[] = [];
  products: Product[] = [];
  bestSeller: Product;
  weeklyEarnings: number;
  monthlyEarnings: number;
  sales: number;
  goal: number;

  constructor(
    private customerService: CustomerService,
    private orderService: OrderService,
    private productService: ProductService,
    private salesService: SalesService
  ) {}

  ngOnInit() {
    this.salesService.getSales().subscribe((res) => {
      this.sales = res;
    });
    this.salesService.getMonthlyEarnings().subscribe((res) => {
      this.monthlyEarnings = res;
    });
    this.salesService.getWeeklyEarnings().subscribe((res) => {
      this.weeklyEarnings = res;
    });

    this.productService.getBestSeller().subscribe((res) => {
      this.bestSeller = res;
    });
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
