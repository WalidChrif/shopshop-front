import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoryMenuComponent } from './user-content/category-menu/category-menu.component';
import { ProductsListComponent } from './user-content/products-list/products-list.component';
import { FooterComponent } from './user-content/footer/footer.component';
import { NavbarComponent } from './user-content/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ProductsListComponent,
    NavbarComponent,
    CategoryMenuComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ShopShop';
}
