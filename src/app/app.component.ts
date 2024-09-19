import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoryMenuComponent } from './components/category-menu/category-menu.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TestStoreComponent } from './components/test-store/test-store.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TestStoreComponent,
    RouterOutlet,
    MainContentComponent,
    NavbarComponent,
    CategoryMenuComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'shopshop-front';
}
