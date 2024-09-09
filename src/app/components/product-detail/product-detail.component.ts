import { Component } from '@angular/core';
import { CategoryMenuComponent } from '../category-menu/category-menu.component';
import { SearchNavbarComponent } from '../search-navbar/search-navbar.component';
import { Product } from '../../common/product';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    RouterLink,
    CurrencyPipe,
    CategoryMenuComponent,
    SearchNavbarComponent,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  product!: Product | null;
  param!: string | null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {   
    this.route.paramMap.subscribe((params) => {
      console.log("inside product detail");
      
      if (params.has('sku')) {
      this.param = params.get('sku');
      this.productService.getProductBySku(this.param!).subscribe((product) => {
        this.product = product;
      });
    }});
    return;
  }
}
