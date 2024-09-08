import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoryMenuComponent } from './components/category-menu/category-menu.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchNavbarComponent } from './components/search-navbar/search-navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MainContentComponent,
    SearchNavbarComponent,
    CategoryMenuComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'shopshop-front';
}
