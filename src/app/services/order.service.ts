import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../common/order';
import { Page } from '../common/page';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = 'http://localhost:8000/api/v1/orders';

  constructor(private http: HttpClient) {}

  getOrders(page: number = 0, size: number = 10, orderBy: string) {
    return this.http.get<Page<Order>>(
      `${this.baseUrl}/all?page=${page}&size=${size}&orderBy=${orderBy}`
    );
  }
  getOrdersForUser(email: string, orderBy: string) {
    return this.http.get<Order[]>(this.baseUrl, {
      headers: {
        email: email,
      },
      params: {
        orderBy: orderBy,
      },
    });
  }
  getRecentOrders() {
    return this.http.get<Order[]>(`${this.baseUrl}/recent`);
  }
  getOrder(trackingNumber: string) {
    return this.http.get<Order>(`${this.baseUrl}/${trackingNumber}`);
  }
}
