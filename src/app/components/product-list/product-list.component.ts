import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { KeyValuePipe, NgFor, NgForOf, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [UpperCasePipe, NgFor, KeyValuePipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  myProducts: Product[] = [];

  constructor(private productService : ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((products) => {
      this.myProducts = products;
      console.log(this.myProducts.length);
      console.log(this.myProducts);
    });
  }
  sortTable() {
    return 0;
  }
}
