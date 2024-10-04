import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  baseUrl = 'http://localhost:8000/api/v1/states';
  constructor(private http: HttpClient) {}

  getStates(countryName: string) {
    return this.http.get<State[]>(`${this.baseUrl}/country/${countryName}`);
  }
  getCountries() {
    return this.http.get<Country[]>(`${this.baseUrl}/countries`);
  }

  getYears() {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, index) => currentYear + index);
    return years;
  }
}
