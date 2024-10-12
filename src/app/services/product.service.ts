import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../common/category';
import { Page } from '../common/page';
import { Product } from './../common/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  baseUrl: string = 'http://localhost:8000/api/v1/products';
  

  constructor(private http: HttpClient) {}

  getBestSeller() {
    return this.http.get<Product>(`${this.baseUrl}/best-seller`);
  }
  getRecentProducts() {
    return this.http.get<Product[]>(`${this.baseUrl}/recent`);
  }

  getProducts(page: number = 0, size: number = 10, orderBy: string) {
    return this.http.get<Page<Product>>(
      `${this.baseUrl}/all?page=${page}&size=${size}&orderBy=${orderBy}`);
  }
  getPopularProducts() {
    return this.http.get<Product[]>(`${this.baseUrl}/popular`);
  }
  getCategories() {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }

  getProductsByCategory(categoryId: number, page: number, size: number, orderBy: string) {
    return this.http.get<Page<Product>>(
      `${this.baseUrl}/category/${categoryId}?page=${page}&size=${size}&orderBy=${orderBy}`
    );
  }
  getProductsByName(name: string, page: number, size: number, orderBy : string) {
    return this.http.get<Page<Product>>(
      `${this.baseUrl}/search/${name}?page=${page}&size=${size}&orderBy=${orderBy}`
    );
  }
  getProductBySku(sku: string) {
    return this.http.get<Product>(`${this.baseUrl}/sku/${sku}`);
  }

  findOneProductPerCategory() {
    return this.http.get<Product[]>(`${this.baseUrl}`);
  }

  addProduct(formData: FormData) {
    return this.http.post<Product>(`${this.baseUrl}/add-product`, formData);
  }
  deleteProduct(sku: string) {
    return this.http.delete(`${this.baseUrl}/delete/${sku}`);
  }
  testAddProduct() {
    return this.http.post<string>(`${this.baseUrl}/add-product`, 'Hello');
  }
}
