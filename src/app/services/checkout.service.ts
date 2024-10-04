import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../common/purchase';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  baseUrl = 'http://localhost:8000/api/v1/checkout/purchase';

  constructor(private http: HttpClient) {}

  placeOrder(purchase: Purchase) {
    return this.http.post<{ trackingNumber: string }>(
      `${this.baseUrl}`,
      purchase
    );
  }
}
