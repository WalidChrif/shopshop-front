import { Component } from '@angular/core';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { CartItem } from '../../../common/cart-item';
import { Product } from '../../../common/product';
import { Page } from '../../../common/page';


@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [RouterLink, FormsModule, NgFor, NgIf, CurrencyPipe, NgbPagination, TranslateModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent {
  products: Product[] = [];
  categoryId = 1;
  previousCategoryId = 1;
  params!: ParamMap;
  page = 1;
  pageSize = 10;
  totalElements = 0;
  totalPages!: number;
  loading: boolean = false;
  searchMode = false;
  homePage = false;
  orderBy = 'name,asc'; 

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    console.log(":::::::::::::: ", this.orderBy);
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
      this.page = 1;
    }
    this.previousCategoryId = this.categoryId;
    this.productService
      .getProductsByCategory(
        this.categoryId,
        this.page - 1,
        this.pageSize,
        this.orderBy
      )
      .subscribe((response) => {
        this.handleData(response);
      });
  }
  handleSearchProducts(params: ParamMap) {
    this.loading = true;
    const searchParam = params.get('name')?.trim();
    if (!searchParam) {
      this.loading = false;
      return;
    }
    this.searchMode = true;
    this.productService
      .getProductsByName(searchParam!, this.page - 1, this.pageSize, this.orderBy
      )
      .subscribe((response) => {
        this.handleData(response);
      });
  }
  handleData(response: Page<Product>) {
      this.products = response.content;
      this.totalPages = response.totalPages;
      this.totalElements = response.totalElements;
      this.page = response.number + 1;
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
