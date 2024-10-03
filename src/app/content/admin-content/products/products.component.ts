import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Product } from '../../../common/product';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [NgbPagination, NgFor, NgIf, RouterLink, TranslateModule, DatePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  products: Product[] = [];
  page: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getProducts();
  }
  getProducts() {
    this.productService
      .getProducts(this.page - 1, this.pageSize)
      .subscribe((response) => {
        this.products = response.content;
        this.totalItems = response.totalElements;
        this.page = response.number + 1;
        this.pageSize = response.size;
      });
  }
}
