import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Product } from '../../../common/product';
import { ProductService } from '../../../services/product.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    FormsModule,
    NgbPagination,
    NgFor,
    NgIf,
    RouterLink,
    TranslateModule,
    DatePipe,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  products: Product[] = [];
  page = 1;
  pageSize = 10;
  totalElements = 0;
  orderBy = 'name,asc';

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getProducts();
  }
  deleteProduct(sku: string) {
    this.productService.deleteProduct(sku).subscribe(() => {
      this.getProducts();
    });
  }
  getProducts() {
    this.productService
      .getProducts(this.page - 1, this.pageSize, this.orderBy)
      .subscribe((response) => {
        this.products = response.content;
        this.totalElements = response.totalElements;
        this.page = response.number + 1;
        this.pageSize = response.size;
      });
  }
  getCurrentTime() {
    return new Date().getTime();
  }
}
