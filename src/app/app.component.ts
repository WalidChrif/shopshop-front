import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from './common/user';
import { CategoryMenuComponent } from './content/shared/category-menu/category-menu.component';
import { FooterComponent } from './content/shared/footer/footer.component';
import { NavbarComponent } from './content/shared/navbar/navbar.component';
import { ProductsListComponent } from './content/user-content/products-list/products-list.component';
import { AppState } from './store';
import * as newAuthActions from './store/new-auth.actions';

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
  user: User;
  storage: Storage = sessionStorage;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.user = this.storage.getItem('user')
      ? JSON.parse(this.storage.getItem('user'))
      : null;
    if (this.user) {
      this.store.dispatch(newAuthActions.login(this.user));
    } else {
      this.store.dispatch(newAuthActions.logout());
    }
    this.store.select('authReducer').subscribe((data) => {
      this.user = data?.user;
    });
  }

  
}
