import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../common/purchase';
import { Order } from '../common/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = 'http://localhost:8000/api/v1/orders';

  constructor(private http: HttpClient) {}

  getOrders(email : string) {
    return this.http.get<Order[]>(this.baseUrl, {
      params:{
        email: email
      }
    });
  }
}
