import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoryMenuComponent } from './components/category-menu/category-menu.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';

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
