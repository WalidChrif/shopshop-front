import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { TranslateModule } from '@ngx-translate/core';
import { CategoryMenuComponent } from '../category-menu/category-menu.component';
import { Product } from '../../../common/product';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { CartItem } from '../../../common/cart-item';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    RouterLink,
    CurrencyPipe,
    CategoryMenuComponent,
    NavbarComponent,
    TranslateModule
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {

  product!: Product | null;
  param!: string | null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit() {   
    this.route.paramMap.subscribe((params) => {      
      if (params.has('sku')) {
      this.param = params.get('sku');
      this.productService.getProductBySku(this.param!).subscribe((product) => {
        this.product = product;
      });
    }});  
    return;
  }
  addToCart(product: Product) {
    const cartItem = new CartItem(product);
    this.cartService.addToCart(cartItem)
    }
}
