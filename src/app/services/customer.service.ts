import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../common/customer';
import { Page } from '../common/page';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  baseUrl = 'https://localhost:8443/api/v1/customers';

  constructor(private http: HttpClient) {}

  getCustomers(page: number = 0, size: number = 10) {
    return this.http.get<Page<Customer>>(
      `${this.baseUrl}?page=${page}&size=${size}`
    );
  }
}
