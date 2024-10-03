import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../common/category';
import { Page } from '../common/page';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl: string = 'https://localhost:8443/api/v1/products';
  orderBy = 'unitPrice';

  constructor(private http: HttpClient) {}

  getProducts(page: number = 0, size: number = 10) {
    return this.http.get<Page<Product>>(
      `${this.baseUrl}/all?page=${page}&size=${size}&orderBy=${this.orderBy}`
    );
  }

  getCategories() {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }

  getProductsByCategory(categoryId: number, page: number, size: number) {
    return this.http.get<Page<Product>>(
      `${this.baseUrl}/category/${categoryId}?page=${page}&size=${size}&orderBy=${this.orderBy}`
    );
  }
  getProductsByName(name: string, page: number, size: number) {
    return this.http.get<Page<Product>>(
      `${this.baseUrl}/search/${name}?page=${page}&size=${size}&orderBy=${this.orderBy}`
    );
  }
  getProductBySku(sku: string) {
    return this.http.get<Product>(`${this.baseUrl}/sku/${sku}`);
  }

  findOneProductPerCategory() {
    return this.http.get<Product[]>(`${this.baseUrl}`);
  }

  addProduct(product: Product) {
    return this.http.post<Product>(`${this.baseUrl}`, product);
  }
}
