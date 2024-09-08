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

  getProducts() {
    return this.http.get<Product[]>(`${this.baseUrl}`);
  }
  getProductsPages(page : number, size : number) {
    return this.http.get<Page<Product>>(`${this.baseUrl}?page=${page}&size=${size}&orderBy=${this.orderBy}`);
  }
  getProductBySku(sku : string) {
    return this.http.get<Product>(`${this.baseUrl}/sku/${sku}`);
  }
  getProductsByCategory(categoryId: number) {
    return this.http.get<Page<Product>>(`${this.baseUrl}/category/${categoryId}`);
  }
  addProduct(product : any) {
    return this.http.post<Product>(this.baseUrl, product);
  }
  deleteProduct(id : number) {
    return this.http.delete<Product>(`${this.baseUrl}/${id}`);
  }

}
