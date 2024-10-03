import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../common/order';
import { Page } from '../common/page';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = 'https://localhost:8443/api/v1/orders';

  constructor(private http: HttpClient) {}

  getOrders(page: number = 0, size: number = 10) {
    return this.http.get<Page<Order>>(
      `${this.baseUrl}/all?page=${page}&size=${size}`
    );
  }
  getOrdersForUser(email: string) {
    return this.http.get<Order[]>(this.baseUrl, {
      params: {
        email: email,
      },
    });
  }
  getOrder(trackingNumber: string) {
    return this.http.get<Order>(`${this.baseUrl}/${trackingNumber}`);
  }
}
