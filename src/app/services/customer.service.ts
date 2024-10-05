import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../common/customer';
import { Page } from '../common/page';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  baseUrl = 'http://localhost:8000/api/v1/customers';

  constructor(private http: HttpClient) {}

  getCustomers(page: number = 0, size: number = 10, orderBy : string) {
    return this.http.get<Page<Customer>>(
      `${this.baseUrl}?page=${page}&size=${size}&orderBy=${orderBy}`
    );
  }
  getRecentCustomers() {
    return this.http.get<Customer[]>(`${this.baseUrl}/recent`);
  }
}
