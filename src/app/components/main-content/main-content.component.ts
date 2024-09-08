import { Component } from '@angular/core';
import { MainContentFooterComponent } from './main-content-footer/main-content-footer.component';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { CurrencyPipe, NgFor } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [RouterLink, NgFor, CurrencyPipe, MainContentFooterComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css',
})
export class MainContentComponent {
  products: Product[] = [];
  totalPages!: number;
  totalElements!: number;
  currentPage!: number;
  categoryId!: number;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.has('id')) {
      this.route.paramMap.subscribe((params) => {
        this.categoryId = +params.get('id')!;
        this.productService
         .getProductsByCategory(this.categoryId)
         .subscribe((response) => {
            this.products = response.content;
          });
      });
    } else {
      this.productService.getProductsPages(0, 20).subscribe((response) => {
        this.products = response.content;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
        this.currentPage = response.pageable.pageNumber;
      });
    }
  }
}
