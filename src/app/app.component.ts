import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoryMenuComponent } from './content/shared/category-menu/category-menu.component';
import { NavbarComponent } from './content/shared/navbar/navbar.component';
import { FooterComponent } from './content/shared/footer/footer.component';
import { ProductsListComponent } from './content/user-content/products-list/products-list.component';

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
