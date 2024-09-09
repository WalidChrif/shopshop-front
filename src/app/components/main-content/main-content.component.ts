import { Component } from '@angular/core';
import { MainContentFooterComponent } from './main-content-footer/main-content-footer.component';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { Page } from '../../common/page';
@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [
    RouterLink,
    NgFor,
    NgIf,
    CurrencyPipe,
    NgbPagination,
    MainContentFooterComponent,
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css',
})
export class MainContentComponent {
  products: Product[] = [];
  categoryId = 1;
  previousCategoryId = 1;
  params!: ParamMap;
  pageNumber = 1;
  pageSize = 10;
  totalElements = 0;
  totalPages!: number;
  loading: boolean = false;
  searchMode = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeProducts();
    this.route.paramMap.subscribe((params) => {
      this.params = params;
      if (params.has('id')) this.handleCategoryProducts(this.params);
      else if(params.has('name')) this.handleSearchProducts(this.params);
    });
  }

  handleCategoryProducts(params: ParamMap) {
    console.log('handleCategoryProducts');
    this.searchMode = false;
    this.categoryId = +params.get('id')!;
    if (this.previousCategoryId !== this.categoryId) {
      this.pageNumber = 1;
    }
    this.previousCategoryId = this.categoryId;
    this.productService
      .getProductsByCategory(
        this.categoryId,
        this.pageNumber - 1,
        this.pageSize
      )
      .subscribe((response) => {
        this.handleData(response);
      });
  }
  handleSearchProducts(params: ParamMap) {
    console.log('handleSearchProducts');
    const searchParam = params.get('name')?.trim();
    if (!searchParam) {
      return;
    }
    this.searchMode = true;
    this.productService
      .getProductsByName(searchParam!, this.pageNumber - 1, this.pageSize)
      .subscribe((response) => {
        this.handleData(response);
      });
      // this.searchMode = false;
  }
  handleData(response: Page<Product>) {
    this.products = response.content;
    this.totalPages = response.totalPages;
    this.totalElements = response.totalElements;
    this.pageNumber = response.number + 1;
    this.pageSize = response.size;
  }

  updatePage() {
    if (!this.searchMode) this.handleCategoryProducts(this.params);
    else this.handleSearchProducts(this.params);
  }

  initializeProducts() {
    this.productService
      .getProductsByCategory(
        this.categoryId,
        this.pageNumber - 1,
        this.pageSize
      )
      .subscribe((response) => {
        this.handleData(response);
      });
  }
}
