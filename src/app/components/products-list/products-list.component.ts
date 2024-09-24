import { Component } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { Page } from '../../common/page';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';
@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [RouterLink, FormsModule, NgFor, NgIf, CurrencyPipe, NgbPagination],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent {
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
  homePage = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.route.paramMap.subscribe((params) => {
      this.params = params;
      if (params.has('id')) this.handleCategoryProducts(this.params);
      else if (params.has('name')) this.handleSearchProducts(this.params);
    });
  }

  handleCategoryProducts(params: ParamMap) {
    this.loading = true;
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
    this.loading = true;
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
  }
  handleData(response: Page<Product>) {
      this.products = response.content;
      this.totalPages = response.totalPages;
      this.totalElements = response.totalElements;
      this.pageNumber = response.number + 1;
      this.pageSize = response.size;
      this.loading = false;
  }

  updatePage() {
    if (!this.searchMode) this.handleCategoryProducts(this.params);
    else this.handleSearchProducts(this.params);
  }
  addToCart(product: Product) {
    const cartItem = new CartItem(product);
    this.cartService.addToCart(cartItem);
  }

}