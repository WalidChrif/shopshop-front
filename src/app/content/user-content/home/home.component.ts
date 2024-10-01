import { Component } from '@angular/core';
import { JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../common/product';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgClass, NgIf, NgFor, RouterLink, NgbCarouselModule, JsonPipe],
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
