import { Purchase } from '../common/purchase';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = 'https://localhost:8443/api/v1/checkout/purchase';

  constructor(private http : HttpClient) { }

  placeOrder(purchase : Purchase){
    return this.http.post<{trackingNumber : string}>(`${this.baseUrl}`,purchase);
  }
}
