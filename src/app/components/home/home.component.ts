import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgClass, NgIf, NgFor, RouterLink, NgbCarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  products: Product[] = [];

  constructor(private productService: ProductService) {}


  ngOnInit() {
    this.productService.findOneProductPerCategory().subscribe((response) => {
      this.products = response;
    });    
  }
}
