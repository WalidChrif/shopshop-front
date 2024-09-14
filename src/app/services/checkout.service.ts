import { Purchase } from '../common/purchase';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = 'http://localhost:8000/api/v1/checkout/purchase';

  constructor(private http : HttpClient) { }

  placeOrder(purchase : Purchase){
    return this.http.post<string>(`${this.baseUrl}`,purchase);
  }
}
