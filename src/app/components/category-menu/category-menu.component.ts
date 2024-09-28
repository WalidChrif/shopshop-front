import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Category } from '../../common/category';
import { NgFor } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-category-menu',
  standalone: true,
  imports: [TranslateModule, RouterLink, NgFor],
  templateUrl: './category-menu.component.html',
  styleUrl: './category-menu.component.css'
})
export class CategoryMenuComponent {

  categories : Category[] = [];

  constructor(private productService : ProductService) {}

  ngOnInit() {
    this.productService.getCategories().subscribe((response) => {      
      this.categories = response;
    });
  }

}
