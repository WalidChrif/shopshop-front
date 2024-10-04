import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  baseUrl = 'http://localhost:8000/api/v1/sales';

  constructor(private http: HttpClient) {}

  getSales() {
    return this.http.get<number>(`${this.baseUrl}`);
  }
  getWeeklySales() {
    return this.http.get<number>(`${this.baseUrl}/weekly-sales`);
  }
  getMonthlySales() {
    return this.http.get<number>(`${this.baseUrl}/monthly-sales`);
  }
  getEarnings() {
    return this.http.get<number>(`${this.baseUrl}/earnings`);
  }
  getMonthlyEarnings() {
    return this.http.get<number>(`${this.baseUrl}/monthly-earnings`);
  }
  getWeeklyEarnings() {
    return this.http.get<number>(`${this.baseUrl}/weekly-earnings`);
  }

}
