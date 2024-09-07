import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import { Page } from '../common/page';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url : string = 'http://localhost:8000/api/v1/products';
  orderBy = "unitPrice";

  constructor(private http : HttpClient) { }

  getProducts() {
    return this.http.get<Product[]>(`${this.url}`);
  }
  getProductsPages(page : number, size : number) {
    return this.http.get<Page<Product>>(`${this.url}/pages?page=${page}&size=${size}&orderBy=${this.orderBy}`);
  }
  getProductById(id : number) {
    return this.http.get<Product>(`${this.url}/id/${id}`);
  }
  getProductBySku(sku : string) {
    return this.http.get<Product>(`${this.url}/sku/${sku}`);
  }
  getProductBySkuOrId(param : string | number) {
    const path = typeof param === 'string' ? 'sku' : 'id'; 
    return this.http.get<Product>(`${this.url}/${path}/${param}`);
  }
  addProduct(product : any) {
    return this.http.post<Product>(this.url, product);
  }
  deleteProduct(id : number) {
    return this.http.delete<Product>(`${this.url}/${id}`);
  }

}
