import { Component } from '@angular/core';
import { MainContentFooterComponent } from './main-content-footer/main-content-footer.component';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { CurrencyPipe, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [RouterLink, NgFor,CurrencyPipe, MainContentFooterComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css',
})
export class MainContentComponent {
  products: Product[] = [];
  totalPages!: number;
  totalElements!: number;
  currentPage!: number;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProductsPages(0,12).subscribe((response) => {
      this.products = response.content;
      this.totalPages = response.totalPages;
      this.totalElements = response.totalElements;
      this.currentPage = response.pageable.pageNumber;      
    });
  }
}
