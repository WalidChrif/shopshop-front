import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Category } from '../../common/category';
import { CategoryService } from '../../services/category.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-category-menu',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './category-menu.component.html',
  styleUrl: './category-menu.component.css'
})
export class CategoryMenuComponent {

  categories : Category[] = [];

  constructor(private categoryService : CategoryService) {}

  ngOnInit() {
    
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response;
    });
  }

}
