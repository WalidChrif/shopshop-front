import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { MenuSidebarComponent } from './components/menu-sidebar/menu-sidebar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderDesktopComponent } from './components/header-desktop/header-desktop.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MainContentComponent,
    HeaderDesktopComponent,
    MenuSidebarComponent,
    FooterComponent,
    ProductListComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'shopshop-front';
}
