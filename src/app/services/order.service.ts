import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../common/purchase';
import { Order } from '../common/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  private baseUrl = 'https://localhost:8443/api/v1/orders';

  constructor(private http: HttpClient) {}

  getOrders(email : string) {
    return this.http.get<Order[]>(this.baseUrl, {
      params:{
        email: email
      }
    });
  }
  getOrder(trackingNumber: string) {
    return this.http.get<Order>(`${this.baseUrl}/${trackingNumber}`);
  }
}
