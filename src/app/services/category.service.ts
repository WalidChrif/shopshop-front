import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../common/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl = 'http://localhost:8000/api/v1/categories';

  constructor(private http : HttpClient) { }
  getCategories() {
    return this.http.get<Category[]>(`${this.baseUrl}`);
  }

}
