import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import { Page } from '../common/page';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl : string = 'http://localhost:8000/api/v1/products';
  orderBy = "unitPrice";

  constructor(private http : HttpClient) { }

  getProductsByCategory(categoryId: number, page : number, size : number) {
    return this.http.get<Page<Product>>(`${this.baseUrl}/category/${categoryId}?page=${page}&size=${size}&orderBy=${this.orderBy}`);
  }
  getProductsByName(name : string, page : number, size : number) {
    return this.http.get<Page<Product>>(`${this.baseUrl}/search/${name}?page=${page}&size=${size}&orderBy=${this.orderBy}`);
  }
  getProductBySku(sku : string) {
    return this.http.get<Product>(`${this.baseUrl}/sku/${sku}`);
  }

  findOneProductPerCategory() {
    return this.http.get<Product[]>(`${this.baseUrl}`);
  }
}
