import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsListComponent } from './content/user-content/products-list/products-list.component';
import { NavbarComponent } from './content/user-content/navbar/navbar.component';
import { FooterComponent } from './content/user-content/footer/footer.component';
import { CategoryMenuComponent } from './content/user-content/category-menu/category-menu.component';


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
