import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { State } from '../common/state';
import { Country } from '../common/country';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  baseUrl = 'http://localhost:8000/api/v1/countries';
  constructor(private http: HttpClient) {}

  getStates(countryId: number) {
    return this.http.get<State[]>(`${this.baseUrl}/${countryId}/states}`);
  }
  getCountries() {
    return this.http.get<Country[]>(`${this.baseUrl}`);
  }
  getCountryById(id: number) {
    this.http.get<Country>(`${this.baseUrl}/${id}`);
  }
  getCreditCardTypes() {
    return [
      'Visa',
      'MasterCard',
      'American Express',
      'Discover',
      'JCB',
      'Diners Club',
      'UnionPay',
    ];
  }

  setDates() {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 20 }, (_, index) => currentYear + index);
    const months = Array.from({ length: 12 }, (_, i) =>
      new Date(0, i).toLocaleString('default', { month: 'long' })
    );
    return { years, months };
  }
}
